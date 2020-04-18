import React, { useState } from 'react'

const Search = ({searchFunction}) =>
<div>
    Search: <input onChange={searchFunction}></input>
</div>

export default Search;