
import React from 'react'
import Button from '@material-ui/core/Button'
import { uploadFile } from './Firebase'

export default function SelectFile ({setImg=null, uuid=null}) {

  const selectFile = (event) => {
    if (event.target.files.length > 0) {
      uploadFile(event.target.files[0], setImg, uuid)
    }
  }

  return(
    <Button
      variant="contained"
      component="label"
    >
      SELECT FILE
      <input type="file" onChange={selectFile} style={{ display: "none" }}/>
    </Button>
  )
}