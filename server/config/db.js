const mongoose = require('mongoose');
require('dotenv').config({path:'variablesDb.env'});
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.DB_MONGO, {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            useFindAndModify: false
        })
        console.log('DB Connected');
    }catch(e){
        setTimeout(connectDB, 5000); 
        console.log(e);
        process.exit(1)
    }
}
module.exports = connectDB;