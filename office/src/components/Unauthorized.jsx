import { useNavigate } from 'react-router-dom';

const Unauthorized = () => {
  const navigate = useNavigate();

  return (
    <section style={{ textAlign: 'center', alignItems: 'center' }}>
      <h1>Unauthorized</h1>
      <p>You do not have access to the requested page.</p>
      <div className="flexGrow">
        <button onClick={() => navigate(-1)}>&larr; Go Back</button>
      </div>
    </section>
  );
};

export default Unauthorized;
