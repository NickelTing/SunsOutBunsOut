import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import { Burger } from '../Models/Burgers';
import config from '../Config';

const { apiUrl } = config;

export const getBurgers = async (query?: string): Promise<Burger[]> => {
  const response = await fetch(apiUrl);
  console.log(response);
  let burgers = await response.json();
  if (!burgers) burgers = [];
  if (query) {
    burgers = matchSorter(burgers, query, { keys: ["name"] });
  }
  return burgers.sort(sortBy("id"));
};

export async function getBurger(id: string): Promise<Burger | null> {
  try {
    // Construct the URL for the specific burger
    const response = await fetch(`${config.apiUrl}/${id}`);
    // Check if the response is successful
    if (!response.ok) {
      // If not, handle errors (e.g., burger not found)
      console.error('Failed to fetch burger:', response.statusText);
      return null;
    }
    // Parse the JSON response
    const burger: Burger = await response.json();
    // Return the fetched burger
    console.log(burger);
    return burger;
  } catch (error) {
    // Handle any errors during the fetch operation
    console.error('Error fetching burger:', error);
    return null;
  }
}

export const createBurger = async (): Promise<Burger> => {
  await fakeNetwork();
  let burgers = await getBurgers();
  let id = burgers.length + 1;
  const burger: Burger = { id, price: 0, isGlutenFree: false };
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

function set(burgers: Burger[]): Promise<Burger[]> {
  return localforage.setItem("burgers", burgers);
}

// fake a cache so we don't slow down stuff we've already seen
let fakeCache: { [key: string]: boolean } = {};

async function fakeNetwork(key?: string): Promise<void> {
    if (!key) {
      fakeCache = {};
    } else {
      if (fakeCache[key]) {
        return;
      }
      fakeCache[key] = true;
    }
    
    return new Promise(res => {
      setTimeout(res, Math.random() * 800);
    });
  }