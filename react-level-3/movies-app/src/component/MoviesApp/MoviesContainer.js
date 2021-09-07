import React from "react";
import MovieForm from "./MovieForm";
import MoviesList from "./MoviesList";
import MovieStats from "./MovieStats";

function MoviesContainer(props) {
  return (
    <div
      className="row"
      // style={{
      //   border: "5px solid red",
      //   margin: "6px",
      //   padding: "6px",
      // }}
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
