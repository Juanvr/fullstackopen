import React, { useState } from 'react'

const Contact = ({contact}) =>
<div>Name: {contact.name} Phone: {contact.phone}</div>;

const Contacts = ({contacts})=>
  <div>
    {contacts.map(contact => <Contact key={contact.name} contact = {contact}/>)}
  </div>
;

export default Contacts;