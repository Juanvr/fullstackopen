import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Search from './components/Search'
import NewContact from './components/NewContact'
import contactsService from './services/contacts'

const App = () => {
  const [ contacts, setContacts] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');

  const [searchText, setSearchText] = useState('');
  const [shownContacts, setShownContacts] = useState(contacts);

  useEffect(() => {
    console.log('effect');
    
    contactsService.getAll()
      .then(response => {
        setContacts(response.data);
        setShownContacts(response.data);
        console.log(response.data);
      })
    
  }, []);

  const setNameFromInput = event => setNewName(event.target.value);
  const setPhoneFromInput = event => setNewPhone(event.target.value);

  const filterContacts = (contacts, searchText) => contacts.filter(a => a.name.toLowerCase().indexOf(searchText.toLowerCase())>-1);

  const searchInContacts = event => {
    const text = event.target.value;
    setSearchText(text);
    setShownContacts(filterContacts(contacts, text));
  }

  const addContact = event => {
    event.preventDefault();

    const foundContacts = contacts.filter(a => a.name === newName);
    const foundContact=foundContacts[0];
    if (foundContact){

      if (window.confirm(`Change contact ${newName}?`)) { 
        contactsService.update(
          foundContact.id,
          {...foundContact, phone:newPhone}
        )
        .then( response => 
          {
            console.log(response);
            const newContacts = contacts.map(item => item.id !== response.data.id? item:response.data);
            setContacts(newContacts);
            setShownContacts(filterContacts(newContacts, searchText));
          })
      }
    }else{

      contactsService.create({name:newName, phone: newPhone})
        .then( response => 
          {
            const newContacts = contacts.concat(response.data);
            setContacts(newContacts);
            setShownContacts(filterContacts(newContacts, searchText));
          })
    }
  }

  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) { 

      contactsService.del(contact.id)
      .then( () => 
        {
          contactsService.getAll()
          .then(response => {
            setContacts(response.data);
            setShownContacts(filterContacts(response.data, searchText));
          })
        })
     
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchFunction = {searchInContacts}/>

      <h3>New Contact</h3>
      <NewContact onSubmitFunction={addContact} onChangeNameFunction={setNameFromInput} onChangePhoneFunction={setPhoneFromInput}/>

      <h3>Contacts</h3>
      <Contacts contacts={shownContacts} deleteContact={deleteContact}/>
    </div>
  )
}

export default App