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
exports.showFoll = async(req,res)=>{
    var slug = req.params.slug;
    try{
        User.find({follow:{$in:[slug]}}).then(function(fav){
            if(!fav){
                res.json(0);
            }else{
                res.json(fav);
            }
        })
    }catch(e){
        console.log(e);
    }
}
exports.showFav = async(req,res)=>{
    var slug = req.params.slug;
    try{
        User.find({favorites:{$in:[slug]}}).then(function(fav){
            if(!fav){
                res.json(0);
            }else{
                res.json(fav);
            }
        })
    }catch(e){
        console.log(e);
    }
}
exports.follow = async(req,res)=>{
    var email = req.body.user.email;
    var slug = req.body.user.slug;
    try{
        User.find({follow:{$in:[slug]},email:email}).then(function(foll){
            if(foll.length==0){
                User.findById(req.payload.id).then(function(user){
                    user.follow.push(slug);
                    user.save().then(function(){
                        return res.json(0);
                    });
                });
            }else{
                User.findById(req.payload.id).then(function(user){
                    const index = user.follow.indexOf(slug);
                    if (index > -1) {
                        user.follow.splice(index, 1);
                    }
                    user.save().then(function(){
                        return res.json(1);
                    });
                });
            }
        })
    }catch(e){
        console.log(e);
    }

}
exports.favorite = async (req,res)=>{
    var email = req.body.user.email;
    var slug = req.body.user.slug;
    try{
        User.find({favorites:{$in:[slug]},email:email}).then(function(fav){
            if(fav.length==0){
                User.findById(req.payload.id).then(function(user){
                    user.favorites.push(slug);
                    user.save().then(function(){
                        return res.json(0);
                    });
                });
            }else{
                User.findById(req.payload.id).then(function(user){
                    const index = user.favorites.indexOf(slug);
                    if (index > -1) {
                        user.favorites.splice(index, 1);
                    }
                    user.save().then(function(){
                        return res.json(1);
                    });
                });
            }
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