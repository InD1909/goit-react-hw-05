import { NavLink } from "react-router-dom";
import getImageUrl from "./MoviesImg";

const MovieList = ({ movies }) => {
  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
          <h2>{movie.title}</h2>
          <NavLink to={`/movies/${movie.id}`}>Go to film</NavLink>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
