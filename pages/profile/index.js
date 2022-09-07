import React, { useContext, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

import UserContext from '../../context/user';
import { getPets } from '../../api/pets';
import { getApplications, deleteApplication } from '../../api/applications';
import { LoadingButton } from '@mui/lab';

export default function Profile() {
  const { user } = useContext(UserContext);
  const { data: pets, error: errorPets } = useSWR(
    `/users/${user?._id}/pets`,
    getPets,
  );
  const { data: applications, error: errorApplications } = useSWR(
    `/users/${user?._id}/applications`,
    getApplications,
  );
  const { mutate } = useSWRConfig();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleDeleteApplication = async (id) => {
    setLoading(true);
    try {
      await deleteApplication(id);
      mutate(`/users/${user?._id}/applications`);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  if (!pets || !applications) {
    return <CircularProgress color="inherit" />;
  }

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {errorPets && <Alert severity="error">{errorPets}</Alert>}
      {errorApplications && <Alert severity="error">{errorApplications}</Alert>}
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
        <Grid item xs={8} display="flex" flexDirection="column">
          <Typography variant="h3" marginTop={5} marginX={5} align="center">
            My pets for adoption
          </Typography>
          {!pets.meta.total && (
            <Typography
              variant="body"
              component="div"
              marginTop={5}
              marginX={5}
              align="center"
            >
              {"You don't have any pets for adoption"}
            </Typography>
          )}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-around',
              alignContent: 'flex-start',
            }}
          >
            {pets.data.map((item) => (
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
          <Button href="/createPet" sx={{ marginTop: 5, alignSelf: 'center' }}>
            Rehome a pet
          </Button>
          <Typography variant="h3" marginY={5} marginX={5} align="center">
            My applications
          </Typography>
          <Grid container flexDirection="column">
            {!applications.meta.total && (
              <Typography
                variant="body"
                component="div"
                marginY={5}
                marginX={5}
                align="center"
              >
                {"You don't have any applications"}
              </Typography>
            )}
            {applications.data.map((item) => (
              <Card
                key={item._id}
                sx={{
                  maxHeight: 200,
                  marginX: 5,
                  marginBottom: 5,
                  display: 'flex',
                }}
              >
                <CardMedia
                  component="img"
                  image={item.petId.picture}
                  alt={item.petId.name}
                  sx={{ maxWidth: 200 }}
                />
                <CardContent sx={{ flex: '1 0 auto', width: 'min-content' }}>
                  <Typography component="div" variant="h5">
                    {item.petId.name}
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    component="div"
                  >
                    {item.message}
                  </Typography>
                  <Stack direction="row" spacing={1}>
                    <Typography component="div" variant="h5">
                      Reply
                    </Typography>
                    <Chip
                      label={item.reply[0]?.answer ?? 'Pending'}
                      color={
                        (item.reply[0]?.answer === 'Accepted' && 'success') ||
                        (item.reply[0]?.answer === 'Denied' && 'error') ||
                        'default'
                      }
                    />
                  </Stack>
                  <Typography variant="body">
                    {item.reply[0]?.message}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Grid container flexDirection="column">
                    <Grid item>
                      <Button>Edit</Button>
                    </Grid>
                    <Grid item>
                      <LoadingButton
                        color="error"
                        onClick={function () {
                          handleDeleteApplication(item._id);
                        }}
                        loading={loading}
                      >
                        Delete
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </CardActions>
              </Card>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}
