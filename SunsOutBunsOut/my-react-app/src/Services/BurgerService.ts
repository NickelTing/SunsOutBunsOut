import { Burger } from '../Models/Burgers';
import config from '../Config';

const { apiUrl } = config;

export const getBurgers = async (): Promise<Burger[]> => {
  const response = await fetch(apiUrl);
  const data = await response.json();
  return data;
};

export const createBurger = async (burger: Omit<Burger, 'id'>): Promise<Burger> => {
  const response = await fetch(apiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(burger),
  });
  const data = await response.json();
  return data;
};

export const updateBurger = async (id: number, burger: Burger): Promise<void> => {
  await fetch(`${apiUrl}/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(burger),
  });
};

export const deleteBurger = async (id: number): Promise<void> => {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
};

export const bulkCreateBurgers = async (burgers: Omit<Burger, 'id'>[]): Promise<Burger[]> => {
  const response = await fetch(`${apiUrl}/bulk`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(burgers),
  });
  const data = await response.json();
  return data;
};