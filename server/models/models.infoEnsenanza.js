const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug');

const ensenanzaSchema = mongoose.Schema({
    slug:{type:String, lowercase: true, unique: true},
    titulo:{type:String},
    img:{type:String}
});

ensenanzaSchema.plugin(uniqueValidator,{message:'is already taken'});

ensenanzaSchema.pre('validate',function(next){

    if(!this.slug){
        this.slugify();
    }

    next();
});

ensenanzaSchema.methods.slugify = function(){
    this.slug = slug(this.titulo)+'-'+(Math.random() * Math.pow(36,6) | 0).toString(36);
}

module.exports = mongoose.model('ensenanza',ensenanzaSchema);