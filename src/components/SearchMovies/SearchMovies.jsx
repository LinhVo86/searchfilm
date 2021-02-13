import { useState } from "react";
import "./SearchMovies.css";
import MovieCard from "./MovieCard";
export default function SearchMovies() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const searchMovies = async (e) => {
    if (query !== "") {
      e.preventDefault();
      const url = `https://api.themoviedb.org/3/search/movie?api_key=42cc912999d8b11544b59164452260a9&language=en-US&query=${query}&page=1&include_adult=false`;
      try {
        const res = await fetch(url);
        const data = await res.json();
        setMovies(data.results);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <form
        className="form"
        onSubmit={(e) => {
          searchMovies(e);
        }}
      >
        <label className="label" htmlFor="query">
          Movie Name
        </label>
        <input
          className="input"
          name="query"
          type="text"
          placeholder="i.e Jurassic Park"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
          }}
        />
        <button className="button" type="submit">
          Search
        </button>
      </form>
      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.title} />
          ))}
      </div>
    </>
  );
}
