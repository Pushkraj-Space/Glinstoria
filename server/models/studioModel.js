const mongoose = require('mongoose');

const studioSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    user_name: {
        type : String,
        required : true
    },
    studio_name : {
        type: String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    createdAt : {
        type: Date,
        default : Date.now
    },
    connected_users : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'User'
    }]
})


module.exports = mongoose.model('Studio', studioSchema);