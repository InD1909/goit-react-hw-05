import { Suspense, useEffect, useRef, useState } from "react";
import { NavLink, Outlet, useLocation, useParams } from "react-router-dom";
import getImageUrl from "../../components/MovieList/MoviesImg";
import s from "./MovieDetailsPage.module.css";
import clsx from "clsx";
import { fetchMovieDetails } from "../../API";
import { BallTriangle } from "react-loader-spinner";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.active);
};

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);

  const location = useLocation();

  const goBackRef = useRef(location?.state || "/movies");
  useEffect(() => {
    try {
      const getData = async () => {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      };
      getData();
    } catch (error) {
      console.log(error);
    }
  }, [movieId]);

  if (!movie) {
    return (
      <div className={s.loader}>
        <BallTriangle
          height={100}
          width={100}
          radius={5}
          color="rgb(255, 193, 38)"
          ariaLabel="ball-triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
          visible={true}
        />
      </div>
    );
  }

  return (
    <div className={s.wrapper}>
      <NavLink to={goBackRef.current} className={s.link}>
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
            <li className={s.li}>Overwiev: {movie.overview}</li>
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
      <Suspense
        fallback={
          <div className={s.loader}>
            <BallTriangle
              height={100}
              width={100}
              radius={5}
              color="rgb(255, 193, 38)"
              ariaLabel="ball-triangle-loading"
              wrapperStyle={{}}
              wrapperClass=""
              visible={true}
            />
          </div>
        }
      ></Suspense>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
