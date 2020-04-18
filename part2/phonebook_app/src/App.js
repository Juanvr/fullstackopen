import React, { useState } from 'react'

const Contacts = ({contacts})=>
  <div>
    {contacts.map(contact => <div key={contact.name}>Name: {contact.name} Phone: {contact.phone}</div>)}
  </div>
;

const App = () => {
  const [ contacts, setContacts] = useState([
    { name: 'Arto Hellas',
      phone: '838383833'
     
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [ newPhone, setNewPhone ] = useState('')

  const setNameFromInput = event => setNewName(event.target.value);
  const setPhoneFromInput = event => setNewPhone(event.target.value);

  const addName = event => {
    event.preventDefault();

    if (contacts.map(a => a.name).indexOf(newName) > -1){
      alert(`${newName} is already added to phonebook`);
    }else{
      setContacts(contacts.concat({name:newName, phone: newPhone}));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={setNameFromInput}/>
          <br/>
          phone: <input onChange={setPhoneFromInput}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Contacts contacts = {contacts}/>
    </div>
  )
}

export default App