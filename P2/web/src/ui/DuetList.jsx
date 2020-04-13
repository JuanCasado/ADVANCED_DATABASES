
import React from 'react'
import NumberSelector from './NumberSelector'
import DuetSelector from './DuetSelector'

const createArray = (numberOfDuets, fillValue) => {
  let array = []
  for (let i = 0; i < numberOfDuets; ++i){
    array.push(fillValue)
  }
  return array
}

const mixDuets = (duets, points) => {
  return duets
  .filter((duet)=>{return duet[0]!=='' && duet[1]!==''})
  .map((duet, index)=>{ return {
    type: 'duet',
    contestants: duet,
    points: points[index],
  }})
}

export default function DuetList ({callbackDuets, contestants, numberOfDuets, maxPoints = 100}) {  
  const [points, setPoints] = React.useState(createArray(numberOfDuets, 0))
  const [duets, setDuets] = React.useState(createArray(numberOfDuets, ['','']))
  const [pointsLeft, setPointsLeft] = React.useState(maxPoints)
  
  React.useEffect(()=>{
    const emptyPoints = createArray(numberOfDuets, 0)
    setPoints(emptyPoints)
  },[numberOfDuets, setPoints])
  React.useEffect(()=>{
    const emptyDuets = createArray(numberOfDuets, ['',''])
    setDuets(emptyDuets)
  },[numberOfDuets, setDuets])

  const updatePoints = (number, _points) => {
    let accPoints = 0
    let newPoints = [...points]
    newPoints[number] = _points
    newPoints.forEach((value)=>{
      accPoints+=value
    })
    let _pointsLeft = maxPoints - accPoints
    if (_pointsLeft>=0) {
      setPoints(newPoints)
      setPointsLeft(_pointsLeft)
      callbackDuets(mixDuets(duets,points))
    }
  }

  const updateDuet = (number, _duet) => {
    let newDuets = [...duets]
    newDuets[number] = _duet
    setDuets(newDuets)
    callbackDuets(mixDuets(duets,points))
  }

  return (
    <div>
      {'Points left to assign: ' + pointsLeft}
      {points.map((point, index)=>(
        <div key={index}>
          <DuetSelector setDuet={(duet)=>{updateDuet(index, duet)}} contestants={contestants}/>
          <NumberSelector title='Points:' value={point} setValue={(value)=>updatePoints(index, value)} max={20} />
        </div>
      ))}
    </div>
  )
}