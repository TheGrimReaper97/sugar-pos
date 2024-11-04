import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../style.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async (term = '', pageNum = 1, isLoadMore = false) => {
    try {
      const response = await axios.get(`https://sugarglamourstore.com/wp-json/wc/v3/products`, {
        params: {
          search: term,
          per_page: 10,
          page: pageNum,
        },
        auth: {
          username: 'ck_9ea00d774f631ac961f9ded5861577f420c6416c', 
          password: 'cs_97def9374cc1a25bed2b7089f67a965c4f4b7cce' 
        }
      });

      if (response.data.length > 0) {
        setProducts(prevProducts => isLoadMore ? [...prevProducts, ...response.data] : response.data);
        setHasMore(response.data.length === 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error al obtener los productos:", error);
      setHasMore(false);
    }
  };

  useEffect(() => {
    fetchProducts(searchTerm, 1, false);
  }, [searchTerm]);

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    setPage(1);
    fetchProducts(term, 1, false);
  };

  const loadMoreProducts = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchProducts(searchTerm, nextPage, true);
  };

  const addToCart = (product) => {
    setCart((prevCart) => [...prevCart, product]);
  };

  const clearCart = () => {
    setCart([]);
  };

  return (
    <div className="main-container">
      <div className="header">
        <img src="https://sugarglamourstore.com/wp-content/uploads/2020/10/LOGO-SUGAR100924-optimized.png" alt="Logo" className="logo" />
        <h1 className="title">Sugar POS</h1>
      </div>
      
      <div className="search-bar">
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Buscar productos..."
          className="search-input"
        />
      </div>

      <div className="content">
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-item">
              <img
                src={product.images[0]?.src}
                alt={product.name}
                style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
              />
              <strong>{product.name}</strong> - ${product.price}
              <button onClick={() => addToCart(product)}>Agregar al Carrito</button>
            </div>
          ))}
          {hasMore && (
            <button onClick={loadMoreProducts} className="load-more-btn">
              Mostrar Más Productos
            </button>
          )}
        </div>
        <div className="cart">
          <h2>Carrito de Compras</h2>
          {cart.length === 0 ? (
            <p>El carrito está vacío</p>
          ) : (
            <ul>
              {cart.map((item, index) => (
                <li key={index}>{item.name} - ${item.price}</li>
              ))}
            </ul>
          )}
          <p>Total: ${cart.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2)}</p>
          <button onClick={clearCart}>Vaciar Carrito</button>
          <button>Confirmar Compra</button>
        </div>
      </div>
    </div>
  );
};

export default ProductList;
