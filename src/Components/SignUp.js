import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const SignUp = ({ onLogin }) => {
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    if (
      name.trim() === '' ||
      username.trim() === '' ||
      email.trim() === '' ||
      phone.trim() === '' ||
      password.trim() === ''
    ) {
      setError('Please enter all fields');
      return;
    }

    // Construct user object
    const user = {
      name,
      username,
      email,
      phone,
      password,
    };

    // Send POST request to the backend
    axios.post("http://localhost:8080/api/registerUser", user)
      .then((res) => {
        console.log('User Registered Successfully:', res.data);
        alert('User registered successfully');
        // Call the onLogin function passed from the parent component to update the login state
        onLogin();
        navigate('/');
        // Reset form fields
        setName('');
        setUsername('');
        setEmail('');
        setPhone('');
        setPassword('');
        setError('');
      })
      .catch((error) => {
        console.error('Error:', error); // Handle error
        setError('Error registering user');
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Sign Up</h2>
        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.formGroup}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={styles.input}
            />
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
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={styles.input}
            />
            <input
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
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
          <button type="submit" style={styles.button}>
            Sign Up
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>}
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 'calc(87vh - 62px)',
    padding: '20px',
    boxSizing: 'border-box',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '30px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    maxWidth: '500px',
    width: '100%',
  },
  title: {
    fontSize: '24px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  form: {
    maxWidth: '400px',
    margin: '0 auto',
  },
  formGroup: {
    marginBottom: '20px',
  },
  input: {
    width: '100%',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '10px',
  },
  button: {
    backgroundColor: '#007bff',
    color: '#fff',
    padding: '12px',
    borderRadius: '6px',
    cursor: 'pointer',
    border: 'none',
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    textAlign: 'center',
  },
};

export default SignUp;
