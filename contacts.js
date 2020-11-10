const fsPromises = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, 'db/contacts.json');

async function listContacts() {
	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');
		const parsedData = await JSON.parse(data);

		console.table(parsedData);
	} catch (error) {
		console.error(error);
	}
}

async function getContactById(contactId) {
	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');
		const parsedData = await JSON.parse(data);

		const contact = await parsedData.find(({ id }) => id === contactId);

		console.table(contact);
	} catch (error) {
		console.error(error);
	}
}

async function removeContact(contactId) {
	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');

		const rewroteList = await JSON.parse(data).filter(({ id }) => id !== contactId);
		const stringifyRewroteList = JSON.stringify(rewroteList, null, 2);

		await fsPromises.writeFile(contactsPath, stringifyRewroteList, 'utf-8');

		console.log('The contact has been removed!');
	} catch (error) {
		console.error(error);
	}
}

async function addContact(name, email, phone) {
	try {
		const data = await fsPromises.readFile(contactsPath, 'utf-8');

		//Вместо этого можно было установить uuid, но я решил не нарушать специфику id в данном примере :)
		const id = (await JSON.parse(data).length) + 1;

		const rewroteContactList = await JSON.parse(data).concat({ id, name, email, phone });
		const stringifiedRewroteList = JSON.stringify(rewroteContactList, null, 2);

		await fsPromises.writeFile(contactsPath, stringifiedRewroteList, 'utf-8');

		console.log('The contact has been added!');
	} catch (error) {
		console.error(error);
	}
}

module.exports = { listContacts, getContactById, removeContact, addContact };
