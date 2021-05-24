import React from "react";

export default function Movie({
  title,
  poster_path,
  overview,
  vote_average,
  id,
  setNum,
  setMvName,
  setMvImg,
  setMvOverview,
}) {
  const IMG_URL = "https://image.tmdb.org/t/p/w1280";

  function voteClass(vote_average) {
    if (vote_average >= 8) return "green";
    else if (vote_average >= 5.5) return "orange";
    else return "red";
  }
  function getTrailer(id, title, poster_path) {
    setNum(id);
    setMvName(title);
    var link;
    link = poster_path
      ? IMG_URL + poster_path
      : "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80";
    setMvImg(link);
    setMvOverview(overview);
  }
  return (
    <div className="movie" onClick={() => getTrailer(id, title, poster_path)}>
      <img
        src={
          poster_path
            ? IMG_URL + poster_path
            : "https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
        }
        alt={title}
      />
      <div className="movie-info">
        <h4>{title}</h4>
        <span className={voteClass(vote_average)}>{vote_average}</span>
      </div>
      <div className="movie-overview">
        <h2>Overview:</h2>
        <p>{overview}</p>
      </div>
    </div>
  );
}
