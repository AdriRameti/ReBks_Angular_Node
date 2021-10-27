var mongoose = require('mongoose');
var User = require('../models/models.infoUser')
var auth = require('../controllers/auth');

exports.readUser = async(req,res)=>{
try{
    User.findById(req.payload.id).then(function(user){
        if(!user){
            return res.status(401);
        }
        return res.json({user: user.toAuthJSON()});
    })
}catch(e){
    console.log(e);
}
}

exports.createUser = async (req,res) => {
    try{
        var user = new User();
        user.userName = req.body.user.userName;
        user.email = req.body.user.email;
        user.setPassword(req.body.user.password);

        user.save().then(function(){
            return res.json({user: user.toAuthJSON()})
        });
    }catch(e){
        console.log(e);
    }
}

exports.updateUser = async (req,res)=>{
    try{
        User.findById(req.payload.id).then(function(user){
            if(!user){ 
                return res.sendStatus(401); 
            }
            if(typeof req.body.userName !== 'undefined'){
              user.userName = req.body.userName;
            }
            if(typeof req.body.email !== 'undefined'){
              user.email = req.body.email;
            }
            if(typeof req.body.image !== 'undefined'){
              user.image = req.body.image;
            }
            if(typeof req.body.password !== 'undefined'){
              user.setPassword(req.body.password);
            }
        
            return user.save().then(function(){
              return res.json({user: user.toAuthJSON()});
            });
          });
    }catch(e){
        console.log(e);
    }
}

exports.readLogin = async (req,res) => {
   
    try{
        if(!req.body.user.email){
            return res.status(422).json({errors: {email: "can't be blank"}});
          }
        
          if(!req.body.user.password){
            return res.status(422).json({errors: {password: "can't be blank"}});
          }
         User.findOne({email:req.body.user.email}).then(function(user){
            if(!user || !user.validPassword(req.body.user.password)){
                return res.json(0)
            }else{
                user.token = user.generateJWT();
                return res.json({user: user.toAuthJSON()});
            }
            
         })
    }catch(e){
        console.log(e);
    }
}