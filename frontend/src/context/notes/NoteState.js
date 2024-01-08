import { useState } from "react";
import NoteContext from "./noteContext";
import { json } from "react-router-dom";

const NoteState = (props) => {
  const host = "http://localhost:5000";

  const notesInitial = [];

  const [notes, setNotes] = useState(notesInitial);

  //Get all Notes
  const getNotes = async () => {
    // TODO : API Call
    const url = `${host}/api/notes/fetchallnotes`;
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5N2ZmM2MwYmJlZjVjMmNmMDNhNmVlIn0sImlhdCI6MTcwNDQ2MDEwNH0.k8v6TUtOwzL_gP4ihRJwBe7xOI_tKhfOuGW5riFPQqQ",
      },
    });

      const json = await response.json() ;
      // console.log(json);
      setNotes(json)
  };

  //Add a Note
  const addNote = async (title, description, tag) => {
    // TODO : API Call
    const url = `${host}/api/notes/addnote`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5N2ZmM2MwYmJlZjVjMmNmMDNhNmVlIn0sImlhdCI6MTcwNDQ2MDEwNH0.k8v6TUtOwzL_gP4ihRJwBe7xOI_tKhfOuGW5riFPQqQ",
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const json = await response.json() ;
    console.log("Not Added : "+json);
    // console.log(title)
    // const note = {
    //   _id: "6598244d1572eb8b7084b83496",
    //   user: "6597ff3c0bbef5c2cf03a6ee",
    //   title: title,
    //   description: description,
    //   tag: tag,
    //   date: "2024-01-05T16:23:49.524Z",
    //   __v: 0,
    // };
    setNotes(notes.concat(json));
  };

  //Delete a Note
  const deleteNote = async(id) => {
    // TODO : API Call

    const url = `${host}/api/notes/deletenote/${id}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5N2ZmM2MwYmJlZjVjMmNmMDNhNmVlIn0sImlhdCI6MTcwNDQ2MDEwNH0.k8v6TUtOwzL_gP4ihRJwBe7xOI_tKhfOuGW5riFPQqQ",
      },
    });

    const json = await response.json();
    console.log(json);

    // console.log("Deleting a  note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //Edit a Note
  const editNote = async (id, title, description, tag) => {
    // TODO : API Call
    const url = `${host}/api/notes/updatenote/${id}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjU5N2ZmM2MwYmJlZjVjMmNmMDNhNmVlIn0sImlhdCI6MTcwNDQ2MDEwNH0.k8v6TUtOwzL_gP4ihRJwBe7xOI_tKhfOuGW5riFPQqQ",
      },
      body: JSON.stringify({title , description , tag}),
    });

    const json = await response.json({ title, description, tag });
    console.log("Updated Note : "+json)


    let newNotes = JSON.parse(JSON.stringify(notes)) ;

    // Logic Part
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];

      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].title = title;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes(newNotes) ;
  };

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote , getNotes}}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
