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

  const sum = data => data.reduce((a,b) => a + b, 0);
  const average = (good, neutral, bad) => 
  {
    const calc = (good - bad) / (good + bad + neutral);
    const result = calc ? calc : 0;
    return result;
  }

  const pctgPositive = (good, data) => 
  {
    const calc = good/sum(data) * 100;
    const result = calc ? calc : 0;
    return result;
  }

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
      <Statistic name="all" value={sum([good, neutral, bad])}/>
      <Statistic name="average" value={average(good, neutral, bad)}/>
      <Statistic name="positive" value={pctgPositive(good, [good, neutral, bad]) + " %"}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)