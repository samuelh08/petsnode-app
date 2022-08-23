import { Card, CardActionArea, CardMedia, Grid } from '@mui/material';
import React from 'react';
import adopt from '../public/adopt.jpg';
import publish from '../public/publish.jpg';

export default function Home() {
  return (
    <>
      <Grid container spacing={4} margin={4} justifyContent="center">
        <Grid item>
          <Card>
            <CardActionArea href="/pets">
              <CardMedia
                style={{ height: '500px' }}
                component="img"
                image={adopt.src}
                title="Adopt"
                alt="Adopt"
              />
            </CardActionArea>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <CardActionArea href="/rehome">
              <CardMedia
                style={{ height: '500px' }}
                component="img"
                image={publish.src}
                title="Publish"
                alt="Publish"
              />
            </CardActionArea>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
