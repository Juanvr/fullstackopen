import React, { useState, useEffect } from 'react'
import Contacts from './components/Contacts'
import Search from './components/Search'
import NewContact from './components/NewContact'
import contactsService from './services/contacts'
import Notification from './components/Notification'


const App = () => {
  const [ contacts, setContacts] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newPhone, setNewPhone ] = useState('');

  const [searchText, setSearchText] = useState('');
  const [shownContacts, setShownContacts] = useState(contacts);
  const [notification, setNotification] = useState({message:null, error: false});

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

  const filterContacts = (contacts, searchText) => 
      contacts.filter(a => 
        a.name.toLowerCase().indexOf(searchText.toLowerCase())>-1
      );

  const searchInContacts = event => {
    const text = event.target.value;
    setSearchText(text);
    setShownContacts(filterContacts(contacts, text));
  }

  const showNotification = (message, error) => {
    setNotification(
      {message, error}
    );
    setTimeout(() => {
      setNotification({message: null, error: false})
    }, 5000);
  }

  const addContact = event => {
    event.preventDefault();

    const foundContacts = contacts.filter(a => a.name === newName);
    const foundContact=foundContacts[0];


    if (!foundContact){
      contactsService.create({name:newName, phone: newPhone})
      .then( response => 
        {
          const newContacts = contacts.concat(response.data);
          setContacts(newContacts);
          setShownContacts(filterContacts(newContacts, searchText));
          return response;
        })
      .then( response => {
        const message = `${response.data.name} added to contact list`;
        showNotification(message, false);
        return response;
      })
      .catch( error => {
        console.error(error.response.data.message);
        showNotification(error.response.data.message, true);
      });
      return;
    } 

    if (window.confirm(`Change contact ${newName}?`)) { 
      contactsService.update(
        foundContact.id,
        {...foundContact, phone:newPhone}
      )
      .then( response => 
        {
          console.log("front-response:",response);
          const newContacts = contacts.map(item => item.id !== response.data.id? item:response.data);
          setContacts(newContacts);
          setShownContacts(filterContacts(newContacts, searchText));
          return response;
        })
      .then( response => {
        const message = `${response.data.name} modified in contact list`;
        showNotification(message, false);
        return response;
      })
      .catch( error => {
        console.error(error.response.data.message);
        showNotification(error.response.data.message, true);
      });
    }
  
  }

  const deleteContact = (contact) => {
    if (window.confirm(`Delete ${contact.name}?`)) { 
      console.log(contact);

      contactsService.del(contact.id)
      .then( (response) => 
        {
          if (response.status === 200){
            contactsService.getAll()
            .then(response => {
              setContacts(response.data);
              setShownContacts(filterContacts(response.data, searchText));
              const message = `${contact.name} deleted from contact list`;
              showNotification(message, false);
            })
          } else {
            const message = `Could not delete ${contact.name} from contact list, it may have already been deleted.`;
            showNotification(message, true);
          }
        })
      .catch( error => {
        const message = `Could not delete ${contact.name} from contact list, it may have already been deleted. ${error.message} `;
        showNotification(message, true);
      });
     
    }
  }

  return (
    <div>
      <Notification notification={notification}/>
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