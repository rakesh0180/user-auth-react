import React from "react";
import { useSelector } from "react-redux";

function MovieStats(props) {
  const movies = useSelector((state) => state.movies);
  // console.log(movies);

  const ratingArray = [];
  movies.forEach((ele) => {
    ratingArray.push(ele.rating);
  });
  const maxRating = Math.max(...ratingArray);
  // console.log("maxRating", maxRating);

  let topMovie;

  movies.forEach((movie) => {
    if (movie.rating === maxRating) {
      topMovie = movie;
      console.log(1);
    }
  });

  // console.log("topMovie", topMovie);

  return (
    <div className="row">
      <div>
        {movies.length > 0 ? (
          <div className="col-md-10">
            <div className="card">
              <div className="card bg-light">
                <div className="card-header">
                  <h3> MovieStats</h3>
                </div>
                <div className="card-body">
                  <h4 className="card-title">total movies = {movies.length}</h4>
                  <h4 className="card-title">#{topMovie}</h4>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">MovieStats</h3>
              <h4 className="card-title">No Movies added</h4>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default MovieStats;
