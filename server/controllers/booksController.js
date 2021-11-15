const  Mongoose  = require('mongoose');
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
exports.booksUser = async(req,res)=>{
    var limit =parseInt(req.params.limit);
    var skip = parseInt(req.params.skip);
    var idUser = Mongoose.Types.ObjectId(req.params.id); 
    try{
        const books = await book.find({"autor":idUser})
        .populate('autor')
        .limit(limit)
        .skip(skip).then(function(data){
            res.json(data);
        });
        
    }catch(e){
        console.log(e);
    }
    
}
exports.createComment = async(req,res)=>{
    var Comment = req.body;
    var id = Mongoose.Types.ObjectId(req.body.book);
    try{
        book.find({comments:{$in:[Comment]},_id:id}).then(function(com){
            console.log(com);
            if(com.length==0){
                book.findById(id).then(function(book){
                    book.comments.push(Comment);
                    book.save().then(function(data){
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
exports.updateComment = async(req,res)=>{
    var id = Mongoose.Types.ObjectId(req.body.id);
    var idUser = req.payload.id;
    book.aggregate().unwind({path:'$comments'})
    .match({'comments._id':id})
    .project({'comments':1})
    .then(function(comment){
        var userFav = comment[0].comments.usersFav.map(id => id.toString());
        var validation = false;
        if(comment){
            validation = userFav.includes(idUser.toString());
            if(validation){
                book.findOneAndUpdate({
                        comments:{$elemMatch:{_id:id}}
                    },
                    {$pull:{'comments.$.usersFav':idUser}, $inc:{'comments.$.favorito':-1}}
    
                ).then(function(data){
                    res.json(0);
                });
            }else{
            book.findOneAndUpdate({
                comments:{$elemMatch:{_id:id}}
            },
                {$push:{'comments.$.usersFav':idUser}, $inc:{'comments.$.favorito':1}}

            ).then(function(data){
                res.json(1);
            });
            }
        }else{
            res.json(1);
        }
        
    })
}
exports.deleteComment = async(req,res)=>{
    var idComment = Mongoose.Types.ObjectId(req.body._id);
    book.findById(req.body.book).then(function(data){
        if(data){
           book.findOneAndUpdate({
               comments:{$elemMatch:{_id:idComment}}
           },{
               $pull:{comments:{_id:idComment}}
           }, {
                'multi': true,
                'upsert': false
            }
           ).then(function(data){
               res.json(0);
           });
           
        }
    });
}
exports.findallBooks = async(req,res) =>{
    var limit = parseInt(req.query.limit);
    var skip = parseInt(req.query.skip);
    try{
        const books = await book.find().populate('autor').limit(limit).skip(skip);
        function comparar ( a , b){
            return   b.autor.karma - a.autor.karma
        }
        books.sort(comparar)
        res.json(books)
    }catch(e){
        console.log(e);
    }
}

exports.findOneBook = async(req,res) => {
    try{
        const Book = await book.findById(req.params.id).populate('autor');
        if(!Book){
            console.log('No se encontro el libro');
        }
        function comparar ( a , b){
            return   b.autor.karma - a.autor.karma
        }
        Book.sort(comparar)
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
            ).populate('autor').limit(limit).skip(skip);
        if(!Book){
            console.log('No se encotro este libro');
        }
        function comparar ( a , b){
            return   b.autor.karma - a.autor.karma
        }
        Book.sort(comparar)
        res.json(Book);
    }catch(e){
        console.log(e);
    }
}
exports.findSearchBook = async (req,res) =>{
    try{
        if(req.params.tipo == 0){
            const Book = await book.find({asignatura:{$regex:'.*'+req.params.search+'.*'}}).populate('autor');
            if(!Book){
                console.log('No se encntro el libro de la busqueda');
            }
            res.json(Book);
        }else if(req.params.tipo != 0){
            if(req.params.tipo == -1){
                const Libro = await book.find({ensenanza:req.params.search}).populate('autor');
                if(!Libro){
                    console.log('No se encontro el libro de esa Enseñanza');
                }
                res.json(Libro);
            }else{
                const Libro = await book.find({ensenanza:req.params.search,curso:req.params.tipo}).populate('autor');
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
        const Books = await book.find({slug:req.params.slug}).populate('comments.autor').populate('autor');
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