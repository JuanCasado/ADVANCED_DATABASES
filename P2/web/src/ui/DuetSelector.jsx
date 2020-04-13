
import React from 'react'
import Grid from '@material-ui/core/Grid'
import FormControl from '@material-ui/core/FormControl'
import InputLabel from '@material-ui/core/InputLabel'
import Select from '@material-ui/core/Select'
import MenuItem from '@material-ui/core/MenuItem'

export default function DuetSelector ({contestants, setDuet}) {
  const [leftContestant, setLeftContestant] = React.useState('')
  const [rightContestant, setRightContestant] = React.useState('')
 
  const handleEventLeft = (event) => {
    const value = event.target.value
    const contestant = contestants.filter((contestant)=>{return contestant.name === value})[0]
    setLeftContestant(contestant)
    setDuet([contestant, rightContestant])
  }
  const handleEventRight = (event) => {
    const value = event.target.value
    const contestant = contestants.filter((contestant)=>{return contestant.name === value})[0]
    setRightContestant(contestant)
    setDuet([leftContestant, contestant])
  }

  return (
    <Grid container spacing={4}>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Contestant 1: {leftContestant.name}</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={leftContestant.name?leftContestant.name:''}
            onChange={(event) => {handleEventLeft(event)}}
          >
            {contestants.map((contestant, index)=>(
              contestant.name!==rightContestant.name? <MenuItem value={contestant.name} key={index}>{contestant.name}</MenuItem> : null
            ))}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label">Contestant 2: {rightContestant.name}</InputLabel>
          <Select
            fullWidth
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={rightContestant.name?rightContestant.name:''}
            onChange={(event) => {handleEventRight(event)}}
          >
            {contestants.map((contestant, index)=>(
              contestant.name!==leftContestant.name? <MenuItem value={contestant.name} key={index}>{contestant.name}</MenuItem> : null
            ))}
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )
}