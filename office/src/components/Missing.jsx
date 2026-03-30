import { Link, useRouteError } from 'react-router-dom';

/**
 * 404 / error boundary component.
 * Works both as a standalone page and as the router's errorElement.
 */
const Missing = () => {
  const error = useRouteError?.();

  return (
    <article style={{ textAlign: 'center', padding: '2rem' }}>
      <h1>Oops!</h1>
      <p>{error?.status === 404 ? 'Page Not Found' : 'Something went wrong'}</p>
      <div className="flexGrow">
        <Link to="/">Visit Our Homepage</Link>
      </div>
    </article>
  );
};

export default Missing;
