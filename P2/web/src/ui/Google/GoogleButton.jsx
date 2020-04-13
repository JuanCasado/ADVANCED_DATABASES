
import React from 'react';
import Button from '@material-ui/core/Button';
import { FaGoogle } from 'react-icons/fa';

export default function GoogleButton ({text, action}) {
  return (
    <Button
      fullWidth
      variant="contained"
      color="default"
      startIcon={<FaGoogle />}
      onClick={action}
    >
      {text}
    </Button>
  )
}