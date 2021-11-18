const ensenanza = require('../models/models.infoEnsenanza');

exports.createEnsenanza = async(req,res) => {
    try{
        let Ensenanza;
        Ensenanza = new ensenanza(req.body);
        await Ensenanza.save();
        res.send(Ensenanza);
    }catch(e){
        console.log(e);
    }
}

exports.findAllEnsenanza = async (req,res) =>{
    console.log('Hola enseñanzas');
    try{
        const Ensenanzas = await ensenanza.find();
        res.json(Ensenanzas);
    }catch(e){
     console.log(e);   
    }
}

exports.findOneEnsenanza = async (req,res) =>{
    try{
        const Ensenanza = await ensenanza.findById(req.params.id);
        if(!Ensenanza){
            console.log('No se encontro el insituto');
        }
        res.json(Ensenanza);
    }catch(e){
     console.log(e);   
    }
}

exports.updateEnsenanza = async (req,res) => {
    try{
        const {titulo,img} = req.body;
        let Ensenanza = await ensenanza.findById(req.params.id);

        if(!Ensenanza){
            console.log('No existe el instituto');
        }else{
            Ensenanza.titulo = titulo;
            Ensenanza.img = img;
        }

        Ensenanza = await ensenanza.findOneAndUpdate({_id:req.params.id},Ensenanza,{new:true});
        res.json(Ensenanza);
    }catch(e){
     console.log(e);   
    }
}

exports.deleteEnsenanza = async (req,res) =>{
    try{
        let Ensenanza = await ensenanza.findById(req.params.id);

        if(!Ensenanza){
            console.log('No se pudo eliminar el instituto correctamente');
        }else{
            await ensenanza.findOneAndRemove({_id:req.params.id});
            res.json({msg :'Instituto eliminado correctamente'});
        }
    }catch(e){
     console.log(e);   
    }
}