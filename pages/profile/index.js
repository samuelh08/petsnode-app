import React, { useContext } from 'react';
import useSWR from 'swr';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Typography,
} from '@mui/material';

import { getPets } from '../../api/pets';
import UserContext from '../../context/user';

export default function Profile() {
  const { user } = useContext(UserContext);
  const { data, error } = useSWR(`/users/${user?._id}/pets`, getPets);

  if (!data) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card sx={{ marginTop: 5, marginLeft: 5 }}>
            <CardContent>
              <Grid container alignContent="center" flexDirection="column">
                <Grid item>
                  <Typography gutterBottom variant="h4" component="div">
                    {user.name}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body">
                    {user.documentType} {user.document}
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body">Email: {user.email}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body">Phone: {user.phone}</Typography>
                </Grid>
                <Grid item>
                  <Typography variant="body">
                    Address: {user.address}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
            <CardActions>
              <Grid container alignContent="center" flexDirection="column">
                <Grid item>
                  <Button>Edit</Button>
                </Grid>
                <Grid item>
                  <Button color="error">Delete</Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h3" marginTop={5} marginX={5} align="center">
            My pets for adoption
          </Typography>
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignContent: 'flex-start',
            }}
          >
            {data.data.map((item) => (
              <Card key={item._id} sx={{ maxWidth: 200, margin: 5 }}>
                <CardActionArea href={`/pets/${item._id}`}>
                  <CardMedia
                    component="img"
                    image={item.picture}
                    alt={item.name}
                  />
                  <CardContent>
                    <Typography variant="h5" textAlign="center">
                      {item.name}
                    </Typography>
                    <Typography variant="body" textAlign="center">
                      Applications: {item.applicationsCount}
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            ))}
          </Box>
        </Grid>
      </Grid>
    </>
  );
}
