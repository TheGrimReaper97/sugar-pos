// src/components/LogoutButton.js
import React from 'react';

const LogoutButton = () => {
  const handleLogout = () => {
    localStorage.removeItem('token'); // Eliminar el token
    window.location.href = '/login'; // Redirigir al login
  };

  return (
    <button onClick={handleLogout} className="logout-button">
      Logout
    </button>
  );
};

export default LogoutButton;
