import React, {useContext} from 'react'
import contextvalue from "../context/notes/NoteContext"

const Noteitem = (props) => {
    const context = useContext(contextvalue);
    const {deletenote} = context ;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className="card my-4">
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="fa-solid fa-trash mx-2 " onClick={()=>{deletenote(note._id)}}></i>
                        <i className="fa-solid fa-user-pen" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                </div>
            </div>
        </div>
    )
}

export default Noteitem
