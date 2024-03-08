import React, { useState } from 'react';
import EmpService from '../Service/emp.service';
import { useNavigate } from 'react-router-dom';


const styles = {
  container: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
    minHeight: 'calc(80vh - 65px)',
    // padding: '20px 5px',
    boxSizing: 'border-box',
   
    textAlign: 'center',
    marginTop: '50px',
    padding: '20px',
  },
  card: {
    border: '1px solid #ccc',
    borderRadius: '4px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    backgroundColor: '#f9f9f9',
    maxWidth: '400px',
    width: '100%',
    margin: '0 auto',
    marginBottom: '40px',
  },
  formGroup: {
    marginBottom: '20px',
  },
  formLabel: {
    display: 'block',
    fontSize: '16px',
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#666699',
  },
  formInput: {
    width: 'calc(100% - 22px)',
    padding: '8px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
    marginBottom: '10px',
  },
  submitButton: {
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '10px',
  },
  resetButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '10px 20px',
    borderRadius: '4px',
    cursor: 'pointer',
  },
  form: {
    maxWidth: '300px',
    margin: '0 auto',
    paddingRight: '20px', // Add padding to the right side
    marginRight: '20px', // Add margin to the right side
  },
  '@media (max-width: 600px)': {
    form: {
      paddingRight: '0', // Remove padding from the right side in mobile view
      marginRight: '0', // Remove margin from the right side in mobile view
    },
  },
};

const AddEmp = () => {
  const [emp, setEmp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    salary: '',
  });
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmp({ ...emp, [name]: value });
  };

  const submitEmp = (e) => {
    e.preventDefault();
    // Check if any field is empty
    if (!emp.firstName || !emp.lastName || !emp.email || !emp.address || !emp.salary) {
      setMsg('Please fill all fields.');
      alert('Please fill all fields.');
      return;
    }
    // If all fields are filled, proceed with submission
    EmpService.saveEmp(emp)
      .then((res) => {
        console.log('Employee Added Successfully:', res.data);
        setMsg('Employee Added Successfully');
        alert('Employee Added Successfully');
        navigate('/');
        setEmp({
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          salary: '',
        });
      })
      .catch((error) => {
        console.log('Error:', error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {msg && <p className="text-center text-slate-100">{msg}</p>}
        <form onSubmit={submitEmp} style={styles.form}>
          <h1>Add Employee</h1>
          <div style={styles.formGroup}>
            <label htmlFor="firstName" style={styles.formLabel}>
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={emp.firstName}
              style={styles.formInput}
              placeholder="Enter your first name"
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="lastName" style={styles.formLabel}>
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={emp.lastName}
              style={styles.formInput}
              placeholder="Enter your last name"
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="email" style={styles.formLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={emp.email}
              style={styles.formInput}
              placeholder="Enter your email address"
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="address" style={styles.formLabel}>
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={emp.address}
              style={styles.formInput}
              placeholder="Enter your address"
              onChange={handleChange}
            />
          </div>
          <div style={styles.formGroup}>
            <label htmlFor="salary" style={styles.formLabel}>
              Salary
            </label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={emp.salary}
              style={styles.formInput}
              placeholder="Enter your salary"
              onChange={handleChange}
            />
          </div>
          <button type="submit" style={styles.submitButton}>
            Submit
          </button>
          <button type="reset" style={styles.resetButton}>
            Reset
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddEmp;
