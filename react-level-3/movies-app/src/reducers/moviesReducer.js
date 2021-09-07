const moviesInitialState = JSON.parse(localStorage.getItem("movies")) || [];
export const moviesReducer = (state = moviesInitialState, action) => {
  switch (action.type) {
    case "ADD_MOVIE": {
      return [{ ...action.payload }, ...state];
    }

    case "REMOVE_MOVIE": {
      return state.filter((movie) => {
        return movie.id !== action.payload;
      });
    }

    default: {
      return [...state];
    }
  }
};
