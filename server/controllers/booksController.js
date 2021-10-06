const book = require('../models/models.infoBooks');

exports.createBook = async(req,res) => {
    try{
        let Book;
        Book = new book(req.body);
        await Book.save();
        res.send(Book);
    }catch(e){
        console.log(e);
    }
}

exports.findallBooks = async(req,res) =>{
    try{
        const books = await book.find();
        res.json(books)
    }catch(e){
        console.log(e);
    }
}

exports.findOneBook = async(req,res) => {
    try{
        const Book = await book.findById(req.params.id);
        if(!Book){
            console.log('No se encontro el libro');
        }
        res.json(Book);
        
    }catch(e){
        console.log(e);
    }
}
exports.findThisBook = async (req,res) => {
    try{
        const Book = await book.find({asignatura:req.params.asignatura,curso:req.params.curso,ensenanza:req.params.ensenanza})
        if(!Book){
            console.log('No se encotro este libro');
        }
        res.json(Book);
    }catch(e){
        console.log(e);
    }
}

exports.findDetailsBook = async (req,res)=>{
    try{
        const Books = await book.find({slug:req.params.slug});
        if(!Books){
            console.log("No se ha encontrado el details del libro");
        }
        res.json(Books);
    }catch(e){
        console.log(e);
    }
}
exports.updateBook = async (req,res) =>{
    try{
        const {ensenanza,curso,asignatura,titulo,editorial,año,tapa,descripcion} = req.body;
        let Book = await book.findById(req.params.id);
        if(!Book){
            console.log('No existe el libro');
        }else{
            Book.ensenanza = ensenanza;
            Book.curso = curso;
            Book.asignatura = asignatura;
            Book.titulo = titulo;
            Book.editorial = editorial;
            Book.año = año;
            Book.tapa = tapa;
            Book.descripcion = descripcion;
        }
        Book = await book.findOneAndUpdate({_id:req.params.id}, Book,{new:true});
        res.json(Book);
    }catch(e){
        console.log(e);
    }
}

exports.deleteBook = async (req,res) =>{
    try{
        let Book = await book.findById(req.params.id);
        if(!Book){
            console.log('No se puede eliminar un libro que no esta');
        }else{
            await book.findOneAndRemove({_id:req.params.id});
            res.json({ msg: 'Libro eliminado con éxito!' });
        }
    }catch(e){
        console.log(e);
    }
} 