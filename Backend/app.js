require('./Database/database');
const userModel=require('./Model/userModel');
const adminModel=require('./Model/adminModel');
const studentModel=require('./Model/studentModel');
const teacherModel=require("./Model/teacherModel");
const FacultyModel=require('./Model/FacultyModel');
const adminAuth=require('./MiddleWare/adminAuth');
const studentAuth=require('./MiddleWare/studentAuth');
const teacherAuth=require('./MiddleWare/teacherMiddleware');
const express=require('express');
const bodyparser=require('body-parser');
const cors=require('cors');
const path = require('path');  
const multer = require('multer'); 

const app=express();
app.use(cors());
app.use(express.json());
app.use(bodyparser.urlencoded({ extended: false }));

//Upload user profile Image

var storage = multer.diskStorage({
   destination: 'images',
   filename: (req, file, callback) => {
      let ext = path.extname(file.originalname);
      callback(null, "user" + Date.now() + ext);
   }
});

var imageFileFilter = (req, file, cb) => {
   if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('You can upload only image files!'), false);
   }
   cb(null, true);
};

var upload = multer({
storage: storage,
fileFilter: imageFileFilter,
limits: { fileSize: 100000000 }
});

app.post('/uploadUserImages', upload.single('profile_image'), (req, res) => {
res.send(req.file)
console.log(req.file)
});


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
 app.post('/loginUser',async function(req, res){
    const user=req.body.email;// user
    const password=req.body.password; // pw
    const admin1 = await adminModel.checkCrediantialsDb(user,password);
    const token = await  admin1.generateAuthToken();
    res.json({token});        
    console.log("en");
    console.log(token);  
   })

   //API for view user request
app.get("/showuserRequest", function (req, res) {   ////Completed
   userModel.find().then(function (userModel) {
      res.send(userModel);
   }).catch(function (e) {
      res.send(e);
   });
  });

  //API to view specific user request in detail
app.get("/showuserRequest/:id", function (req, res) { 
   uid = req.params.id.toString();
   userModel.findById(uid).then(function (userModel) {
      res.send(userModel);
   }).catch(function (e) {
      res.send(e)
   });
});

///API Adding the Faculty////
app.post("/addFaculty", (req, res) => {
   console.log(req.body);
   var FacultyData = new FacultyModel(req.body);
   FacultyData.save().then(function () {
   alert("New Faculty Added");
   console.log('Faculty Added');
   }).catch(function (e) {
      res.send(e)
   });
});

///API to view the Faculty
app.get("/viewFaculty", function (req, res) {   ////Completed
   FacultyModel.find().then(function (FacultyModel) {
   res.send(FacultyModel);
   }).catch(function (e) {
   res.send(e);
   });
   });

 //API to delete the Faculty
app.delete('/deleteFaculty/:id', function (req, res) {
   console.log(req.params.id);
   FacultyModel.findByIdAndDelete(req.params.id).then(function () {
   res.send("Successfully deleted");
   }).catch(function (e) {
   res.send(e);
   });
   });  

///---------User Registeration Approval-----------////
app.post("/addStudent", (req, res) => {
   console.log(req.body);
   var userData = new studentModel(req.body);
   userData.save().then(function () {
   alert("student Registered");
   console.log('student registered');
   }).catch(function (e) { res.send(e) });
});

app.post("/addTeacher", (req, res) => {
   console.log(req.body);
   var userData = new teacherModel(req.body);
   userData.save().then(function () {
      alert("student Registered");
      console.log('student registered');
   }).catch(function (e) { res.send(e) });
});


 ///Server Port
 app.listen(96);