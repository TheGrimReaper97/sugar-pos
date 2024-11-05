import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserSelect = ({ onUserSelect }) => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://sugarglamourstore.com/wp-json/wp/v2/users', {
          auth: {
            username: 'ck_tu_consumer_key', // Coloca tu Consumer Key
            password: 'cs_tu_consumer_secret' // Coloca tu Consumer Secret
          }
        });
        setUsers(response.data);
      } catch (error) {
        console.error("Error al obtener los usuarios:", error);
      }
    };

    fetchUsers();
  }, []);

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(userId);
    onUserSelect(userId);
  };

  return (
    <div>
      <label htmlFor="userSelect">Asignar a usuario:</label>
      <select id="userSelect" value={selectedUser} onChange={handleUserChange}>
        <option value="">Selecciona un usuario</option>
        {users.map(user => (
          <option key={user.id} value={user.id}>{user.name}</option>
        ))}
      </select>
    </div>
  );
};

export default UserSelect;
