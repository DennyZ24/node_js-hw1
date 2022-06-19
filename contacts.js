const fs = require('fs').promises;
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const contactsPath = path.join(__dirname, 'db', 'contacts.json');

const listContacts = async () => {
  const data = await fs.readFile(contactsPath, 'utf-8');
  return JSON.parse(data);
};

const getContactById = async (id) => {
  const parsedId = id.toString();
  const allContacts = await listContacts();
  return allContacts.find(contact => contact.id === parsedId);
};

const removeContact = async (id) => {
  const parsedId = id.toString();
  const allContacts = await listContacts();
  const newContactsList = JSON.stringify(allContacts.filter(contact => contact.id !== parsedId));
  fs.writeFile(contactsPath, newContactsList)
};

const addContact = async (name, email, phone) => {
  const allContacts = await listContacts();
  const newContact = { id: uuidv4(), name, email, phone};
  const newContactsList = JSON.stringify([...allContacts, newContact]);

  fs.writeFile(contactsPath, newContactsList)
};


module.exports = { listContacts, getContactById, removeContact, addContact };