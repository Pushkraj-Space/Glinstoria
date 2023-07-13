const bcrypt = require('bcrypt');
const Studio = require('../models/studioModel');
const User = require('../models/userModel');

module.exports.createStudio = async (req,res) => {
    try{
        const ans = await Studio.find({user_name : req.body.userName});
        if(ans.length > 0){
            return res.status(409).json({message : "user name exists"})
        }
        let studio = new Studio({
            name : req.body.name,
            studio_name : req.body.studioName,
            user_name : req.body.userName,
            password : req.body.password
        })
        studio.password = await bcrypt.hash(studio.password,12);
        let {...savedStudio} = await studio.save();
        delete savedStudio._doc.password;
        res.status(201).json(savedStudio._doc);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
}

module.exports.getAllStudio = async (req, res) => {
    try{
        const studios = await Studio.find({},{ password: 0 });
        res.status(200).json(studios);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
}

module.exports.getStudioById = async (req, res) => {
    try{
        const {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(404).json({
                message: "Studio not found"
            })
        }
        const studio = await Studio.findById({ _id : id},{ password: 0 });
        res.status(200).json(studio);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
}


module.exports.findStudios = async (req, res) =>{
    try{
        let text  = req.query.text.trim();
        let searchText = {};
        if(text != ""){
            searchText.user_name = new RegExp(text, 'i');
        }
        const studios = await Studio.find(searchText);
        res.status(200).json(studios);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
}

module.exports.connectionReqToUser = async(req, res) =>{
    try{
        let user_name = req.query.userName;
        let {id} = req.params;
        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            return res.status(404).json({
                message: "Studio not found"
            })
        }
        let data = await User.findOne({requests_from_studio : {_id: id}, user_name});
        if(data){
            return res.status(409).json({
                message : "request already send"
            })
        }
        let user = await User.findOne({user_name});
        let studio = await Studio.findById({_id : id});
        user.requests_from_studio.push(studio);
        const conn = await user.save();
        res.status(200).json(conn);
    }catch(err){
        console.log(err);
        res.status(500).json({
            error : "Internal Server Error"
        })
    }
}