import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';
import Head from 'next/head';
import useSWR from 'swr';

import { getPets } from '../../api/pets';

export default function Pets() {
  const { data, error } = useSWR('/pets', getPets);

  if (!data) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <>
      <Head>
        <title>PetsNode</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Grid container spacing={4} margin={4}>
          {data?.data.map((item) => (
            <Grid item key={item._id}>
              <Card key={item._id}>
                <CardMedia component="img" alt={item.name} />
                <CardContent>
                  <Typography variant="h5">{item.name}</Typography>
                  <Typography>{item.description}</Typography>
                </CardContent>
                <CardActions>
                  <Button size="small" href={`/pets/${item._id}`}>
                    Apply to adopt
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </main>

      <footer></footer>
    </>
  );
}
