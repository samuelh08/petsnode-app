import React, { useContext, useState } from 'react';
import useSWR, { useSWRConfig } from 'swr';
import { useRouter } from 'next/router';
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
  FormControl,
  Grid,
  InputLabel,
  Modal,
  OutlinedInput,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';

import UserContext from '../../context/user';
import { getPets } from '../../api/pets';
import {
  getApplications,
  deleteApplication,
  updateApplication,
} from '../../api/applications';
import { deleteUser } from '../../api/users';

export default function Profile() {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { user } = useContext(UserContext);
  const [pagePets, setPagePets] = useState(1);
  const [pageApplications, setPageApplications] = useState(1);
  const { data: pets, error: errorPets } = useSWR(
    `/users/${user?._id}/pets?limit=8&page=${pagePets}`,
    getPets,
  );
  const { data: applications, error: errorApplications } = useSWR(
    `/users/${user?._id}/applications?page=${pageApplications}`,
    getApplications,
  );

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const [applicationId, setApplicationId] = useState('');
  const [open, setOpen] = useState(false);

  const handleOpen = (setFunction) => setFunction(true);
  const handleClose = (setFunction) => setFunction(false);

  const handleChangePagePets = (event, value) => {
    setPagePets(value);
  };

  const handleChangePageApplications = (event, value) => {
    setPageApplications(value);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deleteUser(user._id);
      Swal.fire({
        title: 'Success!',
        text: 'User deleted successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      router.push('/logout');
    } catch (error) {
      setError(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while deleting the user',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleEditApplication = async (event) => {
    event.preventDefault();
    setError(null);
    const payload = event.target.elements;
    setLoading(true);
    try {
      await updateApplication(applicationId, {
        message: payload.message.value,
      });
      mutate(`/users/${user?._id}/applications?page=${pageApplications}`);
      Swal.fire({
        title: 'Success!',
        text: 'Application edited successful',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      setError(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while editing the application',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const handleDeleteApplication = async (id) => {
    setLoading(true);
    try {
      await deleteApplication(id);
      mutate(`/users/${user?._id}/applications?page=${pageApplications}`);
      Swal.fire({
        title: 'Success!',
        text: 'Application deleted successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      setError(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while deleting the application',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };

  if (!user) {
    return <CircularProgress color="inherit" sx={{ margin: '0 auto' }} />;
  }

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      {errorPets && <Alert severity="error">{errorPets}</Alert>}
      {errorApplications && <Alert severity="error">{errorApplications}</Alert>}
      <Grid container spacing={2} flexDirection="column">
        <Grid item alignSelf="center">
          <Card sx={{ marginTop: 5, marginX: 5 }}>
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
                  <Button href="/editProfile">Edit</Button>
                </Grid>
                <Grid item>
                  <Button
                    color="error"
                    onClick={() =>
                      Swal.fire({
                        title: 'Are you sure?',
                        text: 'User will be lost forever if deleted',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#1976d2',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Delete',
                      }).then((result) => {
                        if (result.isConfirmed) {
                          handleDelete();
                        }
                      })
                    }
                  >
                    Delete
                  </Button>
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Grid>
        <Grid item display="flex" flexDirection="column">
          <Typography
            variant="h3"
            marginTop={5}
            marginX={5}
            align="center"
            color="#3B4950"
          >
            My pets for adoption
          </Typography>
          {pets?.meta.total === 0 && (
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
            {!pets && <CircularProgress color="inherit" sx={{ margin: 5 }} />}
            {pets?.data.map((item) => (
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
          {pets?.meta.pages > 1 && (
            <Pagination
              count={pets.meta.pages}
              page={pagePets}
              onChange={handleChangePagePets}
              sx={{ alignSelf: 'center' }}
            />
          )}
          <Button href="/createPet" sx={{ marginTop: 5, alignSelf: 'center' }}>
            Rehome a pet
          </Button>
          <Typography
            variant="h3"
            marginY={5}
            marginX={5}
            align="center"
            color="#3B4950"
          >
            My applications
          </Typography>
          <Grid container flexDirection="column">
            {applications?.meta.total === 0 && (
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
            {!applications && (
              <CircularProgress color="inherit" sx={{ margin: 5 }} />
            )}
            <Grid container justifyContent="space-around">
              {applications?.data.map((item) => (
                <Grid item key={item._id}>
                  <Card
                    key={item._id}
                    sx={{
                      marginX: 5,
                      marginBottom: 5,
                      display: 'flex',
                      flexDirection: 'column',
                      maxWidth: 200,
                    }}
                  >
                    <CardMedia
                      component="img"
                      image={item.petId.picture}
                      alt={item.petId.name}
                      sx={{ maxWidth: 200, maxHeight: 200 }}
                    />
                    <CardContent
                      sx={{ flex: '1 0 auto', width: 'min-content' }}
                    >
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
                            (item.reply[0]?.answer === 'Accepted' &&
                              'success') ||
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
                      <Grid container justifyContent="space-evenly">
                        <Grid item>
                          <Button
                            onClick={function () {
                              setApplicationId(item._id);
                              handleOpen(setOpen);
                            }}
                          >
                            Edit
                          </Button>
                        </Grid>
                        <Grid item>
                          <LoadingButton
                            color="error"
                            onClick={() =>
                              Swal.fire({
                                title: 'Are you sure?',
                                text: "Deleting an application can't be reverted",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#1976d2',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Delete',
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleDeleteApplication(item._id);
                                }
                              })
                            }
                            loading={loading}
                          >
                            Delete
                          </LoadingButton>
                        </Grid>
                      </Grid>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
            </Grid>
            {applications?.meta.pages > 1 && (
              <Pagination
                count={applications.meta.pages}
                page={pageApplications}
                onChange={handleChangePageApplications}
                sx={{ alignSelf: 'center' }}
              />
            )}
            <Button href="/pets" sx={{ marginBottom: 5, alignSelf: 'center' }}>
              Adopt a pet
            </Button>
          </Grid>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={function () {
          setApplicationId('');
          handleClose(setOpen);
        }}
        aria-labelledby="reply-modal-title"
        aria-describedby="reply-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleEditApplication}
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 400,
            bgcolor: 'background.paper',
            border: '2px solid #000',
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="reply-modal-title" variant="h6" component="h2">
            Edit Application
          </Typography>
          <Typography id="reply-modal-description" sx={{ mt: 2 }}>
            Edit the message of your application
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="message">Message</InputLabel>
            <OutlinedInput
              id="message"
              label="message"
              multiline={true}
              rows={3}
            />
          </FormControl>
          <LoadingButton
            variant="contained"
            type="submit"
            loading={loading}
            sx={{ mt: 2 }}
          >
            Edit
          </LoadingButton>
        </Box>
      </Modal>
    </>
  );
}
