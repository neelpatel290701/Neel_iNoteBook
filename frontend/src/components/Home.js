import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext'
import Notes from './Notes';
import AddNote from './AddNote';

export default function Home() {

  const context = useContext(noteContext);
  // const {notes,setNotes} = context ;
  // console.log(context) ;
  const notes = context.notesinitial;
  // console.log(notes) ;

  return (
    <>
      {/* <AddNote /> */}
      <Notes />
    </>
  )
}
