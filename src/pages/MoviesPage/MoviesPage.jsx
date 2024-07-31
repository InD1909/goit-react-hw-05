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
    setQuery(queryParam);

    if (queryParam) {
      handleSearch(queryParam, false);
    }
  }, [searchParams]);

  const handleSearch = async (searchQuery, updateURL = true) => {
    if (searchQuery.trim() === "") {
      setMovies([]);
      setError(false);
      setNoMovies(true);
      return;
    }

    try {
      const results = await searchMovies(searchQuery);
      setMovies(results);
      setError(null);
      setNoMovies(false);

      if (updateURL) {
        searchParams.set("query", searchQuery);
        setSearchParams(searchParams);
      }
    } catch (error) {
      setError("Failed to fetch movies.");
      setMovies([]);
    }
  };

  const onChange = (event) => {
    const newValue = event.target.value;
    setQuery(newValue);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSearch(query);
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
        <button onClick={handleSearch} className={s.btn}>
          Search
        </button>
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
