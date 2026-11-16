
import { useState } from 'react';
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom';

import Home from './pages/Home';
import Menu from './pages/Menu';
import Cart from './pages/Cart';

import Checkout from './components/Checkout';
import Reservation from './components/Reservation';
import Chatbot from './components/Chatbot';

import './App.css';

export default function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (item) => {
    setCart((previous) => [...previous, item]);
  };

  const removeFromCart = (indexToRemove) => {
    setCart((previous) =>
      previous.filter((_, index) => index !== indexToRemove)
    );
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price,
    0
  );

  return (
    <BrowserRouter>
      <nav className="navbar">
        <h2>🍽️ Smart Restaurant</h2>

        <div>
          <NavLink to="/">Home</NavLink>
          <NavLink to="/menu">Menu</NavLink>
          <NavLink to="/cart">Cart ({cart.length})</NavLink>
          <NavLink to="/checkout">Checkout</NavLink>
          <NavLink to="/reservations">Reservations</NavLink>
        </div>
      </nav>

      <main>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/menu"
            element={<Menu addToCart={addToCart} />}
          />

          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                total={total}
                removeFromCart={removeFromCart}
                clearCart={() => setCart([])}
              />
            }
          />

          <Route
            path="/checkout"
            element={
              <Checkout
                cart={cart}
                total={total}
                onOrderPlaced={() => setCart([])}
              />
            }
          />

          <Route
            path="/reservations"
            element={<Reservation />}
          />

          <Route
            path="*"
            element={
              <section className="section">
                <h2>Page Not Found</h2>
                <LinkToHome />
              </section>
            }
          />
        </Routes>
      </main>

      <Chatbot />

      <footer>
        © 2026 Smart Restaurant. All rights reserved.
      </footer>
    </BrowserRouter>
  );
}

function LinkToHome() {
  return <NavLink to="/">Return to Home</NavLink>;
}
