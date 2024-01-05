const express = require('express') ;
const router = express.Router();

const dotenv = require('dotenv');
dotenv.config() ;

const User = require('../models/User');

const {body , validationResult} = require('express-validator');
const bcrypt = require('bcryptjs');

const jwt = require('jsonwebtoken') ;
const JWT_SECRET = process.env.JWT_SECRET ;

const fetchuser = require('../middleware/fetchUser') ;

//ROUTE 1 : Create a user using :POST "/createuser"
router.post('/createuser', [

        body('email','Enter Valid Email').isEmail(),
        body('name' , 'Enter Valid Name').isLength({min : 3}),
        body('password', 'Password length atleast 5').isLength({min : 5})

] ,async(req,res)=>{
    // console.log(req.body) ;
    // res.send(req.body);
    // const user = User(req.body) ;
    // user.save() ;


    //if error then its called
    const error = validationResult(req) ;
    if(!error.isEmpty()) {
        return res.status(400).json({errors : error.array()});
    }

    try {
        // check wheather user is already exist or not with same email
        let user = await User.findOne({email : req.body.email});
        if(user){
            // console.log(user);
            return res.status(400).json({error : "User Already Exists with Same Email"});
        }
        const salt = await bcrypt.genSalt(10) ;
        const securePass = await  bcrypt.hash(req.body.password , salt) ;

        // console.log(securePass) ;
        //create a new user
        user = await User.create({
            name : req.body.name ,
            email: req.body.email ,
            password : securePass,
        })

        const data = {
            user : {
                id : user.id 
            }
        }

        const authtoken = jwt.sign(data,JWT_SECRET);
        // console.log("JWTDATA : ",authtoken);
        res.send(user);
    
    }catch{

        (error)=>{
             console.log(error.message) ;
             res.status(500).send("Some error occured") ;   
        }
    }
    // .then((user)=>{res.json(user)}).catch((error)=>{
    //     console.log(error);
    //     res.json({error : 'Please enter a unique email',
    //               message : error.message,
    //             })
    // })

})

//ROUTE 2 : authentication a user using :  POST "api/auth/login" : no login require
router.post('/login' , [

    body('email','Enter Valid Email').isEmail(),
    body('password','passwaord cannot be blank').exists() ,


] , async(req,res)=>{

    const error = validationResult(req) ;
    if(!error.isEmpty()) {
        return res.status(400).json({errors : error.array()});
    }

    const {email , password} = req.body ;
    try{

        let user = await User.findOne({email}) ;
        if(!user){
           return res.status(400).json({error : "Please try to login with correct credentials"}) 
        }

        const passwordcompare = await bcrypt.compare(password , user.password);
        if(!passwordcompare){
            return res.status(400).json({error : "Please try to login with correct credentials"}) 
        }

        const payload = {
            user : {
                id : user.id 
            }
        }

        const authtoken = jwt.sign(payload,JWT_SECRET);
        // console.log("JWTDATA : ",authtoken);
        res.json(authtoken);
         

    }catch{
        (error)=>{
            console.log(error.message) ;
            res.status(500).send("Internal Server Error") ;   
       }
    }

}) ;


//ROUTE 3 : get loggedin User Details : POST "/api/auth/getuser"
router.post('/getuser' , fetchuser , async (req,res)=>{

    try{

        // res.status(401).send(req.user.id)
        const userId = await req.user.id ;
        const user =await User.findById(userId).select("-password") ;
        res.send(user);
    }catch{

        (error)=>{
            console.log(error.message) ;
            res.status(500).send("Internal Server Error") ;   
    }
    }
})

    

module.exports = router ;