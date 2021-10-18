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
    var limit = parseInt(req.query.limit);
    var skip = parseInt(req.query.skip);
    try{
        const books = await book.find().limit(limit).skip(skip);
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
    var limit = parseInt(req.query.limit);
    var skip = parseInt(req.query.skip);
    try{
        const Book = await book.find(
            {asignatura:req.params.asignatura,
            curso:req.params.curso,
            ensenanza:req.params.ensenanza}
            ).limit(limit).skip(skip);
        if(!Book){
            console.log('No se encotro este libro');
        }
        res.json(Book);
    }catch(e){
        console.log(e);
    }
}
exports.findSearchBook = async (req,res) =>{
    try{
        if(req.params.tipo == 0){
            const Book = await book.find({asignatura:{$regex:'.*'+req.params.search+'.*'}});
            if(!Book){
                console.log('No se encntro el libro de la busqueda');
            }
            res.json(Book);
        }else if(req.params.tipo != 0){
            if(req.params.tipo == -1){
                const Libro = await book.find({ensenanza:req.params.search});
                if(!Libro){
                    console.log('No se encontro el libro de esa Enseñanza');
                }
                res.json(Libro);
            }else{
                const Libro = await book.find({ensenanza:req.params.search,curso:req.params.tipo});
                if(!Libro){
                    console.log("No se encontro el libro de esa enseñanza y curso");
                }
                res.json(Libro);
            }
        }

    }catch(e){

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