const mongoose = require('mongoose') ;
const dotenv = require('dotenv') ;
dotenv.config() ;
const mongoURI = process.env.MONGO_URI;


const connectToMongo = ()=>{
    mongoose.connect(mongoURI).then(()=>{
        console.log("Connected to MongoDB Successfully") ;
    }).catch((error)=>{
        console.error("error : ",error) ;
    })
}

module.exports = connectToMongo ;