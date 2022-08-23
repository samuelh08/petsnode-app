import React from 'react';
import { AppBar, Container, Toolbar, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

export default function appBar() {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <PetsIcon />
          <Typography>PetsNode</Typography>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
