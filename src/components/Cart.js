// src/components/Cart.js
import React from 'react';
import Checkout from './Checkout';

const Cart = ({ cartItems, onClearCart }) => (
  <div className="cart">
    <h2>Carrito de Compras</h2>
    {cartItems.length === 0 ? (
      <p>El carrito está vacío</p>
    ) : (
      <ul>
        {cartItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
            {item.selectedVariant && (
              <span> | Variante: {item.selectedVariant.attributes.map(attr => attr.option).join(', ')}</span>
            )}
          </li>
        ))}
      </ul>
    )}
    <p>Total: ${cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}</p>
    <button onClick={onClearCart}>Vaciar Carrito</button>
    <Checkout cartItems={cartItems} clearCart={onClearCart} />
  </div>
);

export default Cart;
