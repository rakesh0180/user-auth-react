import MoviesContainer from "./component/MoviesApp/MoviesContainer";
function App(props) {
  return (
    <div className="container  ">
      <h1 className="display-1">My Big Movies List</h1>
      <MoviesContainer />
    </div>
  );
}

export default App;
