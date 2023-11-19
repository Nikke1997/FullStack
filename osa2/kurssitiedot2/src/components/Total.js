import React from 'react'

const Total = ({ course }) => {


//Using reduce method to sum up the exercises
const all = course.reduce((acc, cur) => acc + cur.exercises , 0);

  return (
    <div>
    <h3>Total of {all} exercises</h3>  
    </div>
  )
}

export default Total
