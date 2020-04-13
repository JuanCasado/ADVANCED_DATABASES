
import React from 'react'
import NumberSelector from './NumberSelector'


export default function PointList ({callbackPoints, contestants, maxPoints = 100}) {

  const [points, setPoints] = React.useState([...Array(contestants.length).keys()].map(()=>{return 0}))
  const [pointsLeft, setPointsLeft] = React.useState(maxPoints)

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
    }
  }
  React.useEffect(()=>{
    callbackPoints(points)
  },[callbackPoints, points])

  return (
    <div>
      {'Points left to assign: ' + pointsLeft}
        {contestants.map((contestant, index)=>(
          <div key={index}>
            Name:{contestant.name}
            <NumberSelector title='Points:' value={points[index]} setValue={(value)=>updatePoints(index, value)} max={20} />
          </div>
        ))}
    </div>
  )
}