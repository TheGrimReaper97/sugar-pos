import React from 'react';

function Checkout({ cartItems, clearCart }) {
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío.');
      return;
    }
    
    // Simular el proceso de confirmación de compra
    alert('Compra confirmada con éxito');
    
    // Vaciar el carrito después de confirmar
    clearCart();
  };

  return (
    <div>
      <h2>Confirmar Compra</h2>
      <button onClick={handleCheckout}>Confirmar</button>
    </div>
  );
}

export default Checkout;
