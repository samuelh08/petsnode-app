import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import useSWR, { mutate } from 'swr';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  Chip,
  CircularProgress,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  OutlinedInput,
  Select,
  Stack,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';

import UserContext from '../../../context/user';
import { createApplication, getApplications } from '../../../api/applications';
import { deletePet } from '../../../api/pets';
import { createReply, updateReply } from '../../../api/replies';

export default function Pet({ data }) {
  const { user } = useContext(UserContext);
  const { data: applications, error: errorApplications } = useSWR(
    `/pets/${data._id}/applications`,
    getApplications,
  );
  const router = useRouter();
  const [applicationId, setApplicationId] = useState('');
  const [replyId, setReplyId] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const [openBackground, setOpenBackground] = useState(false);
  const [openReply, setOpenReply] = useState(false);
  const [openEditReply, setOpenEditReply] = useState(false);
  const handleOpen = (setFunction) => setFunction(true);
  const handleClose = (setFunction) => setFunction(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const payload = event.target.elements;
    setLoading(true);
    try {
      await createApplication(
        `users/${user._id}/pets/${data._id}/applications`,
        { message: payload.message.value },
      );
      Swal.fire({
        title: 'Success!',
        text: 'Application created successful',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      setError(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while creating an application',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  const handleSubmitReply = async (event) => {
    event.preventDefault();
    setError(null);
    const payload = event.target.elements;
    setLoading(true);
    try {
      await createReply(
        `users/${user._id}/applications/${applicationId}/replies`,
        { message: payload.message.value, answer: payload.answer.value },
      );
      mutate(`/pets/${data._id}/applications`);
      Swal.fire({
        title: 'Success!',
        text: 'Application created successful',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      console.log(error);
      setError(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while creating a reply',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setOpenReply(false);
      setLoading(false);
    }
  };

  const handleEditReply = async (event) => {
    event.preventDefault();
    setError(null);
    const payload = event.target.elements;
    setLoading(true);
    try {
      await updateReply(replyId, {
        message: payload.message.value,
        answer: payload.answer.value,
      });
      mutate(`/pets/${data._id}/applications`);
      Swal.fire({
        title: 'Success!',
        text: 'Reply edited successful',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
    } catch (error) {
      setError(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while editing the reply',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setOpenEditReply(false);
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setError(null);
    setLoading(true);
    try {
      await deletePet(data._id);
      Swal.fire({
        title: 'Success!',
        text: 'Pet deleted successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      router.push('/pets');
    } catch (error) {
      setError(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while deleting the pet',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Grid container flexDirection="column">
        <Grid item>
          <Card sx={{ display: 'flex', margin: 5, flexWrap: 'wrap' }}>
            <CardMedia
              component="img"
              sx={{ maxWidth: 500 }}
              image={data.picture}
              alt={data.name}
            />
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography component="div" variant="h3">
                  {data.name}
                </Typography>
                <Typography
                  variant="subtitle1"
                  color="text.secondary"
                  component="div"
                >
                  {data.userId.name}
                </Typography>
                <Typography variant="subtitle1" component="div">
                  {data.breed}
                </Typography>
                <Typography component="div">
                  {data.age} • {data.sex} • {data.size} • {data.color}
                </Typography>
                <FormControlLabel
                  disabled
                  control={<Checkbox checked={data.vaccinated} />}
                  label="Vaccinated"
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox checked={data.sterilized} />}
                  label="Spayed / Neutered"
                />
                <FormControlLabel
                  disabled
                  control={<Checkbox checked={data.trained} />}
                  label="Trained"
                />
                <Typography component="div" variant="h4">
                  About
                </Typography>
                <Typography component="div">{data.description}</Typography>
              </CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                <CardActions>
                  {data.userId._id !== user?._id ? (
                    <Button
                      onClick={function () {
                        handleOpen(setOpen);
                      }}
                    >
                      Apply for adoption
                    </Button>
                  ) : (
                    <div>
                      <Button href={`/editPet/${data._id}`}>Edit</Button>
                      <LoadingButton
                        color="error"
                        loading={loading}
                        onClick={() =>
                          Swal.fire({
                            title: 'Are you sure?',
                            text: "Deleting a pet can't be reverted",
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
                      </LoadingButton>
                    </div>
                  )}
                </CardActions>
              </Box>
            </Box>
          </Card>
        </Grid>
        {data.userId._id === user?._id && (
          <Grid item marginX={5}>
            <Typography variant="h3" color="#3B4950">
              Applications
            </Typography>
          </Grid>
        )}
        {!applications ? (
          <CircularProgress color="inherit" />
        ) : !applications.meta.total && data.userId._id === user?._id ? (
          <Typography
            variant="body"
            component="div"
            marginY={5}
            marginX={5}
            align="center"
          >
            {"This pet doesn't have any applications for adoption"}
          </Typography>
        ) : (
          <Grid item>
            {data.userId._id === user?._id &&
              applications.data.map((item) => (
                <Card
                  key={item._id}
                  sx={{ display: 'flex', flexDirection: 'column', margin: 5 }}
                >
                  <CardContent>
                    <Typography variant="h5">{item.userId.name}</Typography>
                    <Typography variant="body">{item.message}</Typography>
                    <Stack direction="row" spacing={1}>
                      <Typography variant="h5">Reply</Typography>
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
                    <Button
                      onClick={function () {
                        handleOpen(setOpenBackground);
                      }}
                    >
                      Check background
                    </Button>
                    {item?.reply ? (
                      <Button
                        onClick={function () {
                          setReplyId(item.reply[0]._id);
                          handleOpen(setOpenEditReply);
                        }}
                      >
                        Edit Reply
                      </Button>
                    ) : (
                      <Button
                        onClick={function () {
                          setApplicationId(item._id);
                          handleOpen(setOpenReply);
                        }}
                      >
                        Reply
                      </Button>
                    )}
                  </CardActions>
                </Card>
              ))}
          </Grid>
        )}
      </Grid>
      <Modal
        open={open}
        onClose={function () {
          handleClose(setOpen);
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmit}
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
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Application
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Leave a message to the pet keeper
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
            Apply
          </LoadingButton>
        </Box>
      </Modal>
      <Modal
        open={openBackground}
        onClose={function () {
          handleClose(setOpenBackground);
        }}
        aria-labelledby="background-modal-title"
        aria-describedby="background-modal-description"
      >
        <Box
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
          <Typography id="background-modal-title" variant="h6" component="h2">
            Background check
          </Typography>
          <Typography id="background-modal-description" sx={{ my: 2 }}>
            This user has no pending issues with the judicial authorities
          </Typography>
        </Box>
      </Modal>
      <Modal
        open={openReply}
        onClose={function () {
          setApplicationId('');
          handleClose(setOpenReply);
        }}
        aria-labelledby="reply-modal-title"
        aria-describedby="reply-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleSubmitReply}
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
            Reply
          </Typography>
          <Typography id="reply-modal-description" sx={{ mt: 2 }}>
            Reply to this applicant request
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="answer">Answer</InputLabel>
            <Select labelId="answer" name="answer" id="answer" label="Answer">
              <MenuItem key="Accepted" value="Accepted">
                Accepted
              </MenuItem>
              <MenuItem key="Denied" value="Denied">
                Denied
              </MenuItem>
            </Select>
          </FormControl>
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
            Reply
          </LoadingButton>
        </Box>
      </Modal>
      <Modal
        open={openEditReply}
        onClose={function () {
          setReplyId('');
          handleClose(setOpenEditReply);
        }}
        aria-labelledby="reply-modal-title"
        aria-describedby="reply-modal-description"
      >
        <Box
          component="form"
          onSubmit={handleEditReply}
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
            Edit Reply
          </Typography>
          <Typography id="reply-modal-description" sx={{ mt: 2 }}>
            Edit the Reply to this applicant request
          </Typography>
          <FormControl fullWidth sx={{ mt: 2 }}>
            <InputLabel htmlFor="answer">Answer</InputLabel>
            <Select labelId="answer" name="answer" id="answer" label="Answer">
              <MenuItem key="Accepted" value="Accepted">
                Accepted
              </MenuItem>
              <MenuItem key="Denied" value="Denied">
                Denied
              </MenuItem>
            </Select>
          </FormControl>
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

export async function getServerSideProps({ params }) {
  const pet = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/pets/${params.petId}`,
    {
      method: 'GET',
    },
  );
  const data = await pet.json();
  return {
    props: {
      data: data.data,
    },
  };
}
