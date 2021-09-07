import React, { useState } from "react";
import { useDispatch } from "react-redux";
import validator from "validator";
import { addMovie } from "./../../action/moviesAction";

const MovieForm = (props) => {
  const [movieName, setMovieName] = useState("");
  const [rating, setRating] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const errors = {};

  const dispatch = useDispatch();

  const handleChange = (e) => {
    if (e.target.name === "movieName") {
      setMovieName(e.target.value);
    } else if (e.target.name === "rating") {
      setRating(e.target.value);
    }
  };

  const runValidator = () => {
    if (movieName.trim().length === 0) {
      errors.movieName = "movie name cannot be empty";
    }

    if (rating.trim().length === 0) {
      errors.rating = "rating field cannot be empty";
    } else if (!validator.isNumeric(rating)) {
      errors.rating = "rating be in Numeric";
    } else if (Number(rating) > 10) {
      errors.rating = "rating should less than or equal to 10";
    }
  };

  const formReset = () => {
    setMovieName("");
    setRating("");
  };

  const mySpanStyle = {
    color: "red",
    fontFamily: "Arial",
    padding: "10px",
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(movieName, rating);
    // console.log("typeof rating is = ", typeof rating);

    runValidator();

    if (Object.keys(errors).length === 0) {
      const formData = {
        id: Number(new Date()),
        movieName: movieName,
        rating: rating,
      };
      console.log(formData);
      dispatch(addMovie(formData));

      formReset();
    } else {
      setFormErrors(errors);
      console.log(errors);
    }
  };

  return (
    <div className="form-group">
      <div className="mb-5">
        <div>
          <h2 className="display-3">Add Movie</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              value={movieName}
              onChange={handleChange}
              name="movieName"
              placeholder="Enter movie name"
            />
            <br />

            {formErrors.movieName && (
              <span style={mySpanStyle}>
                {formErrors.movieName} <br />{" "}
              </span>
            )}

            <input
              type="text"
              value={rating}
              onChange={handleChange}
              name="rating"
              placeholder="IMDB rating"
            />
            <br />

            {formErrors.rating && (
              <span style={mySpanStyle}>
                {formErrors.rating} <br />{" "}
              </span>
            )}

            <input type="submit" value="Add" />
          </form>
        </div>
      </div>
    </div>
  );
};

export default MovieForm;
