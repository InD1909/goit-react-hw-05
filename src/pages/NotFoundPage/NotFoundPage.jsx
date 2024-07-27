import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div>
      <Link to="/">Go Home</Link>
      <h1>404 Not found</h1>
    </div>
  );
};

export default NotFoundPage;
