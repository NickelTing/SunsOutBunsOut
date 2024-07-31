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
  try {
    await fakeNetwork();
    const burger: Burger = { price: 0, name: 'New Burger', description: 'Some Description', isGlutenFree: false };
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(burger),
    });
    if (!response.ok) {
      const errorText = await response.text(); // Get the error response text
      throw new Error(`Failed to create burger: ${response.status} ${response.statusText} - ${errorText}`);
    }
    const data: Burger = await response.json();
    return data;
  } catch (error) {
    console.error('Error creating burger:', error);
    throw error;
  }
};

export const updateBurger = async (id: string, burger: Partial<Burger>): Promise<void> => {
  try {
    // Update the burger object with the numeric ID
    burger.id = id;

    const response = await fetch(`${apiUrl}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(burger),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to update burger: ${response.status} ${response.statusText} - ${errorText}`);
    }
  } catch (error) {
    console.error('Error updating burger:', error);
    throw error;
  }
};
export const deleteBurger = async (id: string): Promise<void> => {
  await fetch(`${apiUrl}/${id}`, {
    method: 'DELETE',
  });
};

// export const bulkCreateBurgers = async (burgers: Omit<Burger, 'id'>[]): Promise<Burger[]> => {
//   const response = await fetch(`${apiUrl}/bulk`, {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(burgers),
//   });
//   const data = await response.json();
//   return data;
// };

// function set(burgers: Burger[]): Promise<Burger[]> {
//   return localforage.setItem("burgers", burgers);
// }

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