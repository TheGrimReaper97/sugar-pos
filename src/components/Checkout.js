// src/components/Checkout.js
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import logo from '../assets/logo.png'; // Asegúrate de que esta ruta sea correcta
import '../style.css';

const Checkout = ({ cartItems, clearCart, selectedUser }) => {
  const [branch, setBranch] = useState('San Salvador');
  const [paymentMethod, setPaymentMethod] = useState('Efectivo');

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    generatePDF();
    alert('Compra confirmada con éxito');
    clearCart();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // Añadir logo
    doc.addImage(logo, 'PNG', centerX - 40, 10, 80, 40);

    // Título y detalles de compra
    doc.setFontSize(18);
    doc.text("Factura de Compra - SugarPOS", centerX, 60, { align: "center" });
    
    // Información de usuario
    if (selectedUser) {
      doc.setFontSize(12);
      doc.text(`Usuario: (${selectedUser.email})`, centerX, 75, { align: "center" });
    }
    
    // Sucursal y método de pago
    doc.text(`Sucursal: ${branch}`, centerX, 85, { align: "center" });
    doc.text(`Método de Pago: ${paymentMethod}`, centerX, 95, { align: "center" });

    // Listado de productos
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

    // Abrir en visor de impresión
    window.open(doc.output('bloburl'), '_blank');
  };

  return (
    <div>
      <h2>Confirmar Compra</h2>

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

      <button onClick={handleCheckout} className="checkout-button">Finalizar Compra</button>
    </div>
  );
};

export default Checkout;
