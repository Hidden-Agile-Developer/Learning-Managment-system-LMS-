const mongoose = require('mongoose');
const jwt=require("jsonwebtoken");
const userSchema=new mongoose.Schema( {
        first_name: {
            type: String
        },

        last_name: {
            type: String
        },
        gender:{
           type:String
        },

        user_type:{
        type:String
        },

        email: {
            type: String
        },
        contact:{
         type:String
        },

        password:{
        type:String
        },

        profile_image:{
        type: String
    },
        tokens:[{
         token:{
         type:String,
         required:true,
            }
        }]

})

userSchema.methods.generateAuthToken = async function () {   
    const admin = this 
    const token = jwt.sign({ _id: admin._id.toString() }, 'thisismynewcourse')    
    console.log(token);  
    admin.tokens = admin.tokens.concat({ token :token }) 
    await admin.save() 
    return token
    }

   userSchema.statics.checkCrediantialsDb = async (email, password) =>{
   const admin1 = await Admin.findOne({email : email, password : password})
   return admin1;
   }


  
const Admin = mongoose.model('admin', userSchema)
module.exports = Admin;