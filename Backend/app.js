require('./Database/database');
const userModel=require('./Model/userModel');
const adminModel=require('./Model/adminModel');

const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const path = require('path');  
const multer = require('multer'); 

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));


///API for sending the request to the user////
app.post("/userRequest", (req, res) => { 
    console.log(req.body);
    var userData = new userModel(req.body); 
    userData.save().then(function(){   
    alert("user Registered");
    console.log('user registered');     
    }).catch(function(e){res.send(e) 
    });
 });

 ///API for Admin login
 app.post('/loginAdmin',async function(req, res){
    const user=req.body.email;// user
    const password=req.body.password; // pw
    const admin1 = await adminModel.checkCrediantialsDb(user,password);
    const token = await  admin1.generateAuthToken();
    res.json({token});        
    console.log("en");
    console.log(token);  
   })

 ///Server Port
 app.listen(96);