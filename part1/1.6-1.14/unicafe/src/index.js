import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = ({text}) => 
  <h1>{text}</h1>

const Button = ({name, handleClick}) => 
  <button onClick ={handleClick}>{name}</button>;

const Statistic = ({name, value}) => 
<tr>
  <td>{name}</td>
  <td>{value}</td>
</tr>;

const Statistics = ({good, neutral, bad}) => 
{
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

  if (good + neutral + bad > 0){
    return (
      <table>
        <tbody>
          <Statistic name="good" value={good}/>
          <Statistic name="neutral" value={neutral}/>
          <Statistic name="bad" value={bad}/>
          <Statistic name="all" value={sum([good, neutral, bad])}/>
          <Statistic name="average" value={average(good, neutral, bad)}/>
          <Statistic name="positive" value={pctgPositive(good, [good, neutral, bad]) + " %"}/>
        </tbody>
      </table>

    )
  }else {
    return <span>No feedback given</span>
  }
}

const Anecdote = ({anecdote, votes}) => 
  <div>
    <span>{anecdote}</span>
    <br/>
    <span>- {votes} votes -</span>
  </div>;


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

  const initialPoints = [...anecdotes].map((a) => 0);

  const randomNumber = () => Math.round(Math.random() * anecdotes.length);
  
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const [selected, setSelected] = useState(randomNumber);
  const [points, setPoints] = useState(initialPoints);

  const nextSelected = () => setSelected((selected + 1) % anecdotes.length); 
  const voteAnecdote = () => {
    const newPoints = [...points];
    newPoints[selected]++;
    setPoints(newPoints);
  }

  const getMaxPointsIndex = (points) => points.reduce((acc,current,index,array) => current > array[acc]? index: acc,0);

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
      <Statistics good={good} neutral={neutral} bad={bad} />

      <br/>
      <br/>
      <br/>
      <Header text="Anecdote of the day"/>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]}/>
      <br/>

      <Button name="next anecdote" handleClick={nextSelected}/>
      <Button name="vote" handleClick={voteAnecdote}/>

      <Header text="Anecdote with most votes"/>
      <Anecdote anecdote={anecdotes[getMaxPointsIndex(points)]} votes={points[getMaxPointsIndex(points)]}/>





    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)