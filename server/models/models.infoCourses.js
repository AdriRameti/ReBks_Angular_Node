const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const slug = require("slug");

const coursesSchema = mongoose.Schema({
    slug:{type:String, lowercase: true, unique: true},
    curso:{type:Number},
    ensenanza:{type:String},
    año:{type:String},
    img:{type:String},
    asignaturas:[{type:String}]
});

coursesSchema.plugin(uniqueValidator,{message:'is already taken'});

coursesSchema.pre('validate',function(next){

    if(!this.slug){
        this.slugify();
    }

    next();
});

coursesSchema.methods.slugify = function (){
    this.slug = slug(this.ensenanza)+'-'+(Math.random() * Math.pow(36,6) | 0).toString(36);
}

module.exports = mongoose.model('courses',coursesSchema);