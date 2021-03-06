const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
var crypto = require('crypto');
var jwt = require('jsonwebtoken');
var secret= require('../config').secret;
const Comments = mongoose.Schema({
    body:{type:String},
    autor:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'book'}
})
const Rating = mongoose.Schema({
    rate:{type:Number},
    autor:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'book'},
});
const User = mongoose.Schema({
    userName:{type:String},
    email:{type:String, unique:true},
    password:{type:String},
    image:{type:String},
    follow:[{type:String}],
    favorites:[{type:String}],
    comments:[Comments],
    rating:[Rating],
    karma:{type:Number},
    hash:String,
    salt:String
});


User.plugin(uniqueValidator,{message:'is already taken'});

User.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
  return this.hash === hash;
};

User.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
};

User.methods.generateJWT = function() {
    var today = new Date();
    var exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    return jwt.sign({
      id: this._id,
      userName: this.userName,
      exp: parseInt(exp.getTime() / 1000),
    }, secret);
  };
  
  User.methods.toAuthJSON = function(){
    return {
      id:this._id,
      userName: this.userName,
      email: this.email,
      token: this.generateJWT(),
      favorites: this.favorites,
      follow:this.follow
    };
  };
module.exports = mongoose.model('User',User);