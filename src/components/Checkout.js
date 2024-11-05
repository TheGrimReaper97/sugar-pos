import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from '../assets/logo.png';
import UserSelect from './UserSelect';
import '../style.css';

function Checkout({ cartItems, clearCart }) {
  const [branch, setBranch] = useState('San Salvador');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');
  const [selectedUser, setSelectedUser] = useState('');

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    if (!selectedUser) {
      alert('Por favor, seleccione un usuario.');
      return;
    }

    alert('Compra confirmada con éxito');
    generatePDF();
    clearCart();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;
  
    // Agregar logo
    const logoImg = new Image();
    logoImg.src = logo;
    doc.addImage(logo, 'PNG', centerX - 40, 10, 80, 40);
  
    doc.setFontSize(18);
    doc.text("Factura de Compra - SugarPOS", centerX, 60, { align: "center" });
  
    // Agregar detalles del usuario, sucursal y método de pago
    doc.setFontSize(12);
    doc.text(`Usuario: ${selectedUser.name || selectedUser.email}`, centerX, 75, { align: "center" });
    doc.text(`Sucursal: ${branch}`, centerX, 85, { align: "center" });
    doc.text(`Método de Pago: ${paymentMethod}`, centerX, 95, { align: "center" });
  
    // Listar productos
    let y = 110;
    cartItems.forEach((item, index) => {
      let productText = `${index + 1}. ${item.name} - $${item.price}`;
      if (item.selectedVariant) {
        productText += ` | Variante: ${item.selectedVariant.attributes.map(attr => attr.option).join(', ')}`;
      }
      doc.text(productText, centerX, y, { align: "center" });
      y += 10;
    });
  
    // Total y fecha
    const total = cartItems.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);
    doc.text(`Total: $${total}`, centerX, y + 20, { align: "center" });
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, centerX, y + 30, { align: "center" });
  
    window.open(doc.output('bloburl'), '_blank');
  };
  
  return (
    <div className="checkout-container">
      <h2>Confirmar Compra</h2>
      <UserSelect selectedUser={selectedUser} setSelectedUser={setSelectedUser} />

      <div className="checkout-field">
        <label>Sucursal:</label>
        <select value={branch} onChange={(e) => setBranch(e.target.value)} className="checkout-select">
          <option value="San Salvador">San Salvador</option>
          <option value="Santa Tecla">Santa Tecla</option>
        </select>
      </div>

      <div className="checkout-field">
        <label>Método de Pago:</label>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)} className="checkout-select">
          <option value="Efectivo">Efectivo</option>
          <option value="Tarjeta">Tarjeta</option>
        </select>
      </div>

      <button onClick={handleCheckout} className="checkout-button">Confirmar Compra</button>
    </div>
  );
}

export default Checkout;
