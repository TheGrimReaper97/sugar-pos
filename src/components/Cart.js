// src/components/Cart.js
import React, { useState } from 'react';
import Checkout from './Checkout';
import UserSelect from './UserSelect';

const Cart = ({ cartItems, onClearCart }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const closeModal = () => {
    setShowModal(false);
    onClearCart(); // Vaciar carrito después de finalizar la compra
  };

  return (
    <div className="cart">
      <h2>Carrito de Compras</h2>
      {cartItems.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price}
            </li>
          ))}
        </ul>
      )}
      <p>
        Total: ${cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}
      </p>
      <button onClick={toggleModal}>Confirmar Compra</button>

      {showModal && (
        <div className="modal-background" onClick={toggleModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button onClick={toggleModal} className="modal-close">
              &times;
            </button>
            <h2>Confirmación de Compra</h2>
            {/* Componente para seleccionar usuario */}
            <UserSelect selectedUser={selectedUser} setSelectedUser={setSelectedUser} />
            {/* Mostrar el usuario seleccionado */}
            {selectedUser && (
              <p>
                Usuario seleccionado: {selectedUser.name} ({selectedUser.email})
              </p>
            )}
            {/* Componente de Checkout */}
            <Checkout cartItems={cartItems} clearCart={closeModal} selectedUser={selectedUser} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
