const express = require('express') ;
const router = express.Router();
const Notes = require('../models/Notes')
const fetchuser = require('../middleware/fetchUser') ;

const {body , validationResult} = require('express-validator');

//ROUTE 1 : get all the notes : GET "/api/notes/fetchallnotes"
router.get('/fetchallnotes', fetchuser ,async (req,res)=>{
    
try{

    const notes = await Notes.find({user : req.user.id}); 
    res.json(notes);

}catch{
    (error)=>{
        console.log(error.message) ;
        res.status(500).send("Some error occured") ;   
   }
}

})


//ROUTE 2 : add all the notes : POST "/api/notes/addnote"
router.post('/addnote', fetchuser , [

    body('title','Enter a Valid Title').isLength({min : 3}),
    body('description' , 'Add ddescription').isLength({min : 3}),

] , async (req,res)=>{

     //if error then its called
     const error = validationResult(req) ;
     if(!error.isEmpty()) {
         return res.status(400).json({errors : error.array()});
     }

     try{

        const {title ,description,tag} = req.body ;
    
        const notes = new Notes({
           title , description , tag , user : req.user.id 
        })
   
        const saveNote = await notes.save()
   
       res.json(saveNote);

     }catch{

        (error)=>{
            console.log(error.message) ;
            res.status(500).send("Some error occured") ;   
       }
     }

  
})

//ROUTE 3: update  notes : PUT "/api/notes/updatenote"

router.put('/updatenote/:id' , fetchuser ,  async (req , res)=>{


    try{

    const {title , description , tag} = req.body ;
    const newNote = {} ; // create new note object
    if(title) {newNote.title = title};
    if(description) {newNote.description = description};
    if(tag) {newNote.tag = tag};

    // const note = Notes.findByIdAndUpdate()
    let note = await Notes.findById(req.params.id) ;
    if(!note){return res.status(404).send("Note Found")}

    if(note.user.toString() !== req.user.id){
            return res.status(404).send("not allowed") ;
    }

    note = await Notes.findByIdAndUpdate(req.params.id , {$set : newNote} , {new  : true}) ;
    res.json({note}) ;
        
    }catch{

        (error)=>{
            console.log(error.message) ;
            res.status(500).send("Some error occured") ;   
       }
     }

    
})

// ROUTE 4: delete notes : DELETE "/api/notes/deletenote"

router.delete('/deletenote/:id' , fetchuser ,  async (req , res)=>{


    try{

        // const note = Notes.findByIdAndUpdate()
    let note = await Notes.findById(req.params.id) ;
    if(!note){return res.status(404).send("Note Found")}

    if(note.user.toString() !== req.user.id){
            return res.status(404).send("not allowed") ;
    }

    note = await Notes.findByIdAndDelete(req.params.id) ;
    res.json({"success" : "Note Deleted" ,note:note }) ;

    }catch{
        
        (error)=>{
            console.log(error.message) ;
            res.status(500).send("Some error occured") ;   
    }
    }

})


module.exports = router ;