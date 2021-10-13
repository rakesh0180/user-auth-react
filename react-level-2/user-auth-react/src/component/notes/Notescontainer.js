import axios from "axios";
import React, { useEffect, useState } from "react";
import NotesForm from "./NotesForm";
import NotesList from "./NotesList";

const NotesContainer = (props) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get("http://dct-user-auth.herokuapp.com/api/notes", {
        headers: {
          "x-auth": localStorage.getItem("loginToken"),
        },
      })
      .then((response) => {
        const res = response.data;
        setNotes(res);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const AddNote = (note) => {
    setNotes(note, ...notes);
  };

  const removeItem = (id) => {
    axios
      .delete(`http://dct-user-auth.herokuapp.com/api/notes/${id}`, {
        headers: {
          "x-auth": localStorage.getItem("loginToken"),
        },
      })
      .then((resp) => {
        console.log(resp.data);
      });
    const res = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(res);
  };

  return (
    <div>
      <h2>My Notes</h2>
      {notes.length === 0 ? (
        <>
          <p>No Notes Found Add your First Note</p>
        </>
      ) : (
        <>
          {notes.map((note, i) => {
            return <NotesList key={i} {...note} removeItem={removeItem} />;
          })}
        </>
      )}

      <NotesForm AddNote={AddNote} />
    </div>
  );
};
export default NotesContainer;
