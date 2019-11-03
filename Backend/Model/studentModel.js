const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
    first_name: {
        type: String
    },

    last_name: {
        type: String
    },
    gender: {
        type: String
    },

    user_type: {
        type: String
    },
    email: {
        type: String
    },
    contact: {
        type: String
    },

    password: {
        type: String
    },

    subject: {
        type: String
    },

    semister: {
        type: String
    },

    section: {
        type: String
    },

    profile_image: {
        type: String
    }

})


userSchema.methods.generateAuthToken = async function () {   
    const student = this 
    const token = jwt.sign({ _id: student._id.toString() }, 'thisismynewcourse')    
    console.log(token);  
    student.tokens = student.tokens.concat({ token :token }) 
    await student.save() 
    return token
    }
   userSchema.statics.checkCrediantialsDb = async (email, password) =>{
   const student1 = await Student.findOne({email : email, password : password})
   return student1;
   }
   const Student = mongoose.model('student', userSchema)
   module.exports = Student;