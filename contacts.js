const fs = require('fs');
const path = require('path');

const contactsPath = path.join(__dirname, "db", "contacts.json");

    function listContacts() {
        fs.readFile(contactsPath, "utf-8", (err, data) => {
            if (err) {
                console.error("Error reading contacts:", err);
                return;
            }
            try {
                const contacts = JSON.parse(data);
                console.log("Contacts:")
                contacts.forEach((contact, index) => {
                    console.log(`${index + 1}. Name: ${contact.name}, Email: ${contact.email}, Phone: ${contact.phone}`)
                });
            } catch (error) {
                console.error('Error parsing contacts data:', error);
            }
        });
    }

function getContactById(contactId) {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            console.error("Error reading contacts:", err);
            return;
        }
        try {
            const contacts = JSON.parse(data);
            const contact = contacts[contactId - 1];
            if (contact) {
                console.log('Contact found:');
                console.log(`Name: ${contact.name}, Email: ${contact.email}, Phone: ${contact.phone}`);
            } else {
                console.log('Contact not found');
            }
        } catch (error) {
            console.error('Error parsing contacts data:', error);
        }
    });
}

function removeContact(contactId) {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading contacts:', err);
            return;
        }
        try {
            const contacts = JSON.parse(data);
            if (contactId >= 1 && contactId <= contacts.length) {
                const removedContact = contacts.splice(contactId - 1, 1);
                fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
                    if (err) {
                        console.error('Error writing contacts:', err);
                        return;
                    }
                    console.log('Contact removed:');
                    console.log(`Name: ${removedContact[0].name}, Email: ${removedContact[0].email}, Phone: ${removedContact[0].phone}`);
                });
            } else {
                console.log('Contact not found.');
            }
        } catch (error) {
            console.error('Error parsing contacts data:', error);
        }
    });
}

function addContact(name, email, phone) {
    fs.readFile(contactsPath, 'utf-8', (err, data) => {
        if (err) {
            console.error('Error reading contacts:', err);
            return;
        }
        try {
            const contacts = JSON.parse(data);
            const newContact = { name, email, phone };
            contacts.push(newContact);

            fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), (err) => {
                if (err) {
                    console.error('Error writing contacts:', err);
                    return;
                }
                console.log('Contact added:');
                console.log(`Name: ${newContact.name}, Email: ${newContact.email}, Phone:${newContact.phone}`);
            });
        } catch (error) {
            console.error(' Error parsing contacts data:', error);
        }

    })


}
module.exports = { listContacts, getContactById, removeContact, addContact }
