import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => 
  <h1>{text}</h1>

const Button = ({name, handleClick}) => 
  <button onClick ={handleClick}>{name}</button>;

const Statistic = ({name, value}) => 
<p>{name + ': ' + value}</p>;




const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const addGood = () => setGood(good + 1);
  const addNeutral = () => setNeutral(neutral + 1);
  const addBad = () => setBad(bad + 1);


  return (
    <div>
      <Header text="give feedback"/>
      <Button name="good" handleClick={addGood}/>
      <Button name="neutral" handleClick={addNeutral}/>
      <Button name="bad" handleClick={addBad}/>

      <Header text="statistics"/>
      <Statistic name="good" value={good}/>
      <Statistic name="neutral" value={neutral}/>
      <Statistic name="bad" value={bad}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)