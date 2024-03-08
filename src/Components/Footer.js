import React from 'react';


const styles = {
  footer: {
    backgroundColor: '#333',
    color: '#fff',
    padding: '20px',
    textAlign: 'center',
    borderTop: '2px solid #fff', 
    zIndex: '1000', 
  },
  footerText: {
    fontSize: '16px',
    fontFamily: 'Arial, sans-serif',
    fontStyle: 'italic', 
    letterSpacing: '0.5px', 
    textTransform: 'uppercase',
    margin: '0',
  },
  socialLinks: {
    marginTop: '20px',
  },
  socialIcon: {
    display: 'inline-block',
    margin: '0 10px',
    fontSize: '24px',
    color: '#fff',
    transition: 'color 0.3s ease', // Add transition effect
  },
  socialIconHover: {
    color: '#007bff', // Change color on hover
  },
};

const Footer = () => {
  return (
    <div style={styles.footer}>
      <p style={styles.footerText}>© 2024 Employee. All rights reserved.</p>
      <div style={styles.socialLinks}>
        <a href="#" style={styles.socialIcon}>
          <i className="fab fa-instagram"></i> {/* Instagram icon */}
        </a>
        <a href="#" style={styles.socialIcon}>
          <i className="fab fa-twitter"></i> {/* Twitter icon */}
        </a>
        <a href="#" style={styles.socialIcon}>
          <i className="fab fa-facebook"></i> {/* Facebook icon */}
        </a>
        <a href="#" style={styles.socialIcon}>
          <i className="fab fa-linkedin"></i> {/* LinkedIn icon */}
        </a>
      </div>
    </div>
  );
};

export default Footer;
