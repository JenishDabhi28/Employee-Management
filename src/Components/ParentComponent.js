// ParentComponent.js

import React, { useState } from 'react';
import Home from './Home'; // Import the Home component

const ParentComponent = () => {
  const [currentUser, setCurrentUser] = useState(null); // State for current user

  // Assuming you have a function to set the current user
  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  return (
    <div>
      {/* Pass currentUser to the Home component */}
      <Home currentUser={currentUser} />
    </div>
  );
};

export default ParentComponent;
