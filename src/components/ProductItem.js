// src/components/ProductItem.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductItem = ({ product, onAddToCart }) => {
  const [variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState(null);

  useEffect(() => {
    // Cargar variantes si el producto tiene variantes
    if (product.variations && product.variations.length > 0) {
      const fetchVariants = async () => {
        try {
          const response = await axios.get(`https://sugarglamourstore.com/wp-json/wc/v3/products/${product.id}/variations`, {
            auth: {
              username: 'ck_9ea00d774f631ac961f9ded5861577f420c6416c', 
              password: 'cs_97def9374cc1a25bed2b7089f67a965c4f4b7cce' 
            }
          });
          setVariants(response.data);
        } catch (error) {
          console.error('Error al obtener variantes:', error);
        }
      };

      fetchVariants();
    }
  }, [product]);

  const handleVariantChange = (e) => {
    const variantId = e.target.value;
    const variant = variants.find(v => v.id === parseInt(variantId));
    setSelectedVariant(variant);
  };

  const handleAddToCart = () => {
    const itemToAdd = selectedVariant ? { ...product, selectedVariant } : product;
    onAddToCart(itemToAdd);
  };

  return (
    <div className="product-item">
      <img
        src={product.images[0]?.src}
        alt={product.name}
        style={{ width: '100px', height: '100px', objectFit: 'cover', marginBottom: '10px' }}
      />
      <strong>{product.name}</strong> - ${product.price}

      {variants.length > 0 && (
        <select onChange={handleVariantChange}>
          <option value="">Selecciona una variante</option>
          {variants.map((variant) => (
            <option key={variant.id} value={variant.id}>
              {variant.attributes.map(attr => attr.option).join(', ')}
            </option>
          ))}
        </select>
      )}

      <button onClick={handleAddToCart}>Agregar al Carrito</button>
    </div>
  );
};

export default ProductItem;

