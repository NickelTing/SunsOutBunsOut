import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBurgers } from '../Services/BurgerService'; // Adjust the import path as needed
import type { Burger } from '../Models/Burgers';
import { useTheme } from '../ThemeContext'; // Import the theme context
import burgerImage from '../assets/burger.png';
import { Button, Loader, Container, Title, Text, Image, Group } from '@mantine/core';

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

  if (loading) return <Loader variant="dots" />;
  if (error) return <Text color="red">{error}</Text>;

  return (
    <Container className={`burger-menu ${theme}-theme`} size="md">
      <Group  mb="md">
        <Button onClick={handleBackClick}>Back</Button>
        <Button onClick={handleThemeToggle}>
          {theme === 'light' ? 'Dark' : 'Light'}
        </Button>
      </Group>
      <Title order={1}  mb="md" className='stylish'>
        <Image src={burgerImage} alt="Burger Icon" height={150} fit="contain" />
        <br />
        SunsOutBunsOut
      </Title>
      <br />
      <ul>
        {burgers.length ? (
          burgers.map((burger) => (
            <li key={burger.id}>
              <Title order={2} className='stylish'>{burger.name}</Title>
              <Text className='stylish'>{burger.description}</Text>
              <Text className='stylish'>${burger.price.toFixed(2)}</Text>
              {burger.image && <Image src={burger.image} alt={burger.name} />}
              <Text className='stylish' color={burger.isGlutenFree ? 'green' : 'red'}>
                {burger.isGlutenFree ? (
                  <>
                    Gluten-Free <span role="img" className='green-tick'  aria-label="Gluten Free">&#10004;</span>
                  </>
                ) : (
                  <>
                    Gluten-Free <span role="img" className='red-tick' aria-label="Not Gluten Free">&#10008;</span>
                  </>
                )}
              </Text>
            </li>
          ))
        ) : (
          <Text>No burgers available.</Text>
        )}
      </ul>
    </Container>
  );
};

export default BurgerMenu;
