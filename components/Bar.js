import React from 'react';
import { AppBar, Box, Container, Link, Toolbar } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import BarUser from './BarUser';

export default function appBar() {
  return (
    <AppBar position="sticky" color="secondary">
      <Container>
        <Toolbar>
          <Box display="flex" flexGrow={1}>
            <PetsIcon />
            <Link href="/" color="inherit" underline="none">
              PetsNode
            </Link>
          </Box>
          <BarUser />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
