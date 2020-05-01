import React from 'react'

const NewContact = ({onSubmitFunction, onChangeNameFunction, onChangePhoneFunction}) =>
<form onSubmit={onSubmitFunction}>
<table>
  <tbody>
    <tr>
      <td>Name:</td>
      <td><input onChange={onChangeNameFunction}/></td>
    </tr>
    <tr>
      <td>Phone:</td>
      <td><input onChange={onChangePhoneFunction}/></td>
    </tr>
  </tbody>
</table>
<div>
  <button type="submit" >add</button>
</div>
</form>

export default NewContact;