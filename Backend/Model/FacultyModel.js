const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    faculty_name: {
        type: String
    }

})



const faculty = mongoose.model('faculty', userSchema)

module.exports = faculty;