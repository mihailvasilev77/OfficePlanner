import { Link } from 'react-router-dom';

const FrontPage = () => (
  <div className="hero">
    <h1 className="hero__title">Vacation Platform</h1>
    <p className="hero__description">
      Plan, request, and manage your team's time off with ease.
      Stay organized, avoid conflicts, and never miss a beat.
    </p>
    <Link to="/calendar" className="hero__cta">
      Get started &rarr;
    </Link>
  </div>
);

export default FrontPage;
