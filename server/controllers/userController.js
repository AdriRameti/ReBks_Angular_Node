var mongoose = require('mongoose');
var User = require('../models/models.infoUser')
var auth = require('../controllers/auth');


exports.karma = async(req,res)=>{
    var id = mongoose.Types.ObjectId(req.body.id);
    var karma = parseInt(req.body.karma);

    User.findById(id).then(function(user){
        if(user){
            var myKarma = parseInt(user.karma);
            var karmaUser = myKarma + karma;
            user.karma = karmaUser;
            user.save().then(function(data){
                res.json(data);
            });    
        }


    });
}
exports.showRating = async(req,res)=>{
    var idUser = req.query.id;
    User.findById(idUser).then(function(user){
        res.json(user);
    });
}
exports.rating = async(req,res)=>{
    var book = req.query.book;
    var user = req.query.user;
    var rate = req.query.rate;
    var idBook = mongoose.Types.ObjectId(book);
    var idUser = mongoose.Types.ObjectId(user);
    var ratingObject = {
        book:book,
        user:user,
        rate:rate
      }
    User.aggregate().unwind({path:"$rating"})
    .match({"rating.book":idBook}).then(function(data){
        if(data.length==0){
            User.findById(idUser).then(function(user){
                user.rating.push(ratingObject);
                user.save().then(function(data){
                    res.json(0);
                });
            });
        }else{
            User.findById(idUser).then(function(user){
                user.rating=ratingObject;
                user.save().then(function(data){
                    res.json(1);
                });
            })
            
        }
    })
}
exports.readUser = async(req,res)=>{
    var myId =req.params.id;
    var id = mongoose.Types.ObjectId(myId);
try{
    User.aggregate().unwind({path:"$comments"})
    .match({"comments.book":id})
    .project({"comments":1})
    .lookup({from:'users',localField: '_id', foreignField: '_id', as: 'users'})
    .then(function(data){
        res.json(data);
    })
}catch(e){
    console.log(e);
}
}
exports.createComment = async(req,res)=>{
    var Comment = req.body;
    try{
        User.find({comments:{$in:[Comment]},_id:req.body.autor}).then(function(com){
            if(com.length==0){
                User.findById(req.payload.id).then(function(user){
                    user.comments.push(Comment);
                    user.save().then(function(data){
                        res.json(0);
                    });
                });
            }else{
                res.json(1);
            }
        })
    }catch(e){
        console.log(e);
    }
}
exports.showFoll = async(req,res)=>{
    var userName = req.params.userName;
    try{
        User.find({follow:{$in:[userName]}}).then(function(foll){
            if(!foll){
                res.json(0);
            }else{
                res.json(foll);
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
    var userName = req.body.user.userName;
    try{
        User.find({follow:{$in:[userName]},email:email}).then(function(foll){
            if(foll.length==0){
                User.findById(req.payload.id).then(function(user){
                    user.follow.push(userName);
                    user.save().then(function(){
                        return res.json(0);
                    });
                });
            }else{
                User.findById(req.payload.id).then(function(user){
                    const index = user.follow.indexOf(userName);
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