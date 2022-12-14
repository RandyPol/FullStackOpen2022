import { useState } from 'react'


const Display = (props) => <tr><td>{props.text}</td><td>{props.value}</td></tr>

const Button =  (props) => (
<button onClick={() => props.handleClick()}>{props.text}</button>
)

const StatisticLine = (props) =>{
  if(props.text === "positive"){
    return <tr><td>{props.text}</td><td>{props.value}%</td></tr>
  }
  return <tr><td>{props.text}</td><td>{props.value}</td></tr>
}

const Statistics = (props) => {
  const {goodValue,neutralValue, badValue, allFeedback, avgFeedback, avgPosFeedback } = props.value
  if(allFeedback){
return(
<table>
<tbody>
  <Display text="good" value={goodValue}/>
  <Display text="Neutral" value={neutralValue}/>
  <Display text="Bad" value={badValue}/>
  <StatisticLine text="all" value={allFeedback}/>
  <StatisticLine text="average" value={avgFeedback ?avgFeedback: 0 }/>
  <StatisticLine text="positive" value={(avgPosFeedback ?avgPosFeedback: 0) * 100 }/>
  </tbody>
</table>
)}
return <div>No feedback given</div>
}

const App = () => {
  const [goodValue, setGoodValue] = useState(0)
  const [neutralValue, setNeutralValue] = useState(0)
  const [badValue, setBadValue] = useState(0)
  const allFeedback = goodValue + neutralValue + badValue;

const valueObj = {
  goodValue: goodValue,
  neutralValue: neutralValue,
  badValue: badValue,
 allFeedback: goodValue + neutralValue + badValue,
avgFeedback: (goodValue - badValue)/allFeedback,
  avgPosFeedback: goodValue/allFeedback,
}


  const setToGoodValue = (newValue) => {
    console.log('Good value now', newValue)
    setGoodValue(newValue)
  }
  const seTotNeutralValue = (newValue) => {
    console.log('Neutral value now', newValue)
    setNeutralValue(newValue)
  }
  const setTBaddValue = (newValue) => {
    console.log('Bad value now', newValue)
    setBadValue(newValue)
  }

  return (
    <div>
      <h2>Give Feedback</h2>
      <Button handleClick={() => setToGoodValue(goodValue + 1)} text="Good" />
      <Button handleClick={() => seTotNeutralValue(neutralValue + 1)} text="Neutral"/>
      <Button handleClick={() => setTBaddValue(badValue + 1)} text="Bad" />
      <h2>Statistics</h2>
<Statistics value={valueObj}/>
    </div>
  )
}

export default App