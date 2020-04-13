
import React from 'react'
import Grid from '@material-ui/core/Grid'
import { TextValidator } from 'react-material-ui-form-validator'
import NumberSelector from '../NumberSelector'
import SelectFile from '../SelectFile'

export default function EditContest ({
  uuid, name, setName,
  description, setDescription,
  img, setImg,
  contestants, setContestants,}) {

  return(
    <Grid container spacing={4}>
      <Grid item xs={12}>
        <TextValidator
          fullWidth
          name="contest-name"
          variant="outlined"
          required
          id="contest-name"
          label="Contest Name"
          autoFocus
          onChange={(event)=>{setName(event.target.value)}}
          value={name}
          validators={['required','isString']}
          errorMessages={['Name field is required','Invalid Contest Name']}
        />
      </Grid>
      <Grid item xs={12}>
        <TextValidator
          fullWidth
          multiline
          name="contest-description"
          variant="outlined"
          required
          id="contest-description"
          label="Contest Description"
          autoFocus
          onChange={(event)=>{setDescription(event.target.value)}}
          value={description}
          validators={['required','isString']}
          errorMessages={['Name field is required','Invalid Description Name']}
        />
      </Grid>
      <Grid item xs={8}>
        <TextValidator
          fullWidth
          name="contest-img"
          variant="outlined"
          required
          id="contest-img"
          label="Contest Image"
          autoFocus
          onChange={(event)=>{setImg(event.target.value)}}
          value={img}
        />
      </Grid>
      <Grid item xs={4}>
        <SelectFile setImg={setImg} uuid={uuid}/>
      </Grid>
      <NumberSelector title='Number of contestants:' max={10} value={contestants} setValue={setContestants} />
    </Grid>       
  )
}