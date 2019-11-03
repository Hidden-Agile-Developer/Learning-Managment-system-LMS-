const mongoose = require('mongoose');

const userSchema=new mongoose.Schema( {
        subject: {
            type: String
        },
        semister:{
            type:String
        },
        section:{
            type:String
        }
})

  

const User = mongoose.model('section', userSchema)

module.exports = User;