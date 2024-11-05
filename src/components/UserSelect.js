import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';

const UserSelect = ({ selectedUser, setSelectedUser }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [error, setError] = useState('');

  const fetchUsers = async (term) => {
    try {
      const response = await axios.get('https://sugarglamourstore.com/wp-json/wc/v3/customers', {
        params: { search: term },
        auth: {
          username: 'ck_9ea00d774f631ac961f9ded5861577f420c6416c',
          password: 'cs_97def9374cc1a25bed2b7089f67a965c4f4b7cce'
        }
      });
      setFilteredUsers(response.data);
      setError('');
    } catch (err) {
      setError('Error al obtener usuarios. Verifica las credenciales y permisos.');
    }
  };

  useEffect(() => {
    if (searchTerm && searchTerm !== selectedUser?.name) {
      fetchUsers(searchTerm);
    } else {
      setFilteredUsers([]);
    }
  }, [searchTerm, selectedUser?.name]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    setSearchTerm(''); // Limpiar el campo de búsqueda después de seleccionar el usuario
    setFilteredUsers([]); // Oculta la lista de sugerencias
  };

  return (
    <div className="user-select-container">
      <label>Buscar usuario por correo:</label>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setSelectedUser(null); // Limpiar el usuario seleccionado si se empieza a escribir
        }}
        placeholder="Buscar usuarios..."
        className="search-input"
      />
      {error && <p className="error-message">{error}</p>}

      {/* Lista desplegable dinámica */}
      {filteredUsers.length > 0 && (
        <ul className="suggestions-list">
          {filteredUsers.map((user) => (
            <li
              key={user.id}
              onClick={() => handleUserSelect(user)}
            >
              {user.name} ({user.email})
            </li>
          ))}
        </ul>
      )}

      {/* Mostrar usuario seleccionado */}
      {selectedUser && (
        <div className="selected-user-display">
          <p><strong>Usuario Seleccionado:</strong> {selectedUser.name} ({selectedUser.email})</p>
        </div>
      )}
    </div>
  );
};

export default UserSelect;
