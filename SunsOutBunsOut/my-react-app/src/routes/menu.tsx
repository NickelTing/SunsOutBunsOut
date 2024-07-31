import React, { useEffect, useState } from 'react';
import { getBurgers } from '../Services/BurgerService'; // Adjust the import path as needed
import type { Burger } from '../Models/Burgers';

const BurgerMenu: React.FC = () => {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBurgers = async () => {
      try {
        const fetchedBurgers = await getBurgers();
        setBurgers(fetchedBurgers);
      } catch (err) {
        setError('Failed to load burgers');
      } finally {
        setLoading(false);
      }
    };

    fetchBurgers();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="burger-menu">
      <h1>Burger Menu</h1>
      <ul>
        {burgers.length ? (
          burgers.map((burger) => (
            <li key={burger.id}>
              <h2>{burger.name}</h2>
              <p>{burger.description}</p>
              <p>Price: ${burger.price.toFixed(2)}</p>
              {burger.image && <img src={burger.image} alt={burger.name} />}
              <p>{burger.isGlutenFree ? "Gluten-Free" : "Contains Gluten"}</p>
            </li>
          ))
        ) : (
          <p>No burgers available.</p>
        )}
      </ul>
    </div>
  );
};

export default BurgerMenu;
