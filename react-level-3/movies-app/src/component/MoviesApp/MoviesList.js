import _ from "lodash";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";

const MoviesList = (props) => {
  const movies = useSelector((state) => {
    return state.movies;
  });
  // const [data, setData] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [list, setList] = useState([]);

  localStorage.setItem("movies", JSON.stringify(movies));

  useEffect(() => {
    setList([...movies]);
  }, [movies]);

  const options = ["NameAsc", "NameDesc", "RatingAsc", "RatingDesc"];

  // console.log("movies", movies);

  const handleChange = (e) => {
    setSearchInput(e.target.value);
    searchBar();
  };

  const handleSortChange = (e) => {
    const sortGetName = e.target.value;
    setSortBy(sortGetName);
    // console.log(sortGetName);
    handleSort();
  };

  const searchBar = () => {
    const result = movies.filter(
      (movie) =>
        movie.movieName.toLowerCase().includes(searchInput.toLowerCase()) ||
        movie.rating.toString().includes(searchInput)
    );
    setList(result);
  };

  const handleSort = () => {
    let result;
    if (sortBy === "NameAsc") {
      result = _.sortBy(list, ["movieName"]);
      setList(result);
    } else if (sortBy === "NameDesc") {
      result = _.orderBy(list, ["movieName"], ["desc"]);
      setList(result);
    } else if (sortBy === "RatingAsc") {
      result = _.sortBy(list, ["rating"]);
      setList(result);
    } else if (sortBy === "RatingDesc") {
      result = _.orderBy(list, ["rating"]["desc"]);
      setList(result);
    } else if (sortBy === "") {
      setList([...movies]);
    }
  };

  return (
    <div className="row mb-3">
      <div className="col-md-8 mb-2">
        {/* <h5>MoviesList</h5> */}

        <input
          type="text"
          name="search"
          value={searchInput}
          onChange={handleChange}
          placeholder="search by name or id"
        />
      </div>
      <div className="col-md-4 mb-2">
        <select value={sortBy} onChange={handleSortChange}>
          <option value="">Order by</option>
          {options.map((option, i) => {
            return (
              <option key={i} value={option}>
                {option}
              </option>
            );
          })}
        </select>
      </div>

      {list.map((movie, i) => {
        return <MovieCard key={i} {...movie} />;
      })}
    </div>
  );
};

export default MoviesList;
