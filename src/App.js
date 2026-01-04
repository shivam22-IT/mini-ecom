import React, { useState, useMemo, useEffect } from 'react';
import './App.css';

const MOCK_DATA = [
  { id: 1, name: "Classic Tee", price: 25, category: "Apparel", stock: 10 },
  { id: 2, name: "Running Shoes", price: 85, category: "Footwear", stock: 5 },
  { id: 3, name: "Smart Watch", price: 150, category: "Electronics", stock: 0 },
  { id: 4, name: "Leather Wallet", price: 45, category: "Accessories", stock: 12 },
  { id: 5, name: "Headphones", price: 120, category: "Electronics", stock: 4 },
  { id: 6, name: "Yoga Mat", price: 30, category: "Fitness", stock: 8 },
  { id: 7, name: "Coffee Mug", price: 15, category: "Home", stock: 15 },
  { id: 8, name: "Backpack", price: 60, category: "Accessories", stock: 7 },
  { id: 9, name: "Gaming Mouse", price: 50, category: "Electronics", stock: 3 },
  { id: 10, name: "Desk Lamp", price: 35, category: "Home", stock: 6 },
  { id: 11, name: "Hoodie", price: 55, category: "Apparel", stock: 9 },
  { id: 12, name: "Water Bottle", price: 18, category: "Fitness", stock: 25 },
  { id: 13, name: "Sunglasses", price: 20, category: "Accessories", stock: 0 },
  { id: 14, name: "Keyboard", price: 75, category: "Electronics", stock: 2 },
  { id: 15, name: "Belt", price: 22, category: "Accessories", stock: 10 }
];

export default function App() {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('cart');
    return saved ? JSON.parse(saved) : [];
  });
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('');

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const filteredProducts = useMemo(() => {
    return MOCK_DATA
      .filter(p => {
        const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCat = category === 'All' || p.category === category;
        return matchesSearch && matchesCat;
      })
      .sort((a, b) => {
        if (sort === 'low') return a.price - b.price;
        if (sort === 'high') return b.price - a.price;
        return 0;
      });
  }, [search, category, sort]);

  const addToCart = (product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return existing.quantity < product.stock 
          ? prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item)
          : prev;
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const updateQty = (id, delta) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const nextQty = item.quantity + delta;
        return (nextQty >= 1 && nextQty <= item.stock) ? { ...item, quantity: nextQty } : item;
      }
      return item;
    }));
  };

  const removeItem = (id) => setCart(prev => prev.filter(i => i.id !== id));

  const totalItems = cart.reduce((acc, i) => acc + i.quantity, 0);
  const totalPrice = cart.reduce((acc, i) => acc + (i.price * i.quantity), 0);

  return (
    <div className="container">
      <header>
        <h1>Mini E-Shop</h1>
        <div className="filters">
          <input type="text" placeholder="Search name..." value={search} onChange={e => setSearch(e.target.value)} />
          <select value={category} onChange={e => setCategory(e.target.value)}>
            <option value="All">All Categories</option>
            <option value="Apparel">Apparel</option>
            <option value="Electronics">Electronics</option>
            <option value="Accessories">Accessories</option>
            <option value="Fitness">Fitness</option>
            <option value="Home">Home</option>
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="">Sort By Price</option>
            <option value="low">Low to High</option>
            <option value="high">High to Low</option>
          </select>
          <button onClick={() => {setSearch(''); setCategory('All'); setSort('');}}>Clear Filters</button>
        </div>
      </header>

      <div className="main">
        <section className="product-list">
          {filteredProducts.length === 0 ? <p className="empty">No products found</p> : (
            <div className="product-grid">
              {filteredProducts.map(p => (
                <div key={p.id} className="card">
                  <h3>{p.name}</h3>
                  <p className="cat-tag">{p.category}</p>
                  <p className="price">${p.price}</p>
                  <p className={p.stock > 0 ? "in-stock" : "out-stock"}>
                    {p.stock > 0 ? `In Stock (${p.stock})` : "Out of Stock"}
                  </p>
                  <button disabled={p.stock === 0} onClick={() => addToCart(p)}>Add to Cart</button>
                </div>
              ))}
            </div>
          )}
        </section>

        <aside className="cart">
          <h2>Cart ({totalItems})</h2>
          {cart.length === 0 ? <p className="empty">Empty cart</p> : (
            <>
              {cart.map(item => (
                <div key={item.id} className="cart-item">
                  <span>{item.name}</span>
                  <div className="controls">
                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)} disabled={item.quantity >= item.stock}>+</button>
                    <button onClick={() => removeItem(item.id)} className="del">x</button>
                  </div>
                </div>
              ))}
              <hr />
              <h3>Total: ${totalPrice}</h3>
            </>
          )}
        </aside>
      </div>
    </div>
  );
}