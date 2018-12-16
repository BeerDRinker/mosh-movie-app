import React from "react";

const MovieForm = ({ match, history }) => (
  <div>
    <h1>Movie Form - {match.params.id}</h1>
    <button onClick={() => history.push('/movies')}>Save</button>
  </div>
)

export default MovieForm;
