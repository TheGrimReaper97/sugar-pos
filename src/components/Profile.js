// src/components/Profile.js
import React from 'react';
import { useAuth } from './AuthContext';

const Profile = () => {
  const { user, logout } = useAuth();

  if (!user) return <p>No has iniciado sesión.</p>;

  return (
    <div>
      <h2>Perfil</h2>
      <p>Usuario: {user.username}</p>
      <button onClick={logout}>Cerrar Sesión</button>
    </div>
  );
};

export default Profile;
