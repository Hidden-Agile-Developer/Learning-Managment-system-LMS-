const mongoose = require('mongoose');

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


  
const Admin = mongoose.model('admin', userSchema)
module.exports = Admin;