import { useState } from "react";

const StatisticsLine = ({ text, value }) => {
  return (
    <>
      <table>
        <tbody>
          <tr>
            <th>
              {text} {value}
            </th>
          </tr>
        </tbody>
      </table>
    </>
  );
};

/*Conditional rendering if feedback is give object is turned to two dimensional array with key - value
pairs. These pairs are then given to StatisticsLine that will render them.*/
const Statistics = ({ stats }) => {
  const { good, neutral, bad, all, average, positive } = stats;
  if (all === 0) {
    return (
      <>
        <p>No feedback given</p>
      </>
    );
  }

  return (
    <>
      {Object.entries(stats).map(([key, value]) => (
        <StatisticsLine key={key} text={key} value={value} />
      ))}
    </>
  );
};

//Destruct props and gives handleclick function feedbackType that users clicks
const Button = ({ feedbackType, handleClick }) => {
  return (
    <>
      <button onClick={() => handleClick(feedbackType)}>{feedbackType}</button>
    </>
  );
};

const App = () => {
  // Initializing state with object
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
    all: 0,
    average: 0,
    positive: 0,
  });

  /*Updates the feedback state based on the previous state using the callback approach.
  Calculates the new average and positive values.*/
  const handleClick = (feedbackType) => {
    setFeedback((prevFeedback) => {
      const updatedFeedback = {
        ...prevFeedback,
        [feedbackType]: prevFeedback[feedbackType] + 1,
        all: prevFeedback.all + 1,
      };

      updatedFeedback.average =
        (updatedFeedback.good - updatedFeedback.bad) / updatedFeedback.all;
      updatedFeedback.positive =
        (updatedFeedback.good / updatedFeedback.all) * 100;

      return updatedFeedback;
    });
  };

  return (
    <div>
      <h2>Give feedback</h2>
      <Button feedbackType="good" handleClick={handleClick} />
      <Button feedbackType="neutral" handleClick={handleClick} />
      <Button feedbackType="bad" handleClick={handleClick} />
      <h2>statistics</h2>

      <Statistics stats={feedback} />
    </div>
  );
};

export default App;
