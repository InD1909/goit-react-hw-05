import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import getImageUrl from "../MovieList/MoviesImg";

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
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img
              src={getImageUrl(actor.profile_path)}
              alt={actor.name}
              width="150"
            />
            <div>
              Name:{actor.name}
              Role:{actor.character}
              Popularity:{actor.popularity} likes
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MovieCast;
