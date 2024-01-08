import React from 'react';
import { useContext } from 'react';
import noteContext from '../context/notes/noteContext'

const NoteItem = (props) => {
    // console.log(note)
const {note,updateNote} = props ;

const context = useContext(noteContext);
const {deleteNote} = context ;

  return (
    <div className='col-md-4'>
    {/* <div>{note.title}</div>
    <div>{note.description}</div>
    <div>{note.tag}</div> */}
<div className="card my-3">
  <div className="card-body">
    <div className='d-flex align-items-center'>
    <h5 className="card-title">{note.title}</h5>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{updateNote(note)}}></i>
    </div>

    <p className="card-text">{note.description}</p>
    {/* <Link to="#" className="btn btn-primary">Go somewhere</Link> */}
  </div>
</div>
        
    </div>
  )
}

export default NoteItem