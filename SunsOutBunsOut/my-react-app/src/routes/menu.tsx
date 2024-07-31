import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBurgers } from '../Services/BurgerService'; // Adjust the import path as needed
import type { Burger } from '../Models/Burgers';
import { useTheme } from '../ThemeContext'; // Import the theme context
import burgerImage from '../assets/burger.png';

const BurgerMenu: React.FC = () => {
  const [burgers, setBurgers] = useState<Burger[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate(); // For navigation
  const { theme, toggleTheme } = useTheme(); // For theme context

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

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  const handleThemeToggle = () => {
    toggleTheme(); // Toggle between light and dark theme
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className={`burger-menu ${theme}-theme`}>
      <div>
        <button onClick={handleBackClick}>Back</button>
        <button onClick={handleThemeToggle}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </button>
      </div>
      <br></br>
      <h1 className="stylish">
          <img src={burgerImage} alt="Burger Icon" style={{ height: '150px', width: 'auto' }} // Maintain aspect ratio
          />
        <br></br>
        SunsOutBunsOut
      </h1>
      <ul>
        {burgers.length ? (
          burgers.map((burger) => (
            <li key={burger.id}>
              <h2 className="stylish">{burger.name}</h2>
              <p className="stylish">{burger.description}</p>
              <p className="stylish">${burger.price.toFixed(2)}</p>
              {burger.image && <img src={burger.image} alt={burger.name} />}
              <p className='stylish'>
                {burger.isGlutenFree ? (
                  <span role="img" aria-label="Gluten Free" className="gluten-free">
                      Gluten-Free <span className="green-tick">&#10004;</span>
                    </span>
                  ) : (
                  <span role="img" aria-label="Not Gluten Free" className="not-gluten-free">
                      Gluten-Free <span className="tick red-tick">&#10008;</span>
                  </span>
                )}
              </p>
              <br></br>
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
