import React from 'react';

function Cart({ cartItems }) {
  return (
    <div>
      <h2>Carrito de Compras</h2>
      <ul>
        {cartItems.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          cartItems.map((item, index) => (
            <li key={index}>
              {item.name} - ${item.price} x {item.quantity}
            </li>
          ))
        )}
      </ul>
      <h3>Total: ${cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}</h3>
    </div>
  );
}

export default Cart;

