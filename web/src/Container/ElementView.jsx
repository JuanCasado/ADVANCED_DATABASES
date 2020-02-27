
import React from 'react'

import Container from '@material-ui/core/Container'
import Holder from './Holder'

export default function  ElementView (props) {
  const update = props.update
  const [content, setContent] = React.useState([])
  React.useEffect(()=>{
    update().then(newContent => setContent(newContent))
  },[update])

  return (
    <Container>
      <h3>{props.name}</h3>
      <Holder content={content}/>
    </Container>
  )
}
