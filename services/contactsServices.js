import fs from "fs/promises";
import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

const write = (data) =>
  fs.writeFile(contactsPath, JSON.stringify(data, null, 2));

async function listContacts() {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
}

async function getContactById(contactId) {
  const data = await listContacts();
  const result = data.find((dat) => dat.id === contactId);
  return result || null;
}

async function removeContact(contactId) {
  const data = await listContacts();
  const index = data.findIndex((dat) => dat.id === contactId);
  if (index === -1) return null;
  const [result] = data.splice(index, 1);
  await write(data);

  return result;
}

async function addContact(name, email, phone) {
  const data = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  data.push(newContact);
  await write(data);

  return newContact;
}

async function updateContact(id, newcontact) {
  const data = await listContacts();
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) {
    return null;
  }
  data[index] = { ...data[index], ...newcontact };
  await write(data);

  return data[index];
}

export default {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
