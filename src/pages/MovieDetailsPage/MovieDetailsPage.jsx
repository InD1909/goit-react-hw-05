import axios from "axios";
import { useEffect, useState } from "react";
import { NavLink, Outlet, useParams } from "react-router-dom";
import getImageUrl from "../../components/MovieList/MoviesImg";

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
    <div>
      <NavLink to="/"> ← Go back...</NavLink>
      <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
      <h2>{movie.title}</h2>
      <p>{movie.overview}</p>
      <div>
        <NavLink to={`cast`}>Cast</NavLink>
        <NavLink to={`reviews`}>Reviews</NavLink>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
