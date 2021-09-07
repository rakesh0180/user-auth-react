import React from "react";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import MovieStats from "./MovieStats";

function MoviesContainer(props) {
  return (
    <div
      className="row"

    >
      <h5>MoviesContainer</h5>
      <div className="col-md-8">
        <MoviesList />
      </div>
      <div className="col-md-4 mb-3">
        <MovieForm />
        <MovieStats />
      </div>
    </div>
  );
}

export default MoviesContainer;
