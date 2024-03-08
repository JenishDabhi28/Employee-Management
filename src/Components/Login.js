import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types'; // Import PropTypes

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Validation logic here, for example:
    if (username.trim() === '' || password.trim() === '') {
      setError('Please enter both username and password');
      return;
    }
    const user = {
      username,
      password,
    };

    // Send POST request to the backend
    axios.post("http://localhost:8080/api/login", user)
      .then((res) => {
        console.log('User Logged Successfully:', res.data);
        alert('User Logged successfully');
        // Call the onLogin function passed from the parent component to update the login state
        onLogin();
        // Reset form fields
        setUsername('');
        setPassword('');
        setError('');
        // Redirect to home page or any other route after successful login
        navigate('/');
      })
      .catch((error) => {
        console.error('Error:', error); // Handle error
        setError('Error logging in');
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={styles.input}
            />
          </div>
          <div style={styles.formGroup}>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={styles.input}
            />
          </div>
          <button type="submit" style={styles.button}>Login</button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

// Add prop validation
Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
};


const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(87vh - 62px)',
    padding: '20px 5px',
    boxSizing: 'border-box',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: 'rgba(209, 209, 224, 0.5)', // Background color with transparency
    maxWidth: '400px',
    width: '100%',
    margin: '5px',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    maxWidth: '300px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
    marginBottom:'30px',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default Login;
