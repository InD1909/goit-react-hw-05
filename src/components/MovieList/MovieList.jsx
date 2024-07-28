import { NavLink } from "react-router-dom";
import getImageUrl from "./MoviesImg";
import s from "./MovieList.module.css";

const MovieList = ({ movies }) => {
  return (
    <ul className={s.ul}>
      {movies.map((movie) => (
        <li key={movie.id} className={s.li}>
          <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
          <div className={s.container}>
            <h3 className={s.name}>{movie.title}</h3>
            <NavLink to={`/movies/${movie.id}`} className={s.link}>
              Go to film
            </NavLink>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
