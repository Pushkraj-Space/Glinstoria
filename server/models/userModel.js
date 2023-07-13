const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type : String,
        required : true
    },
    user_name: {
        type : String,
        required : true
    },
    password : {
        type : String,
        required : true,
    },
    requests_from_studio : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Studio'
    }],
    connected_studios : [{
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Studio'
    }],
    createdAt : {
        type: Date,
        default : Date.now
    }
})


module.exports = mongoose.model('User', userSchema);




// requestsFromStudio : [{
//     user_name : {
//         type: String,
//         required: true
//     },
//     studio__name:{
//         type: String,
//         required: true
//     },
//     isAccepted : {
//         type: Boolean,
//         default: false
//     }
// }],