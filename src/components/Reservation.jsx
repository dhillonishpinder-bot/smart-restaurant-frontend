
import { useState } from 'react';

export default function Reservation() {
  const [form, setForm] = useState({
    name: '',
    date: '',
    time: '',
    guests: '2',
    type: 'Regular Table',
    requirements: ''
  });

  const [confirmation, setConfirmation] = useState('');

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const selectedDateTime = new Date(
      `${form.date}T${form.time}`
    );

    if (selectedDateTime <= new Date()) {
      alert('Please select a future date and time.');
      return;
    }

    setConfirmation(
      `Thank you, ${form.name}! Your ${form.type.toLowerCase()} ` +
      `reservation request for ${form.guests} guests on ` +
      `${form.date} at ${form.time} has been recorded.`
    );

    setForm({
      name: '',
      date: '',
      time: '',
      guests: '2',
      type: 'Regular Table',
      requirements: ''
    });
  };

  const today = new Date();
  const localToday = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
  ].join('-');

  return (
    <section id="reservation" className="section reservationSection">
      <h2>Reserve Your Table</h2>
      <p>Book a table or plan your special event.</p>

      <form className="reservationForm" onSubmit={handleSubmit}>
        <label htmlFor="guestName">Your Name</label>
        <input
          id="guestName"
          name="name"
          placeholder="Enter your name"
          value={form.name}
          onChange={handleChange}
          required
        />

        <label htmlFor="reservationDate">Reservation Date</label>
        <input
          id="reservationDate"
          type="date"
          name="date"
          min={localToday}
          value={form.date}
          onChange={handleChange}
          required
        />

        <label htmlFor="reservationTime">Reservation Time</label>
        <input
          id="reservationTime"
          type="time"
          name="time"
          value={form.time}
          onChange={handleChange}
          required
        />

        <label htmlFor="guestCount">Number of Guests</label>
        <input
          id="guestCount"
          type="number"
          name="guests"
          min="1"
          max="50"
          value={form.guests}
          onChange={handleChange}
          required
        />

        <label htmlFor="reservationType">Reservation Type</label>
        <select
          id="reservationType"
          name="type"
          value={form.type}
          onChange={handleChange}
        >
          <option>Regular Table</option>
          <option>Birthday Party</option>
          <option>Corporate Event</option>
          <option>Other Special Event</option>
        </select>

        <label htmlFor="requirements">Special Requirements</label>
        <textarea
          id="requirements"
          name="requirements"
          placeholder="Optional requests..."
          value={form.requirements}
          onChange={handleChange}
          rows="3"
        />

        <button type="submit">Book Reservation</button>
      </form>

      {confirmation && (
        <div className="reservationSuccess" role="status">
          {confirmation}
        </div>
      )}
    </section>
  );
}
