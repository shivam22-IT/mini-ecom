import React from 'react';

const ProductList = React.memo(({ products, addToCart }) => {
  if (products.length === 0) return <div className="empty">No products found</div>;

  return (
    <div className="product-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <img src={product.thumbnail} alt={product.title} />
          <h3>{product.title}</h3>
          <p className="category">{product.category}</p>
          <p className="price">${product.price}</p>
          <p className={`stock ${product.stock > 0 ? '' : 'out'}`}>
            {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
          </p>
          <button 
            disabled={product.stock === 0}
            onClick={() => addToCart(product)}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
});

export default ProductList;