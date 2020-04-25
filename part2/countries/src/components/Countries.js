import React from 'react';

const Countries = ({countries}) =>
{
  return (
    <div>
      {
      countries.map(
        (item) => 
        <div key={item.name}>{item.name}</div>
        )
      }
    </div>
  );
}

export default Countries;