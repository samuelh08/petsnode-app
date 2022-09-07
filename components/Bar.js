import React from 'react';
import { AppBar, Container, Grid, Link, Toolbar } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import BarUser from './BarUser';

export default function appBar() {
  return (
    <AppBar position="sticky">
      <Container>
        <Toolbar>
          <Grid
            container
            justifyContent="start"
            alignItems="center"
            alignContent="center"
          >
            <Grid item marginRight={1}>
              <PetsIcon />
            </Grid>
            <Grid item>
              <Link href="/" color="inherit" underline="none">
                PetsNode
              </Link>
            </Grid>
          </Grid>
          <BarUser />
        </Toolbar>
      </Container>
    </AppBar>
  );
}
