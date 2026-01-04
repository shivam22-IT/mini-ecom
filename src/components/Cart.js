import React from 'react';

const Cart = ({ items, updateQuantity, removeFromCart }) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <aside className="cart">
      <h2>Your Cart ({totalItems})</h2>
      {items.length === 0 ? (
        <p>Empty cart</p>
      ) : (
        <>
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h4>{item.title}</h4>
                  <p>${item.price} x {item.quantity}</p>
                </div>
                <div className="cart-controls">
                  <button onClick={() => updateQuantity(item.id, -1)}>-</button>
                  <button onClick={() => updateQuantity(item.id, 1)} disabled={item.quantity >= item.stock}>+</button>
                  <button onClick={() => removeFromCart(item.id)} className="remove">Remove</button>
                </div>
              </div>
            ))}
          </div>
          <div className="cart-summary">
            <h3>Total: ${totalPrice.toFixed(2)}</h3>
          </div>
        </>
      )}
    </aside>
  );
};

export default Cart;