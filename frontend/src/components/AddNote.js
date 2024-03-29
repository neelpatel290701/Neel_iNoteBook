import React, { useState } from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext'

export default function AddNote() {

    const context = useContext(noteContext);
    const {addNote} = context ;

    const [note , setNote] = useState({title:"",description:"",tag:""})

    const handleClick = (e)=>{
            e.preventDefault();
            addNote(note.title , note.description , note.tag);
            setNote({title:"",description:"",tag:""})
    }

    const onChange =(e)=>{
        setNote({...note , [e.target.name]: e.target.value})
    }

  return (
    <>
        <div className='container my-4' >

        <h1>Add Notes</h1>

        <form>
    <div className="mb-3 my-4">
        <label htmlFor="title" className="form-label">Title</label>
        <input type="text" className="form-control" id="title" name="title" value={note.title}aria-describedby="titleHelp"  onChange={onChange}  minLength={3} required/>
    </div>

    <div className="mb-3">
        <label htmlFor="description" className="form-label">Description</label>
        <input type="text" className="form-control" id="description"  name="description" value={note.description} onChange={onChange}  minLength={3} required/>
    </div>

    <div className="mb-3">
        <label htmlFor="tag" className="form-label">Tag</label>
        <input type="text" className="form-control" id="tag"  name="tag" value={note.tag} onChange={onChange}/>
    </div>


    <button type="submit"  disabled={note.title.length < 3 || note.description.length < 3}className="btn btn-primary"  onClick={handleClick}>Add Note</button>
    </form>

    </div>
    </>
  )
}
