import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";
import type { Burger } from './Models/Burgers';

export async function getBurgers(query?: string): Promise<Burger[]> {
  await fakeNetwork(`getBurgers:${query}`);
  let burgers: Burger[] | null = await localforage.getItem<Burger[]>("burgers");
  if (!burgers) burgers = [];
  if (query) {
    burgers = matchSorter(burgers, query, { keys: ["Name"] });
  }
  return burgers.sort(sortBy("id"));
}

export async function createBurger(): Promise<Burger> {
  await fakeNetwork();
  let burgers = await getBurgers();
  let id = burgers.length + 1;
  let burger: Burger = { id, IsGlutenFree: false };
  burgers.push(burger);
  await set(burgers);
  return burger;
}

export async function getBurger(id: string): Promise<Burger | null> {
  await fakeNetwork(`burgers:${id}`);
  let burgers: Burger[] | null = await localforage.getItem<Burger[]>("burgers");
  if (!burgers) return null;
  let burger = burgers.find(burger => burger.id.toString() === id);
  return burger ?? null;
}

export async function updateBurger(id: string, updates: Partial<Burger>): Promise<Burger> {
  await fakeNetwork();
  let burgers: Burger[] | null = await localforage.getItem<Burger[]>("burgers");
  if (!burgers) throw new Error("No burgers found");
  let burger = burgers.find(burger => burger.id.toString() === id);
  if (!burger) throw new Error(`No burger found for id: ${id}`);
  // Apply updates to the burger
  Object.assign(burger, updates);
  await set(burgers);
  return burger;
}

export async function deleteBurger(id: string): Promise<boolean> {
  let burgers: Burger[] | null = await localforage.getItem<Burger[]>("burgers");
  if (!burgers) return false;
  let index = burgers.findIndex(burger => burger.id.toString() === id);
  if (index > -1) {
    burgers.splice(index, 1);
    await set(burgers);
    return true;
  }
  return false;
}

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