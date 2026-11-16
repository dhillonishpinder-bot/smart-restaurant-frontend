
import { useState } from 'react';

const menuItems = [
  { id: 1, name: 'Chicken Alfredo', category: 'Mains', price: 18.99, emoji: '🍝', vegetarian: false },
  { id: 2, name: 'Margherita Pizza', category: 'Mains', price: 15.99, emoji: '🍕', vegetarian: true },
  { id: 3, name: 'Garden Salad', category: 'Starters', price: 9.99, emoji: '🥗', vegetarian: true },
  { id: 4, name: 'Chocolate Lava Cake', category: 'Desserts', price: 8.99, emoji: '🍰', vegetarian: true },
  { id: 5, name: 'Fresh Lemonade', category: 'Beverages', price: 4.99, emoji: '🍹', vegetarian: true },
  { id: 6, name: 'Vegetable Pasta', category: 'Mains', price: 14.99, emoji: '🍝', vegetarian: true }
];

export default function Menu({ addToCart }) {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [vegetarianOnly, setVegetarianOnly] = useState(false);
  const [maxPrice, setMaxPrice] = useState(30);

  const filteredMenu = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === 'All' || item.category === category;

    const matchesDiet =
      !vegetarianOnly || item.vegetarian;

    const matchesPrice = item.price <= maxPrice;

    return matchesSearch && matchesCategory &&
      matchesDiet && matchesPrice;
  });

  return (
    <section className="section">
      <h2>Our Delicious Menu</h2>

      <div className="filterContainer">
        <input
          className="search"
          placeholder="Search food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="filterSelect"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="Starters">Starters</option>
          <option value="Mains">Mains</option>
          <option value="Desserts">Desserts</option>
          <option value="Beverages">Beverages</option>
        </select>

        <label className="dietFilter">
          <input
            type="checkbox"
            checked={vegetarianOnly}
            onChange={(e) => setVegetarianOnly(e.target.checked)}
          />
          Vegetarian Only
        </label>

        <label className="priceFilter">
          Max Price: ${maxPrice}
          <input
            type="range"
            min="5"
            max="30"
            value={maxPrice}
            onChange={(e) => setMaxPrice(Number(e.target.value))}
          />
        </label>
      </div>

      <div className="menuGrid">
        {filteredMenu.length === 0 ? (
          <p>No food items match your filters.</p>
        ) : (
          filteredMenu.map((item) => (
            <div className="foodCard" key={item.id}>
              <div className="foodEmoji">{item.emoji}</div>
              <h3>{item.name}</h3>
              <p>{item.category}</p>

              {item.vegetarian && (
                <span className="vegBadge">Vegetarian</span>
              )}

              <h3>${item.price.toFixed(2)}</h3>
              <button onClick={() => addToCart(item)}>
                Add to Cart
              </button>
            </div>
          ))
        )}
      </div>
    </section>
  );
}
