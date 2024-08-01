import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import s from "./MovieReviews.module.css";
import { fetchMovieReviews } from "../../API";

const MovieReviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const data = await fetchMovieReviews(movieId);
        setReviews(data);
        setError(null);
      } catch (err) {
        setError("Failed to fetch reviews.");
      }
    };

    getReviews();
  }, [movieId]);

  return (
    <>
      {" "}
      {error && <p className={s.error}>{error}</p>}
      {!error && reviews.length === 0 && (
        <p className={s.error}>No reviews available for this movie.</p>
      )}
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
