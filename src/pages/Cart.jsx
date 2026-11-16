
import { Link } from 'react-router-dom';

export default function Cart({
  cart,
  total,
  removeFromCart,
  clearCart
}) {
  return (
    <section className="section cartSection">
      <h2>🛒 Your Shopping Cart</h2>

      {cart.length === 0 ? (
        <>
          <p>Your cart is empty.</p>
          <Link to="/menu" className="heroButton">
            Browse Menu
          </Link>
        </>
      ) : (
        <>
          {cart.map((item, index) => (
            <div className="cartItem" key={index}>
              <span>
                {item.name} — ${item.price.toFixed(2)}
              </span>

              <button
                className="removeButton"
                onClick={() => removeFromCart(index)}
              >
                Remove
              </button>
            </div>
          ))}

          <h3>Total: ${total.toFixed(2)}</h3>

          <button onClick={clearCart}>Clear Cart</button>

          <p>
            <Link to="/checkout" className="heroButton">
              Proceed to Checkout
            </Link>
          </p>
        </>
      )}
    </section>
  );
}
