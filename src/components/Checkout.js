// src/components/Checkout.js
import React from 'react';
import { jsPDF } from 'jspdf';
import logo from '../assets/logo.png'; // Asegúrate de que la ruta de tu logo sea correcta

function Checkout({ cartItems, clearCart }) {
  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    // Confirmación de compra simulada
    alert('Compra confirmada con éxito');
    
    // Generar el PDF de la factura y abrirlo en el visor de impresión
    generatePDF();
    
    // Vaciar el carrito después de confirmar
    clearCart();
  };

  const generatePDF = () => {
    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;

    // Agregar el logo centrado
    doc.addImage(logo, 'PNG', centerX - 30, 10, 60, 30); // Ajusta el tamaño del logo si es necesario

    // Agregar el título centrado
    doc.setFontSize(18);
    doc.text("Factura de Compra - SugarPOS", centerX, 50, { align: "center" });

    // Agregar detalles de los productos centrados y con variantes
    doc.setFontSize(12);
    let y = 70; // Posición inicial en el eje Y
    cartItems.forEach((item, index) => {
      // Agregar nombre y precio del producto
      doc.text(`${index + 1}. ${item.name} - $${item.price}`, centerX, y, { align: "center" });
      y += 10;

      // Incluir la variante seleccionada si existe
      if (item.selectedVariant) {
        doc.text(`Variante: ${item.selectedVariant.attributes.map(attr => attr.option).join(', ')}`, centerX, y, { align: "center" });
        y += 10;
      }
    });

    // Calcular y mostrar el total centrado
    const total = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);
    doc.text(`Total: $${total}`, centerX, y + 20, { align: "center" });

    // Agregar la fecha de compra centrada
    doc.text(`Fecha: ${new Date().toLocaleDateString()}`, centerX, y + 30, { align: "center" });

    // Abrir en el visor de impresión
    window.open(doc.output('bloburl'), '_blank');
  };

  return (
    <div>
      <h2>Confirmar Compra</h2>
      <button onClick={handleCheckout}>Confirmar Compra</button>
    </div>
  );
}

export default Checkout;
