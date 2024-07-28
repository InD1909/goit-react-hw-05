import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import getImageUrl from "../../components/MovieList/MoviesImg";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mzk2YmI2ZmE5ZGYzYTZkYzFjNWY1YWQ5ODVhMGI5MCIsIm5iZiI6MTcyMjA3NzQwMS4xNDQwODksInN1YiI6IjY2YTRjZjU3ZDhhNTJkNzJjZjg3Y2ZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gGSqTtFneYLfE3HZ0NK6NWEi5UXzyRirlVKnPCIsFiU`,
          },
        }
      );
      setMovie(response.data);
    };
    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className={s.wrapper}>
      <NavLink to="/" className={s.link}>
        {" "}
        ← Go back...
      </NavLink>
      <div className={s.container}>
        <img
          src={getImageUrl(movie.poster_path)}
          alt={movie.title}
          className={s.img}
        />
        <div className={s.list}>
          <h2 className={s.title}>{movie.title}</h2>
          <ul>
            <li className={s.li}>Country: {movie.origin_country}</li>
            <li className={s.li}>Budget: {movie.budget} $</li>
            <li className={s.li}>Release date: {movie.release_date}</li>
            <li className={s.li}>Status: {movie.status}</li>
            <li className={s.li}>Idea: {movie.tagline}</li>
            <li className={s.li}>Overwiev:{movie.overview}</li>
          </ul>
        </div>
      </div>
      <div className={s.nav}>
        <NavLink to={`cast`} className={buildLinkClass}>
          Cast
        </NavLink>
        <NavLink to={`reviews`} className={buildLinkClass}>
          Reviews
        </NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
