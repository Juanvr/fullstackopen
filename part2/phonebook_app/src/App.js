import React, { useState } from 'react'

const Numbers = ({persons})=>
  <div>
    {persons.map(person => <div key={person.name}>{person.name}</div>)}
  </div>
;

const App = () => {
  const [ persons, setPersons] = useState([
    { name: 'Arto Hellas' }
  ]) 
  const [ newName, setNewName ] = useState('')

  const setNameFromInput = event => setNewName(event.target.value);

  const addName = event => {
    event.preventDefault();

    if (persons.map(a => a.name).indexOf(newName) > -1){
      alert(`${newName} is already added to phonebook`);
    }else{
      setPersons(persons.concat({name:newName}));
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addName}>
        <div>
          name: <input onChange={setNameFromInput}/>
        </div>
        <div>
          <button type="submit" >add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <Numbers persons = {persons}/>
    </div>
  )
}

export default App