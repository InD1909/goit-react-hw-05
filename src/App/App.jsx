import { Route, Routes } from "react-router-dom";
import s from "./App.module.css";
import { lazy, Suspense } from "react";
import { BallTriangle } from "react-loader-spinner";

import Navigation from "../components/Navigation/Navigation";
const HomePage = lazy(() => import("../pages/HomePage/HomePage"));
const MovieDetailsPage = lazy(() =>
  import("../pages/MovieDetailsPage/MovieDetailsPage")
);
const MoviesPage = lazy(() => import("../pages/MoviesPage/MoviesPage"));
const MovieCast = lazy(() => import("../components/MovieCast/MovieCast"));
const MovieReviews = lazy(() =>
  import("../components/MovieReviews/MovieReviews")
);
const NotFoundPage = lazy(() => import("../pages/NotFoundPage/NotFoundPage"));

const App = () => {
  return (
    <div className={s.wrapper}>
      <Navigation />
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
      >
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
