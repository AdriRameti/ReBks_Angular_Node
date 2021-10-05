const users = require('../models/models.infoUsers');

exports.createUsers = async (req,res) =>{
    try{
        let Users;
        Users = new users({
            nombreCompleto:req.body.nombreCompleto,
            fechaNacimiento:req.body.fechaNacimiento,
            poblacion:req.body.poblacion,
            email:req.body.email,
            password:req.body.password,
            tipo:req.body.tipo,
            avatar:req.body.avatar
        });
        await Users.save();
        res.send(Users);
    }catch(e){
        console.log(e);
    }
}

exports.findAllUsers = async(req,res)=>{
    try{
        const user = await users.find();
        if(!user){
            console.log('No se encontro ningun usuario');
        }
        res.json(user)
    }catch(e){
        console.log(e);
    }
}

exports.findOneUsers = async(req,res)=>{
    try{
        const Users = await users.findById(req.params.id);
        if(!Users){
            console.log('No se encontro el usuario');
        }
        res.json(Users);
    }catch(e){
        console.log(e);
    }
}

exports.updateUsers = async(req,res)=>{
    try{
    const {nombreCompleto,fechaNacimiento,poblacion,email,password,tipo,avatar} = req.body;
    let Users = await users.findById(req.params.id);
    
    if(!Users){
        console.log('No hemos encontrado el usuario');
    }else{
        Users.nombreCompleto = nombreCompleto;
        Users.fechaNacimiento = fechaNacimiento;
        Users.poblacion = poblacion;
        Users.email = email;
        Users.password = password;
        Users.tipo = tipo;
        Users.avatar = avatar;
    }
        Users = await users.findOneAndUpdate({_id:req.params.id},Users,{new:true});
        res.json(Users);
    }catch(e){
        console.log(e);
    }
}

exports.deleteUsers = async(req,res)=>{
    try{
        let Users = await users.findById(req.params.id);
        if(!Users){
            console.log('No se encontro el usuario');
        }else{
            await users.findOneAndRemove({_id:req.params.id});
            res.json({msg:'Usuario eliminado con éxito!!'});
        }
    }catch(e){
        console.log(e);
    }
}