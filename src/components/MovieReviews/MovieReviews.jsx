import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./MovieReview.module.css";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchMovieReviews = async () => {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
        {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0Mzk2YmI2ZmE5ZGYzYTZkYzFjNWY1YWQ5ODVhMGI5MCIsIm5iZiI6MTcyMjA3NzQwMS4xNDQwODksInN1YiI6IjY2YTRjZjU3ZDhhNTJkNzJjZjg3Y2ZjZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.gGSqTtFneYLfE3HZ0NK6NWEi5UXzyRirlVKnPCIsFiU`,
          },
        }
      );
      setReviews(response.data.results);
    };
    fetchMovieReviews();
  }, [movieId]);

  return (
    <>
      <h2 className={s.title}>Reviews</h2>
      <div className={s.review}>
        <ul className={s.text}>
          {reviews.map((review) => (
            <li key={reviews.id} className={s.li}>
              <h3>{review.author}</h3>
              <p>{review.content}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default MovieReviews;
