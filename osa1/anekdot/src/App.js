import { useState } from "react";




const Highest = ({points, anecdotes}) => {
  let n = points.length;
  let highest = -Infinity;
  let maxIndex = 0;

  // Using for loop to go through elements in array to find highest number and index of it. 
for(let i = 0; i < n; i++) {
if (points[i] > highest) {
  highest = points[i];
  maxIndex = i;
}
}
  return (
  <>
  {
  //Assingning index to array
}
  <p>{anecdotes[maxIndex]}</p>
  </>
  )

  }
  






const App = () => {
  const anecdotes = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.",
    "The only way to go fast, is to go well.",
  ];

  // formating array 
  const n = 9;
  const x = Array(n).fill(0);

  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState(x);
  const [previousX, setPrevious] = useState(-1);
   
  console.log(points);

  //Copying last points array and assign it new value
  const handleClick1 = () => {
  const copy = [...points];
  copy[selected] += 1;
  setPoints(copy);
  }


   /*Randomise number when button is clicked and using do while loop to check that the next
   one is not a same number than it was last time.
   Then assign it to selected*/
  const handleClick = () => {
    let x;

    do {
      x = Math.floor(Math.random() * 8);
    } while (x === previousX);

    setSelected(x);
    setPrevious(x);
    console.log(previousX, "previous");
    console.log(x, "x");
  };

 
  return (
    <div>
      <h2>Anecdote of the day</h2>
      {anecdotes[selected]}
      <br />
      <button onClick={handleClick}>next anecdote</button>
      <button onClick={handleClick1}>vote</button>
      <h2>Anecdote with most votes</h2>
      <Highest points={points} anecdotes={anecdotes}/>

    </div>
  );
};

export default App;
