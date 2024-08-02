import { useEffect, useState } from "react";
import MovieList from "../../components/MovieList/MovieList";
import s from "./MoviesPage.module.css";
import { searchMovies } from "../../API";
import { useLocation, useSearchParams } from "react-router-dom";

const MoviesPage = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const [noMovies, setNoMovies] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const queryParam = searchParams.get("query") || "";
    if (!queryParam) return;
    const handleSearch = async () => {
      try {
        const results = await searchMovies(queryParam);
        setMovies(results);
        setError(null);
        setNoMovies(false);
      } catch (error) {
        setError("Failed to fetch movies.");
        setMovies([]);
      }
    };

    handleSearch();
  }, [searchParams]);

  const onChange = (event) => {
    const newValue = event.target.value;
    setQuery(newValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (query.trim() === "") {
      return;
    }
    setSearchParams({ query });
  };

  return (
    <div>
      <h2 className={s.title}>Search Movies</h2>
      <form className={s.wrapper} onSubmit={onSubmit}>
        <input
          value={query}
          onChange={onChange}
          className={s.form}
          placeholder="Type film's name..."
        />
        <button className={s.btn}>Search</button>
      </form>
      {error && <p className={s.error}>{error}</p>}
      {noMovies && !error && (
        <p className={s.error}>Do not found movies, Please Try again!</p>
      )}
      {movies.length > 0 && <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
