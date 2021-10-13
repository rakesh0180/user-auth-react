import axios from "axios";
import React, { useState } from "react";
import { swal } from "sweetalert";
import validator from "validator";

const NotesForm = (props) => {
  const { AddNote } = props;
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [noteErrors, setNoteErrors] = useState({});

  const errors = {};
  const handleChange = (e) => {
    if (e.target.name === "title") {
      setTitle(e.target.value);
    } else if (e.target.name === "body") {
      setBody(e.target.value);
    }
  };

  const runValidation = () => {
    if (validator.isEmpty(title)) {
      errors.title = "title can't be empty";
    } else if (!validator.isLength(title, [15, 100])) {
      errors.title = "title must have at least 15-100 characters";
    }
  };

  const mySpanStyle = {
    color: "red",
    fontFamily: "Arial",
    padding: "10px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      title: title,
      body: body,
    };
    console.log(formData);

    runValidation();

    if (Object.keys(errors).length === 0) {
      setNoteErrors({});
      axios
        .post("http://dct-user-auth.herokuapp.com/api/notes", formData, {
          headers: {
            "x-auth": localStorage.getItem("loginToken"),
          },
        })
        .then((res) => {
          const result = res.data;
          console.log(result);
          if (Object.keys(result).includes("errors")) {
            swal(res.message);
          } else {
            swal.alert("successfully notes added");
            AddNote(formData);
          }
        })
        .catch((err) => {
          console.log(err.message);
        });

      setTitle("");
      setBody("");
    } else {
      setNoteErrors(errors);
    }
  };
  return (
    <div>
      <h2>Add Notes</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={title}
          onChange={handleChange}
          placeholder="enter your title"
        />
        <br />
        {noteErrors.title && (
          <span style={mySpanStyle}>{noteErrors.title}</span>
        )}
        <br />
        <textarea
          name="body"
          value={body}
          onChange={handleChange}
          cols="30"
          rows="5"
          placeholder="enter your notes"
        ></textarea>
        <br />
        <input type="submit" value="save" />
      </form>
    </div>
  );
};
export default NotesForm;
