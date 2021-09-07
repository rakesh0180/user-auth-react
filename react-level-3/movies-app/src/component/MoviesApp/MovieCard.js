import React from "react";
import { useDispatch } from "react-redux";
import { removeMovie } from "../../action/moviesAction";

function MovieCard(props) {
  const { id, movieName, rating } = props;

  const dispatch = useDispatch();

  const handleRemoveMovie = (id) => {
    dispatch(removeMovie(id));
  };

  return (

    <div className="col-md-5">
      <div className="card border-danger bg-info text-white mb-3">
        <div className="card-body">
          <h4 className="card-title">Name = {movieName}</h4>
          <h4>rating = {rating}</h4>

          <img
            className="text-end mb"
            onClick={() => {
              handleRemoveMovie(id);
            }}
            src="https://img.icons8.com/material-rounded/24/fa314a/delete-trash.png"
            alt="delete"
          />
        </div>
      </div>
    </div>
    // </div>
  );
}

export default MovieCard;
