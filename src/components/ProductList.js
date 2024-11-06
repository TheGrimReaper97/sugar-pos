// src/components/ProductList.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductItem from './ProductItem';
import Cart from './Cart';
import SearchBar from './SearchBar';
import Header from './Header';
import '../style.css';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchProducts = async (term = '', pageNum = 1, isLoadMore = false) => {
    try {
      let response;

      if (!isNaN(term) && term) {
        // Búsqueda específica por SKU
        response = await axios.get(`https://sugarglamourstore.com/wp-json/wc/v3/products`, {
          params: {
            sku: term,  // Usamos el parámetro `sku` para buscar por código de barras (SKU)
            per_page: 10,
            page: pageNum,
          },
          auth: {
            username: 'ck_9ea00d774f631ac961f9ded5861577f420c6416c',
            password: 'cs_97def9374cc1a25bed2b7089f67a965c4f4b7cce'
          }
        });
      } else {
        // Búsqueda general si no es numérico o no es un SKU
        response = await axios.get(`https://sugarglamourstore.com/wp-json/wc/v3/products`, {
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
      }

      if (response.data.length > 0) {
        setProducts(prevProducts => isLoadMore ? [...prevProducts, ...response.data] : response.data);
        setHasMore(response.data.length === 10);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error al obtener los productos o al filtrar por SKU:", error.response ? error.response.data : error.message);
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
      <Header />
      <SearchBar searchTerm={searchTerm} onSearch={handleSearch} />
      <div className="content">
        <div className="product-grid">
          {products.map((product) => (
            <ProductItem key={product.id} product={product} onAddToCart={addToCart} />
          ))}
          {hasMore && (
            <button onClick={loadMoreProducts} className="load-more-btn">
              Mostrar Más Productos
            </button>
          )}
        </div>
        <Cart cartItems={cart} onClearCart={clearCart} />
      </div>
    </div>
  );
};

export default ProductList;