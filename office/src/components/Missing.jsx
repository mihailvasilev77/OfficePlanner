import { Link, useRouteError } from 'react-router-dom';

const Missing = () => {
  const error = useRouteError?.();

  return (
    <article>
      <h1 style={{ fontSize: 'var(--font-size-4xl)', marginBottom: 'var(--space-2)' }}>404</h1>
      <p style={{ marginBottom: 'var(--space-6)' }}>
        {error?.status === 404 ? 'Page not found' : 'Something went wrong'}
      </p>
      <Link to="/">
        <button type="button">&larr; Back to Home</button>
      </Link>
    </article>
  );
};

export default Missing;
