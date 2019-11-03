const mongoose = require('mongoose');

const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema( {
        email: {
            type: String
        },

        assignment_code: {
            type: String
        },
        assignment_date:{
        type:String
        },
        comment:{
        type:String
        },
        assignment:{
           type:String  
        },
        faculty:{
            type:String
        },
        semister:{
          type:String  
        }

})

  

const User = mongoose.model('AssignmentTeacher', userSchema)

module.exports = User;