import React from "react";
import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []
  const [notes, setNotes] = useState(notesInitial);



  // fetching all notes
  const getnote = async () => {
    //api call
    const response = await fetch(`${ host }/api/notes/fetchnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1Y2IwMWJmNTVhZGZmZDg5NWY5ZWYxIn0sImlhdCI6MTcxNzM1NDY2MX0.bsAiQJyVqAhKXY7kyqMUcSfAX6RCB4tthcGEvNd3fPs"
      }
    });
    const json = await response.json();
    // console.log(json)  
    setNotes(json)
  }



  // adding a note
  const addnote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${ host }/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1Y2IwMWJmNTVhZGZmZDg5NWY5ZWYxIn0sImlhdCI6MTcxNzM1NDY2MX0.bsAiQJyVqAhKXY7kyqMUcSfAX6RCB4tthcGEvNd3fPs"
      },
      body: JSON.stringify({ title, description, tag })
    });
    // const json = response.json();

    //adding note
    const note = await response.json();
    setNotes(notes.concat(note));
  }



  // editing a note
  const editnote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${ host }/api/notes/updatenote/${ id }`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1Y2IwMWJmNTVhZGZmZDg5NWY5ZWYxIn0sImlhdCI6MTcxNzM1NDY2MX0.bsAiQJyVqAhKXY7kyqMUcSfAX6RCB4tthcGEvNd3fPs"
      },
      body: JSON.stringify({ title, description, tag })

    });
    const json = await response.json();
    // console.log(json);

    let newnote = JSON.parse(JSON.stringify(notes))
    // logic to edit note
    for (let index = 0; index < newnote.length; index++) {
      const element = newnote[index];
      if (element._id === id) {
        newnote[index].title = title;
        newnote[index].description = description;
        newnote[index].tag = tag;
        break;
      }
      
    }
    setNotes(newnote)
  }



  // deleting a note
  const deletenote = async (id) => {
    //api call
    const response = await fetch(`${ host }/api/notes/deletenote/${ id }`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY1Y2IwMWJmNTVhZGZmZDg5NWY5ZWYxIn0sImlhdCI6MTcxNzM1NDY2MX0.bsAiQJyVqAhKXY7kyqMUcSfAX6RCB4tthcGEvNd3fPs"
      }

    });

    const json = await response.json();
    // console.log(json);

    // console.log("deleting note with id" + id)
    const newnotes = notes.filter((note) => { return note._id !== id })
    setNotes(newnotes);
  }


  return (
    <NoteContext.Provider value={{ notes, addnote, editnote, deletenote, getnote }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState