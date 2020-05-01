import React from 'react'

const NewContact = ({onSubmitFunction, onChangeNameFunction, onChangePhoneFunction}) =>
<form onSubmit={onSubmitFunction}>
<div>
  name: <input onChange={onChangeNameFunction}/>
  <br/>
  phone: <input onChange={onChangePhoneFunction}/>
</div>
<div>
  <button type="submit" >add</button>
</div>
</form>

export default NewContact;