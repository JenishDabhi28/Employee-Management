import React, { useEffect, useState } from 'react';
import EmpService from '../Service/emp.service';
import { Link } from 'react-router-dom';
import { css } from '@emotion/react';
import { RingLoader } from 'react-spinners';
// Import any necessary stylesheets for dark mode if applicable

const Home = ({ isLoggedIn }) => {
  const [empList, setEmpList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoggedIn) {
      loadEmpList();
    }
  }, [isLoggedIn]);

  const loadEmpList = () => {
    setIsLoading(true);
    EmpService.getAllEmp()
      .then((res) => {
        if (Array.isArray(res.data)) {
          setEmpList(res.data);
          setIsLoading(false);
        } else {
          console.error('Invalid data received from API:', res.data);
          setIsLoading(false);
        }
      })
      .catch((error) => {
        console.error('Error fetching employee data:', error);
        setIsLoading(false);
      });
  };

  const deleteEmp = (id) => {
    EmpService.deleteEmpById(id)
      .then(() => {
        loadEmpList();
      })
      .catch((error) => {
        console.error('Error deleting employee:', error);
      });
  };

  return (
    <div style={styles.container}>
      {isLoading ? (
        <div className="spinner-container" css={spinnerStyle}>
          <RingLoader color="#007bff" loading={isLoading} size={150} />
        </div>
      ) : (
        <div style={styles.tableContainer}>
          <h2>Employee Details</h2>
          <div className="table-wrapper">
            <table style={styles.employeeTable}>
              <thead>
                <tr>
                  <th style={styles.tableHeader}>No.</th>
                  <th style={styles.tableHeader}>First Name</th>
                  <th style={styles.tableHeader}>Last Name</th>
                  <th style={styles.tableHeader}>Email Address</th>
                  <th style={styles.tableHeader}>Address</th>
                  <th style={styles.tableHeader}>Salary</th>
                  <th style={styles.tableHeader}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {empList.map((e, index) => (
                  <tr key={e.id}>
                    <td style={styles.tableData}>{index + 1}</td>
                    <td style={styles.tableData}>{e.firstName}</td>
                    <td style={styles.tableData}>{e.lastName}</td>
                    <td style={styles.tableData}>{e.email}</td>
                    <td style={styles.tableData}>{e.address}</td>
                    <td style={styles.tableData}>{e.salary}</td>
                    <td style={styles.tableData}>
                      <Link
                        to={`/EditEmp/${e.id}`}
                        className="btn btn-sm border-t-neutral-100 btn-primary"
                        style={styles.editButton}
                      >
                        Edit
                      </Link>
                      <button
                        onClick={() => deleteEmp(e.id)}
                        style={styles.deleteButton}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {!isLoggedIn && (
        <p style={styles.loginMessage}>Please login to view this page.</p>
      )}
    </div>
  );
};

const spinnerStyle = css`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  
  background-color: rgba(255, 255, 255, 0.5); /* Semi-transparent background */
  z-index: 999; /* Ensure it's on top of other content */
`;


const styles = {
  container: {
    textAlign: 'center',
    marginTop: '20px',
    padding: '10px',
    minHeight: 'calc(80vh - 65px)',
    boxSizing: 'border-box',
  },
  tableContainer: {
    maxWidth: '800px',
    margin: '0 auto',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    marginBottom: '20px',
    overflowX: 'auto', // Add horizontal scrolling
  },
  employeeTable: {
    width: '100%',
    minWidth: '600px', // Set minimum width to prevent horizontal overflow on small screens
    borderCollapse: 'collapse',
  },
  tableHeader: {
    backgroundColor: '#f2f2f2',
    color: '#333',
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
    fontWeight: 'bold',
  },
  tableData: {
    border: '1px solid #ddd',
    padding: '12px',
    textAlign: 'left',
  },
  editButton: {
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  deleteButton: {
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    padding: '8px 16px',
    borderRadius: '4px',
    cursor: 'pointer',
    marginRight: '5px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
    transition: 'background-color 0.3s, transform 0.2s',
  },
  loginMessage: {
    color: '#ffffff', // Adjust color for dark mode
    backgroundColor: '#212529', // Adjust background color for dark mode
    padding: '20px',
    borderRadius: '8px',
    marginTop: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)', // Add box shadow
    fontSize: '18px', // Adjust font size
    maxWidth: '400px', // Limit width for better readability
    margin: '0 auto', // Center horizontally
    lineHeight: '1.5', // Adjust line height for better readability
  },
};

styles.editButton[':hover'] = {
  backgroundColor: '#218838',
  transform: 'scale(1.05)',
};

styles.deleteButton[':hover'] = {
  backgroundColor: '#c82333',
  transform: 'scale(1.05)',
};
export default Home;