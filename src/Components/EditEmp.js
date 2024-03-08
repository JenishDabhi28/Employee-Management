import React, { useState, useEffect } from 'react';
import EmpService from '../Service/emp.service';
import { useParams, useNavigate } from 'react-router-dom';

const styles = {
  container: {
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
     minHeight: 'calc(80vh - 65px)',
    // padding: '20px 5px',
    boxSizing: 'border-box',
    // marginTop: '0',
    // marginBottom: '10px',
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
    color: '#9494b8',
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
  emailInput: {
    width: 'calc(100% - 22px)',
    padding: '8px',
    border: '1px solid #007bff',
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
};

const EditEmp = () => {
  const [emp, setEmp] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    salary: '',
  });

  const [msg, setMsg] = useState('');
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    EmpService.getEmpById(id)
      .then((res) => {
        setEmp(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmp({ ...emp, [name]: value });
  };

  const updateEmp = (e) => {
    e.preventDefault();
    // Check if any field is empty
    if (!emp.firstName || !emp.lastName || !emp.email || !emp.address || !emp.salary) {
      setMsg('Please fill all fields.');
      return;
    }
    // If all fields are filled, proceed with submission
    EmpService.updateEmpById(id, emp)
      .then((res) => {
        setMsg('Employee updated successfully');
        // Navigate to home page after successful update
        navigate('/');
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {msg && <p className="text-center text-slate-100">{msg}</p>}
        <form onSubmit={updateEmp}>
          <h1>Edit Employee</h1>
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
            <label htmlFor="email" style={styles.emailLabel}>
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={emp.email}
              style={styles.emailInput}
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

export default EditEmp;
