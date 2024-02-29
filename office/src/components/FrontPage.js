import React from 'react';
import { Link } from 'react-router-dom';

const FrontPage = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Vacation Platform</h1>
      <p style={styles.description}>
        Welcome to our vacation management platform. Plan your vacations with ease and efficiency.
      </p>
      <Link to="/calendar" style={styles.button}>
        Get started
      </Link>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '50vh',
    textAlign: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    padding: '20px',
    borderRadius: '1rem',
  },
  title: {
    fontSize: '3rem',
    marginBottom: '20px',
  },
  description: {
    fontSize: '1.2rem',
    marginBottom: '30px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    backgroundColor: 'lightgray',
    color: 'black',
    textDecoration: 'none',
    borderRadius: '5px',
    border: "1px solid black",
    cursor: 'pointer',
  },
};

export default FrontPage;
