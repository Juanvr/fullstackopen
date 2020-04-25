
import React from 'react';

const SearchBox = ({onChange}) => {

  return(
    <div>
      <span>Find countries: </span>
      <input type="text" id="lname" name="lname" onChange={onChange}></input>
    </div>
  )
}

export default SearchBox;