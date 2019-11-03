const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");

const userSchema=new mongoose.Schema( {
        email: {
            type: String
        },

      assignment: {
            type: String
        },
      
     faculty:{
             type:String
        },

     semister:{
        type:String
        }

})

const User = mongoose.model('studyMaterial', userSchema)
module.exports = User;