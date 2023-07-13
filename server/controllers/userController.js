const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const Studio = require('../models/studioModel');

module.exports.createUser = async (req,res) =>{
    try{
        const ans = await User.find({user_name : req.body.userName});
        if(ans.length > 0){
            return res.status(409).json({message : "user name exists"})
        }
        let user = new User({
            name : req.body.name,
            user_name : req.body.userName,
            password : req.body.password,
        })
        user.password = await bcrypt.hash(user.password,12);
        const {...newUser} = await user.save();
        delete newUser._doc_password;
        res.status(201).json(newUser._doc);
    }catch(err){
        // console.log(err);
        if(err.code == 11000){
            return res.status(409).json({
                error : "Email already registered"
            })
        }
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
}

module.exports.getAllUsers = async(req,res)=>{
    try{
        const allUsers = await User.find({},{password:0});
        res.status(200).json(allUsers);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
}

module.exports.getUser = async (req,res) =>{
    try{
        const {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(404).json({
                message: "User not found"
            })
        }
        const user = await User.findById({_id : id}, { password : 0});
        res.status(200).json(user);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
}

module.exports.getAllConnectionReq = async(req, res) =>{
    try{
        let _id = req.params.id;
        if(!_id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(404).json({
                message: "User not found"
            })
        }
        let userData = await User.findOne({_id}).populate('requests_from_studio');
        if(userData == null){
            return res.status(200).json([]);
        }
        let {requests_from_studio} = userData;
        let connReqData = requests_from_studio.map((obj) => {
            let data = {
                studio_name : obj.studio_name,
                user_name : obj.user_name,
                _id : obj._id,
                name : obj.name
            }
            return data;
        })
        res.status(200).json(connReqData);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
}

module.exports.acceptRequest = async (req, res) =>{
    try{
        let _id = req.params.id;
        if(!_id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(404).json({
                message: "User not found"
            })
        }
        let user_name = req.query.userName;
        let studio = await Studio.findOne({user_name});
        let data = await User.findOne({requests_from_studio : {_id : studio._id}, _id}).populate('requests_from_studio');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
}