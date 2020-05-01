import React from 'react'

const Contact = ({contact, deleteContact}) =>
<tr>
    <td> {contact.name} </td>
    <td> {contact.phone} </td>
    <td><button onClick={() => deleteContact(contact)}>Delete contact</button></td>
</tr>;

const Contacts = ({contacts, deleteContact})=>
  <table>
    <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {contacts.map(contact => <Contact key={contact.name} contact = {contact} deleteContact={deleteContact}/>)}
    </tbody>
  </table>
;

export default Contacts;