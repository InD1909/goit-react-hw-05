import MovieList from "../../components/MovieList/MovieList";
import { useEffect, useState } from "react";
import s from "./HomePage.module.css";
import { fetchTrendingMovies } from "../../API";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getData = async () => {
      try {
        const data = await fetchTrendingMovies();
        setMovies(data);
      } catch (error) {
        setError("Error fetching trending movies. Please try again later.");
      }
    };

    getData();
  }, []);

  return (
    <div>
      <h1 className={s.title}>Recent updates</h1>
      {error ? <p>{error}</p> : <MovieList movies={movies} />}
    </div>
  );
};

export default HomePage;
