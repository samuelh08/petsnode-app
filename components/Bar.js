import React from 'react';
import { AppBar, Box, Container, Toolbar, Typography } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import BarUser from './BarUser';

export default function appBar() {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <PetsIcon />
          <Typography>PetsNode</Typography>
          <BarUser />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
