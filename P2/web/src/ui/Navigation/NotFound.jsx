
import React from 'react';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


export default function NotFound() {

  return (
    <Container maxWidth="sm">
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        404
      </Typography>
      <Typography component="h1" variant="h2" align="center" color="textPrimary" gutterBottom>
        Content not Found
      </Typography>
    </Container>
  );
}