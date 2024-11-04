import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://sugarglamourstore.com/wp-json/wc/v3/products', {
          auth: {
            username: 'ck_9ea00d774f631ac961f9ded5861577f420c6416c', // Coloca tu Consumer Key
            password: 'cs_97def9374cc1a25bed2b7089f67a965c4f4b7cce' // Coloca tu Consumer Secret
          },
          params: {
            per_page: 10, // Limitar a 10 productos
          },
        });
        setProducts(response.data);
      } catch (error) {
        console.error("Error al obtener los productos:", error);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = (product) => {
    setCart([...cart, product]);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}>
      {/* Listado de Productos */}
      <div style={{ flex: 1, marginRight: '20px', border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <h2>Listado de Productos</h2>
        <ul style={{ listStyleType: 'none', padding: 0 }}>
          {products.map((product) => (
            <li key={product.id} style={{ marginBottom: '10px' }}>
              {product.name} - ${product.price}
              <button onClick={() => addToCart(product)} style={{ marginLeft: '10px' }}>Agregar al Carrito</button>
            </li>
          ))}
        </ul>
      </div>

      {/* Carrito de Compras */}
      <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
        <h2>Carrito de Compras</h2>
        {cart.length === 0 ? (
          <p>El carrito está vacío</p>
        ) : (
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {cart.map((item, index) => (
              <li key={index} style={{ marginBottom: '10px' }}>
                {item.name} - ${item.price}
              </li>
            ))}
          </ul>
        )}
        <p>Total: ${cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}</p>
        <button>Confirmar Compra</button>
      </div>
    </div>
  );
};

export default ProductList;
