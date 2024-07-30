import localforage from "localforage";
import { matchSorter } from "match-sorter";
import sortBy from "sort-by";

// Define the types for a Contact
interface Contact {
  id: string;
  first?: string;
  last?: string;
  createdAt: number;
  [key: string]: any; // To allow for other properties
}

export async function getContacts(query?: string): Promise<Contact[]> {
  await fakeNetwork(`getContacts:${query}`);
  let contacts: Contact[] | null = await localforage.getItem<Contact[]>("contacts");
  if (!contacts) contacts = [];
  if (query) {
    contacts = matchSorter(contacts, query, { keys: ["first", "last"] });
  }
  return contacts.sort(sortBy("last", "createdAt"));
}

export async function createContact(): Promise<Contact> {
  await fakeNetwork();
  let id = Math.random().toString(36).substring(2, 9);
  let contact: Contact = { id, createdAt: Date.now() };
  let contacts = await getContacts();
  contacts.unshift(contact);
  await set(contacts);
  return contact;
}

export async function getContact(id: string): Promise<Contact | null> {
  await fakeNetwork(`contact:${id}`);
  let contacts: Contact[] | null = await localforage.getItem<Contact[]>("contacts");
  if (!contacts) return null;
  let contact = contacts.find(contact => contact.id === id);
  return contact ?? null;
}

export async function updateContact(id: string, updates: Partial<Contact>): Promise<Contact> {
  await fakeNetwork();
  let contacts: Contact[] | null = await localforage.getItem<Contact[]>("contacts");
  if (!contacts) throw new Error("No contacts found");
  let contact = contacts.find(contact => contact.id === id);
  if (!contact) throw new Error(`No contact found for id: ${id}`);
  Object.assign(contact, updates);
  await set(contacts);
  return contact;
}

export async function deleteContact(id: string): Promise<boolean> {
  let contacts: Contact[] | null = await localforage.getItem<Contact[]>("contacts");
  if (!contacts) return false;
  let index = contacts.findIndex(contact => contact.id === id);
  if (index > -1) {
    contacts.splice(index, 1);
    await set(contacts);
    return true;
  }
  return false;
}

function set(contacts: Contact[]): Promise<Contact[]> {
  return localforage.setItem("contacts", contacts);
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