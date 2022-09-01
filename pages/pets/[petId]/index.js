import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  FormControl,
  FormControlLabel,
  InputLabel,
  Modal,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import UserContext from '../../../context/user';
import { createApplication } from '../../../api/applications';
import { deletePet } from '../../../api/pets';

export default function Pet({ data }) {
  const { user } = useContext(UserContext);
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = event.target.elements;
    setLoading(true);
    try {
      await createApplication(
        `users/${user._id}/pets/${data._id}/applications`,
        { message: payload.message.value },
      );
      setOpen(false);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      await deletePet(data._id);
      router.push('/pets');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Card sx={{ display: 'flex', margin: 5 }}>
        <CardMedia
          component="img"
          sx={{ width: 500 }}
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
                <Button onClick={handleOpen}>Apply for adoption</Button>
              ) : (
                <div>
                  <Button>Edit</Button>
                  <LoadingButton
                    color="error"
                    loading={loading}
                    onClick={handleDelete}
                  >
                    Delete
                  </LoadingButton>
                </div>
              )}
            </CardActions>
          </Box>
        </Box>
      </Card>

      <Modal
        open={open}
        onClose={handleClose}
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
          <FormControl fullWidth>
            <InputLabel htmlFor="message">Message</InputLabel>
            <OutlinedInput
              id="message"
              label="message"
              multiline={true}
              rows={3}
            />
          </FormControl>
          <LoadingButton variant="contained" type="submit" loading={loading}>
            Apply
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
