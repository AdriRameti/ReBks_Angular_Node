const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const slug = require("slug");

const usersSchema = mongoose.Schema({
    slug:{type:String, lowercase: true, unique: true},
    nombreCompleto:{type:String},
    fechaNacimiento:{type:String},
    poblacion:{type:String},
    email:{type:String},
    password:{type:String},
    tipo:{type:String},
    avatar:{type:String}
});

usersSchema.plugin(uniqueValidator,{message:'is already taken'});

usersSchema.pre('validate',function(next){

    if(!this.slug){
        this.slugify();
    }

    next();
});

usersSchema.methods.slugify = function (){
    this.slug = slug(this.nombreCompleto)+'-'+(Math.random() * Math.pow(36,6) | 0).toString(36);
}

module.exports = mongoose.model('users',usersSchema);
