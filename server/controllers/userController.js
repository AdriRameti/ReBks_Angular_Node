var mongoose = require('mongoose');
var User = require('../models/models.infoUser')

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