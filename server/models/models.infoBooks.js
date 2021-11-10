const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
const slug = require('slug');
const imgSchema = mongoose.Schema({
    portada:{type:String},
    subPortada:{type:String},
    imgVenta1:{type:String},
    imgVenta2:{type:String}
});
const Comments = mongoose.Schema({
    body:{type:String},
    autor:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    book: {type: mongoose.Schema.Types.ObjectId, ref: 'book'}
});
const bookSchema = mongoose.Schema({
    slug:{type:String, lowercase: true, unique: true},
    ensenanza:{type:String},
    curso:{type:Number},
    asignatura:{type:String},
    titulo:{type:String} ,
    editorial:{type:String},
    any: {type:Number} ,
    tapa:{type:String} ,
    estado:{type:String,} ,
    descripcion:{type:String} ,
    precio:{type:String},
    img:imgSchema,
    autor:{type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments:[Comments]
});

bookSchema.plugin(uniqueValidator,{message:'is already taken'});

bookSchema.pre('validate',function(next){
if(!this.slug){
    this.slugify();
}

next();

});

bookSchema.methods.slugify = function(){
    this.slug = slug(this.titulo)+'-'+(Math.random() * Math.pow(36,6) | 0).toString(36);
}

module.exports = mongoose.model('book',bookSchema);