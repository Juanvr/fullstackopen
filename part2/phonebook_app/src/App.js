import React, { useState } from 'react'
import Contacts from './components/Contacts'
import Search from './components/Search'
import NewContact from './components/NewContact'

const App = () => {
  const [ contacts, setContacts] = useState([
      { name: 'Arto Hellas', phone: '040-123456' },
      { name: 'Ada Lovelace', phone: '39-44-5323523' },
      { name: 'Dan Abramov', phone: '12-43-234345' },
      { name: 'Mary Poppendieck', phone: '39-23-6423122' }
  ]);
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');

  const [searchText, setSearchText] = useState('');
  const [shownContacts, setShownContacts] = useState(contacts);

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

    if (contacts.map(a => a.name).indexOf(newName) > -1){
      alert(`${newName} is already added to phonebook`);
    }else{
      const newContacts = contacts.concat({name:newName, phone: newPhone});
      setContacts(newContacts);
      setShownContacts(filterContacts(newContacts, searchText));
    }
  }

  return (
    <div>
      <h1>Phonebook</h1>
      <Search searchFunction = {searchInContacts}/>

      <h3>New Contact</h3>
      <NewContact onSubmitFunction={addContact} onChangeNameFunction={setNameFromInput} onChangePhoneFunction={setPhoneFromInput}/>

      <h3>Numbers</h3>
      <Contacts contacts = {shownContacts}/>
    </div>
  )
}

export default App