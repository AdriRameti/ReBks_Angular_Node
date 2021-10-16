const courses = require('../models/models.infoCourses');

exports.createCourses = async(req,res) =>{
    try{
        let Courses;
        Courses = new courses(req.body);
        await Courses.save();
        res.send(Courses);
    }catch(e){
        console.log(e);
    }
}

exports.findAllCourses = async(req,res)=>{
    try{
        const course = await courses.find();
        res.json(course);
    }catch(e){
        console.log(e);
    }
}

exports.findOneCourses = async(req,res)=>{
    try{
        const Courses = await courses.findById(req.params.id);
        if(!Courses){
            console.log('No se encontro el curso');
        }
        res.json(Courses);

    }catch(e){
        console.log(e);
    }
}

exports.findAsigCourses = async(req,res)=>{

    try{
        const Courses =  await courses.find({ensenanza:req.params.ensenanza});
        if(!Courses){
            console.log('No se encontro el curso de esa enseñanza');
        }
        res.json(Courses);

    }catch(e){
        console.log(e);
    }
}
exports.findSubjects = async(req,res)=>{
    try{
            // console.log('No se encontro la busqueda');
            const Courses = await courses.find({ensenanza:req.params.ensenanza,curso:req.params.curso});
        
            if(!Courses){
                console.log('No se encontro el curso de esa enseñanza');
            }
            res.json(Courses);

    }catch(e){
        console.log(e);
    }
}

// exports.findSearchSubjects = async(req,res)=>{
//     try{
//         const Courses = await courses.find({asignaturas:'/.*'+req.params.search+'.*/'});
//         console.log(Courses);
//         if(!Courses){
//             console.log('No se encontro libros');
//         }
//         res.json(Courses);
//     }catch(e){
//         console.log(e);
//     }
// }

exports.updateCourses = async(req,res)=>{
    try{
        const {curso,ensenanza,año,img,asignaturas} = req.body;
        let Course = await courses.findById(req.params.id);
        if(!Course){
            console.log('No hemos encontrado el curso');
        }else{
            //console.log(Course);
            Course.curso = curso;
            Course.ensenanza = ensenanza;
            Course.año = año;
            Course.img = img;
            Course.asignaturas = asignaturas;
        }

        Course = await courses.findOneAndUpdate({_id:req.params.id},Course,{new:true});
        res.json(Course);
    }catch(e){
        console.log(e);
    }
}

exports.deleteCourses = async(req,res)=>{
    try{
        let Courses = await courses.findById(req.params.id);
        if(!Courses){
            console.log('No se encontro el curso para eliminarlo');
        }else{
            await courses.findOneAndRemove({_id:req.params.id});
            res.json({msg : 'Curso eliminado con éxito!'});
        }
    }catch(e){
        console.log(e);
    }
}
