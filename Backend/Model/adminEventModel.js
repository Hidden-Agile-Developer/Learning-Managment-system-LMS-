const mongoose = require('mongoose');

const eventSchema=new mongoose.Schema( {
    eventName: {
        type: String

    },
    happeningDate: {
        type: Date
    },
    uploadedDate:{
        type:Date
    },

})
const event = mongoose.model('event', eventSchema);
module.exports=event