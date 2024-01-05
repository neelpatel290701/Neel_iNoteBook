const dotenv = require('dotenv');
dotenv.config() ;

const jwt = require('jsonwebtoken') ;
const JWT_SECRET = process.env.JWT_SECRET ;


const fetchuser = (req,res,next)=>{

    const token = req.header('auth-token') ;
    if(!token){
        res.status(401).send({error : "please authenticate using a valid token.." })
    }

    try{

        const data =  jwt.verify(token,JWT_SECRET);
        req.user = data.user ;
        // res.status(401).send("NEEL1")
        next() ;
        // res.status(401).send("NEEL2")

    }catch{
        (error)=>{
            res.status(401).send({error : "please authenticate using a valid token" })
        }
    }

}

module.exports = fetchuser ;