const express = require('express');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer  = require('multer');
const mysql = require('mysql');
const {v4: uuidv4} = require('uuid');
var nodemailer = require('nodemailer');


const app = express();

const port = 3001 || process.env.PORT ;
app.listen(port,()=>{})

const pool  = mysql.createPool({
  connectionLimit : 10,
  host            : 'localhost',
  user            : 'root',
  database        : 'AquaBird_DB'
})

app.use(cors({
    origin:true,
    credentials:true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));
const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, 'uploads/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now()
    cb(null, uniqueSuffix+file.originalname)
  }
})

const upload = multer({ storage: storage })



app.post('/postData',(req,res)=>{
    var {firstName,lastName,country,city,zipCode,streetAddress,contactnumber,email,orderNotes,orderList,shippingType,paymentMethod} = req.body
    pool.getConnection((err, connection) => {
      if(err) throw err
      const params = { 
        id:uuidv4(),
        firstName,
        lastName,
        country,
        city,
        zipCode,
        streetAddress,
        contactnumber,
        email,
        orderNotes,
        order: orderList,
        paymentMethod,
        discount:req.body.discount,
        date:Date.now()}
      connection.query('INSERT INTO aquaorder SET ?', params, (err, rows) => {
      connection.release() 
      if (!err) {
        res.status(200).send(params.id);
      } else {
          console.log(err)
      }

      })
  })
    

})

app.post('/login', (req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('SELECT * from userinfo WHERE userName=?',[req.body.userName], (err, rows) => {
        connection.release() 
        if (!err) {
          var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            rows[0].password
          );
    
          if (!passwordIsValid) {
            return res.status(401)
              .send({
                accessToken: null,
                message: "Invalid user name or Password!"
              });
          }
    
          var token = jwt.sign({id:rows[0].userName},'THISISMYSECRETKEYAPIFORAQUABIRDAPP', {
            expiresIn: 86400
          });
    
          return res.cookie("access_token", token, {
            httpOnly: true,
          }).status(200)
            .send({
              message: "Login successfull...",
            });
        } else {
          return res.status(404)
          .send({
            message: "Invalid user name or Password!"
          });
        }

    })
})
 

  
   
})


const authorization = (req, res, next) => {
  let token = '';
if ( req.headers.cookie && req.headers.cookie.split('=')[0] == "access_token") {
  token = req.headers.cookie.split('=')[1];
}else if (req.headers.cookie && req.headers.cookie.split(';')[2] && req.headers.cookie.split(';')[2].split('=')[0] == "access_token") {
  token = req.headers.cookie.split(';')[2].split('=')[1];
}else{
token='';
}
 
    
    if (token == '') {
      return res.sendStatus(403);
    }
    try {
     jwt.verify(token, "THISISMYSECRETKEYAPIFORAQUABIRDAPP");
      return next();
    } catch {
      return res.sendStatus(403);
    }
  };

  app.get('/logout',(req,res)=>{
    return res
    .clearCookie("access_token")
    .status(200)
    .json({ message: "Successfully logged out 😏 🍀" });
  })
  
  app.get("/protected", authorization, (req, res) => {
    return res.status(200).send('Ok');
  });

app.get('/getData',(req,res)=>{
    pool.getConnection((err, connection) => {
        if(err) throw err
        connection.query('SELECT * FROM aquaorder' , (err, rows) => {
            connection.release() 
            if (!err) {
              res.status(200).send(rows);
            } else {
                console.log(err)
            }
        })
});
})
app.post('/add-product',upload.array("files"),(req,res)=>{
 const data = JSON.parse(req.body.data);
 let params = {
  id:uuidv4(),
  name : data.name,
  SECURITY : data.security,
  refill : data.refill,
  price : data.price,
  reviews : data.reviews,
  star : data.star,
  disable : data.disable,
  description : data.description,
  image : `${req.protocol}://${req.get('host')}/uploads/${req.files[0].filename}`,
  icon : `${req.protocol}://${req.get('host')}/uploads/${req.files[1].filename}`
 }
 pool.getConnection((err, connection) => {
  if(err) throw err
 connection.query('INSERT INTO products SET ?', params, (err, rows) => {
  connection.release() 
  if (!err) {
    res.status(200).send('product added successfully...');
  } else {
      console.log(err)
  }

  })
 })

})
app.post('/delete-product',(req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('DELETE FROM products WHERE id = ?', [req.body.id], (err, rows) => {
        connection.release(); 
        if (!err) {
          res.status(200).send('sucessfully deleted...')
        } else {
            console.log(err)
        }
    })
  })
})
app.post('/delete-order',(req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('DELETE FROM aquaorder WHERE id = ?', [req.body.id], (err, rows) => {
        connection.release() 
        if (!err) {
          res.status(200).send('sucessfully deleted...')
        } else {
            console.log(err)
        }
    })
})

})
app.get('/products',(req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('SELECT * FROM products' , (err, rows) => {
        connection.release() 
        if (!err) {
          res.status(200).send(rows);
        } else {
            console.log(err)
        }
    })
});
})


app.get('/single-product/:id',(req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('SELECT * FROM products WHERE id = ?', [req.params.id], (err, rows) => {
        connection.release() 
        if (!err) {
            res.status(200).send(rows);
        } else {
            console.log(err);
        }
    })
})
})

app.post('/update-product',upload.array("files"),(req,res)=>{
const data = JSON.parse(req.body.data);
if (req.files.length !== 0) {
data.image = req.protocol+'://'+req.get('host')+'/uploads/'+req.files[0].filename
data.icon = req.protocol+'://'+req.get('host')+'/uploads/'+req.files[1].filename
}
pool.getConnection((err, connection) => {
  if(err) throw err

  connection.query('UPDATE products SET name = ?, price = ?,SECURITY = ?,refill = ?, description = ?, reviews = ?, star = ?, disable = ?, image = ?, icon = ? WHERE id = ?', [data.name, data.price, data.security,data.refill,data.description, data.reviews, data.star, data.disable, data.image, data.icon, data.id] , (err, rows) => {
      connection.release() 

      if(!err) {
          res.send(true)
      } else {
          console.log(err)
      }
  })
})

})

app.post('/update-order',(req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('UPDATE aquaorder SET firstName = "'+req.body.firstName+'", lastName = "'+req.body.lastName+'", country = "'+req.body.country+'", city = "'+req.body.city+'"  , zipCode = "'+req.body.zipCode+'" , streetAddress = "'+req.body.streetAddress+'" , contactnumber = "'+req.body.contactnumber+'" , email = "'+req.body.email+'" , orderNotes = "'+req.body.orderNotes+'"  , shippingType = "'+req.body.shippingType+'" , paymentMethod = "'+req.body.paymentMethod+'" , discount = "'+req.body.discount+'" , date = "'+Date.now()+'" , order = '+req.body.order+' WHERE id = "'+req.body.id+'"' , (err, rows) => {
        connection.release(); 
        if(!err) {
            res.send(true);
        } else {
            console.log(err);
        }
    })

})
})

app.post('/add-coupon',(req,res)=>{
const params ={
    id:uuidv4(),
    couponCode:req.body.couponCode,
    status:req.body.status
  }
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('INSERT INTO couponcodes SET ?', params, (err, rows) => {
    connection.release()
    if (!err) {
      res.status(200).send("successfully added.....");
    } else {
        console.log(err)
    }

    })
})
})
app.get('/get-coupons',(req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('SELECT * from couponcodes', (err, rows) => {
        connection.release()
        if (!err) {
          res.status(200).send(rows)
        } else {
            console.log(err)
        }
    })
})
})
app.post('/delete-coupon',(req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('DELETE FROM couponcodes WHERE id = ?', [req.body.id], (err, rows) => {
        connection.release() 
        if (!err) {
          res.status(200).send('sucessfully deleted...')
        } else {
            console.log(err)
        }
    })
})
})
app.post('/update-coupon',(req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('UPDATE couponcodes SET couponCode = ?, status = ?  WHERE id = ?', [req.body.couponCode, req.body.status, req.body.id], (err, rows) => {
        connection.release(); 
        if(!err) {
            res.send(true);
        }else{
            console.log(err);
        }
    })
})
  })
  app.get('/single-coupon/:id',(req,res)=>{
    pool.getConnection((err, connection) => {
      if(err) throw err
      connection.query('SELECT * FROM couponcodes WHERE id = ?', [req.params.id], (err, rows) => {
          connection.release() 
          if (!err) {
              res.status(200).send(rows[0]);
          } else {
              console.log(err);
          }
      })
  })
  
  })


  
  

app.post('/send-mail',(req,res)=>{

  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('SELECT * FROM subscriptions WHERE email = ?', [req.body.email], (err, rows) => {
        connection.release() 
        if (!err) {
           if (rows.length != 0) {
            return res.status(200).send('email already subscribed...')
           }else{
            var transporter = nodemailer.createTransport({
              service:'gmail',
              secure:false,
              port: 25,
               auth: {
                   user: 'mineralwateraquabird@gmail.com',
                   pass: 'amweplxnjyblywdh'
               },
               tls: {
                   rejectUnauthorized: false
               }
           });
           
      
      let details={
        from:"mineralwateraquabird@gmail.com",
        to: req.body.email,
        subject:"subscription alert",
        text:"hi, thanks for subscribing aquabird.pk",
        html : `<div>Hi,<br> Thanks for subscribing aquabird.pk. Kindly activate your subscription using following
         button.<br><br>  <button style="background:blue;border:none;outline:none;box-shadow:none;
         width:30%;padding:1.5vw 0;border-radius:15px;font-size:18px;font-weight:bold;"><a style="color:white;text-decoration:none" href="http://localhost:3000/subscribe/${req.body.email}">Subscribe</a></button> 
         `
       }
         transporter.sendMail(details,(err)=>{
           if (err) {
             console.log(err);
           }else{
            const params ={
              id:uuidv4(),
              email:req.body.email,
              activate:false
            }
            pool.getConnection((err, connection) => {
              if(err) throw err
              connection.query('INSERT INTO subscriptions SET ?', params, (err, rows) => {
              connection.release()
              if (!err) {
                res.status(200).send("successfully added.....");
              } else {
                  console.log(err)
              }
          
              })
          })
           }
         })
          }
        } else {
            console.log(err);
        }
    })
})

})

app.get('/get-emails',(req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('SELECT * from subscriptions', (err, rows) => {
        connection.release()
        if (!err) {
          res.status(200).send(rows)
        } else {
            console.log(err)
        }
    })
})
})

app.post('/activate-email',(req,res)=>{
  pool.getConnection((err, connection) => {
    if(err) throw err
    connection.query('SELECT * FROM subscriptions  WHERE email = ?', [req.body.email], (err, rows) => {
        connection.release(); 
        if(!err) {
          if (rows.length == 0) {
            return res.status(401).send('email is not found. kindly subscribe again on this email address.');
           }
           if (rows[0].email) {
            pool.getConnection((err, connection) => {
              if(err) throw err
              connection.query('UPDATE subscriptions SET activate = ?  WHERE email = ?', [true, req.body.email], (err, rows) => {
                  connection.release(); 
                  if(!err) {
                    return res.status(200).send('You have successfully subscribed....')
                  }else{
                      console.log(err);
                  }
              })
            })
           }
        }else{
            console.log(err);
        }
    })
  })
})


app.post('/contact',(req,res)=>{
  var transporter = nodemailer.createTransport({
    service:'gmail',
    secure:false,
    port: 25,
     auth: {
         user: 'mineralwateraquabird@gmail.com',
         pass: 'amweplxnjyblywdh'
     },
     tls: {
         rejectUnauthorized: false
     }
 });
 

let details={
from:"mineralwateraquabird@gmail.com",
to: "rmsik92@gmail.com",
subject:"message from client",
text:`Contact: ${req.body.contactNumber}  
Message: ${req.body.message}`,
}
transporter.sendMail(details,(err)=>{
 if (err) {
   console.log(err);
 }else{
res.status(200).send('Message have sent successfully.');
 }})
})