const fs = require('fs');
const argv = require('yargs').argv;
const contactsAPI = require('./contacts.js');

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const contacts = await contactsAPI.listContacts();
      console.log(console.table(contacts));
      break;

    case "get":
      const contact = await contactsAPI.getContactById(id);
      console.log(contact);
      break;

    case "add":
      contactsAPI.addContact(name, email, phone);
      break;

    case "remove":
      contactsAPI.removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
