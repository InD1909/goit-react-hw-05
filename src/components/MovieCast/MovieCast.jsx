import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getImageUrl from "../MovieList/MoviesImg";
import s from "./MovieCast.module.css";

const MovieCast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/credits`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mzk2YmI2ZmE5ZGYzYTZkYzFjNWY1YWQ5ODVhMGI5MCIsIm5iZiI6MTcyMjA3NzQwMS4xNDQwODksInN1YiI6IjY2YTRjZjU3ZDhhNTJkNzJjZjg3Y2ZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gGSqTtFneYLfE3HZ0NK6NWEi5UXzyRirlVKnPCIsFiU`,
          },
        }
      );
      setCast(response.data.cast);
    };
    fetchMovieCast();
  }, [movieId]);

  return (
    <>
      <h2 className={s.cast}>Cast</h2>
      <div className={s.container}>
        <ul className={s.ul}>
          {cast.map((actor) => (
            <li key={actor.cast_id} className={s.li}>
              <img
                src={getImageUrl(actor.profile_path)}
                alt={actor.name}
                width="150"
              />
              <ul className={s.text}>
                <li>Name: {actor.name}</li>
                <li>Role: {actor.character}</li>
                <li>Popularity: {actor.popularity} likes</li>
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MovieCast;
