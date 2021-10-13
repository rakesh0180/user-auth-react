import axios from "axios";
import React from "react";
import swal from "sweetalert";

const NotesList = (props) => {
  const { _id, title, body, removeItem } = props;

  const handleRemove = () => {
    const conformation = window.confirm("are you sure");
    if (conformation) {
      removeItem(_id);
    }
  };

  const handleNote = (e) => {
    e.preventDefault();
    axios
      .get(`http://dct-user-auth.herokuapp.com/api/notes/${_id}`, {
        headers: {
          "x-auth": localStorage.getItem("loginToken"),
        },
      })
      .then((response) => {
        const res = response.data;
        swal(`Title : ${res.title}
                Body : ${res.body}
            `);
      });
  };

  return (
    <div>
      <blockquote onClick={handleNote}>
        {title}-{body}
      </blockquote>
      <button onClick={handleRemove}>delete</button>
    </div>
  );
};
export default NotesList;
