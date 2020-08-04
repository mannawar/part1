
import React, { useState } from "react";
import ReactDOM from "react-dom";


const Heading = (props) => <h1>{props.text}</h1>;

const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Statistic = (props) => {
  return (
    <div>
      {props.name} &nbsp;
      {props.value} <hr/>
    </div>
  );
};

const Statistics = (props) => {
  if (!props.hasFeedback) {
    return <p>No feedback given</p>;
  }

  return (
    <div>
      <Heading text="Statistics" />
          <Statistic name="good" value={props.good} />

          <Statistic name="neutral" value={props.neutral} />

          <Statistic name="bad" value={props.bad} />

          <Statistic name="total" value={props.total} />

          <Statistic name="average" value={props.averageScore} />

          <Statistic
            name="positive"
            value={props.positivePercent + "%"}
          />
    </div>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [hasFeedback, setHasFeedback] = useState(false);

  const total = good + neutral + bad;

  const positivePercent = (good, total) => {
    let result = (good/total) * 100;

    if (Number.isNaN(result)) return 0;

    return Math.round(result * 100) / 100;
  };

  const averageScore = (good, bad, total) => {
    let result = ((good) -(bad))/total;
    if (Number.isNaN(result)) return 0;

    return (result);
  }

  const handleButtonClick = (type) => {
    console.log(type)
    setHasFeedback(true);

    switch (type) {
      case "first":
        setGood(good + 1);
        break;
      case "second":
        setNeutral(neutral + 1);
        break;
      case "third":
        setBad(bad + 1);
        break;
      default:
        break;
    }
  };

  const statisticsProps = {
    hasFeedback: hasFeedback,
    good: good,
    neutral: neutral,
    bad: bad,
    total: total,
    averageScore: averageScore(good, bad, total),
    positivePercent: positivePercent(good, total),
  };

  return (
    <div>
      <Heading text="Give Feedback" />
      <Button onClick={() => handleButtonClick("first")} text="good" />
      <Button onClick={() => handleButtonClick("second")} text="neutral" />
      <Button onClick={() => handleButtonClick("third")} text="bad" />
      <Statistics {...statisticsProps} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
