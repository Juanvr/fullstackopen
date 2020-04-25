import React from 'react';

const Countries = ({countries, searchByText}) =>
{
  return (
    <div>
      {
      countries.map(
        (item) => 
        <div key={item.name}>
            {item.name} 
            <button onClick={() => searchByText(item.name)}>Show</button>
        </div>
        )
      }
    </div>
  );
}

export default Countries;