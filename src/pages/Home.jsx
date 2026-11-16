
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <header id="home" className="hero">
      <h1>Welcome to Smart Restaurant</h1>
      <p>Delicious food, freshly prepared for you.</p>
      <Link className="heroButton" to="/menu">
        Explore Menu
      </Link>
    </header>
  );
}
