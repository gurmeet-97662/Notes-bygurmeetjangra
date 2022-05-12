import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router";
import { GlobalContext } from "../context/notes/NoteState";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

function Notes(props) {
  const context = useContext(GlobalContext);
  let history = useHistory(); 
  const { notes, getAllNotes, editNote } = context;
  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote]= useState({ id: "", etitle: "", edescription: "", etag: ""})
  useEffect(() => {
    if(localStorage.getItem('token')){
    getAllNotes();
    }
    else{
     history.push("/login")
    }
  }, []);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({ id: currentNote._id, etitle: currentNote.title, edescription: currentNote.description, etag: currentNote.tag})
    
  };
  
  const handleClick = (e)=>{
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click(); 
    props.showAlert(" Notes Updated Successfully", "success")
   
  }
  const onChange=(e)=>{
      setNote({...note,[e.target.name]: e.target.value})

  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <button
        ref={ref}
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    value = {note.etitle}
                    onChange={onChange}
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    aria-describedby="emailHelp"
                    minLength={4}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    value = {note.edescription}
                    onChange={onChange}
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    minLength={6}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    value = {note.etag}
                    onChange={onChange}
                    className="form-control"
                    id="etag"
                    name="etag"
                    minLength={3}
                    required
                  />
                </div>
                
              </form>
            </div>
            <div className="modal-footer">
              <button
              ref = {refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button onClick={handleClick} type="button" className="btn btn-primary">
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
        {notes.length === 0 && "Add Some Notes In Your Database"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem  key={note._id} updateNote={updateNote} note={note} showAlert={props.showAlert}/>
          );
        })}
      </div>
    </>
  );
}
export default Notes;
