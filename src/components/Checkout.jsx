
import { useState } from 'react';

export default function Checkout({ cart, total, onOrderPlaced }) {
  const [orderType, setOrderType] = useState('Pickup');
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [confirmation, setConfirmation] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (cart.length === 0) {
      alert('Please add food to your cart first.');
      return;
    }

    const order = {
      id: `ORD-${Date.now()}`,
      customerName,
      phone,
      address: orderType === 'Delivery' ? address : '',
      orderType,
      items: [...cart],
      total,
      status: 'Confirmed'
    };

    setConfirmation(order);
    onOrderPlaced();

    setCustomerName('');
    setPhone('');
    setAddress('');
  };

  return (
    <section id="checkout" className="section checkoutSection">
      <h2>Place Your Order</h2>
      <p>Choose pickup or delivery to complete your order.</p>

      <form className="checkoutForm" onSubmit={handleSubmit}>
        <label htmlFor="orderType">Order Type</label>
        <select
          id="orderType"
          value={orderType}
          onChange={(e) => setOrderType(e.target.value)}
        >
          <option value="Pickup">Pickup</option>
          <option value="Delivery">Delivery</option>
        </select>

        <label htmlFor="customerName">Customer Name</label>
        <input
          id="customerName"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
          placeholder="Enter your name"
          required
        />

        <label htmlFor="phone">Phone Number</label>
        <input
          id="phone"
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter your phone number"
          required
        />

        {orderType === 'Delivery' && (
          <>
            <label htmlFor="address">Delivery Address</label>
            <textarea
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your delivery address"
              required
            />
          </>
        )}

        <h3>Order Total: ${total.toFixed(2)}</h3>

        <button type="submit" disabled={cart.length === 0}>
          Confirm Order
        </button>
      </form>

      {confirmation && (
        <div className="orderConfirmation" role="status">
          <h3>Order Confirmed!</h3>
          <p>Order ID: {confirmation.id}</p>
          <p>Customer: {confirmation.customerName}</p>
          <p>Order Type: {confirmation.orderType}</p>
          <p>Status: {confirmation.status}</p>
          <p>Total: ${confirmation.total.toFixed(2)}</p>
          <p>
            This is a simulated order for the frontend demo.
          </p>
        </div>
      )}
    </section>
  );
}
