const express = require("express")
const app = express()

const connectToMongo = require('./db') ;
connectToMongo() ;

const dotenv = require('dotenv') ;
dotenv.config()

const PORT = process.env.PORT ;

app.use(express.json());

app.get('/' , (req,res)=>{
    res.send("HELLO NEEL PATEL")
})

//Available Notes
app.use('/api/auth' , require('./routes/auth')) ;
app.use('/api/notes' , require('./routes/notes')) ;

app.listen(PORT , (error)=>{
    if(error) console.log("error: " ,error)
    console.log("Running Server Successfully At PORT :",PORT)
})
