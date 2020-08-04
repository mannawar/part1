import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>

const Vote = (props) => {
  console.log(props);
  return (
    <div>
      {props.anecdote} <br/>
      has &nbsp;
      {props.vote} votes 
    </div>
  );
};

const HighestVoted = (props) => {
  return (
    <div>
      <h2>Anecdote with Maximum votes</h2>
      {(<Vote anecdote={props.anecdote} vote={props.vote} />)}
    </div>

  )
}

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Array(props.anecdotes.length).fill(0))

//getting random Index
  const getRandomIndex = (length) => {
  return Math.floor(Math.random() * length)
}

  //Selecting random anecdotes
  const setRandomAnecdote = () => {
    let randomAnecdoteIndex
    do{
      randomAnecdoteIndex = getRandomIndex(props.anecdotes.length);
    }
    while (randomAnecdoteIndex === selected);
    setSelected(randomAnecdoteIndex)
    
  }

  //event handler function
  const increment = () => {
    const freshVote = [...vote]
    freshVote[selected] += 1;
    setVote(freshVote);
  }

  const handleClick = (type) => {

    switch(type){
      case "first":
        setRandomAnecdote()
        break;
      case "second":
        increment()
        break;
      default:
        break;
    }

  }
  
  const maxValue = vote.reduce(
    (acc, curr, idx) => {
      if (curr > acc.curr) {
        acc.curr = curr;
        acc.idx = idx;
      }

      return acc;
    },
    { curr: 0 }
  );
  const maxVoted = anecdotes[maxValue.idx]
  

  return (
    <div>
      <h2>Anecdote of the day</h2>
      <Vote anecdote={anecdotes[selected]} vote={vote[selected]}/> <br />
      <Button onClick={() => handleClick("second")}text="vote" />
      <Button onClick={() => handleClick("first")}text="next anecdote" />
      <HighestVoted anecdote={maxVoted} vote={maxValue.curr} />
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)