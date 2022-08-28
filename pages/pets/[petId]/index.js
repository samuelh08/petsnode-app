import React, { useContext } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Checkbox,
  FormControlLabel,
  Typography,
} from '@mui/material';
import UserContext from '../../../context/user';

export default function Pet({ data }) {
  const { user } = useContext(UserContext);
  return (
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
              <Button>Apply for adoption</Button>
            ) : (
              <div>
                <Button>Edit</Button>
                <Button color="error">Delete</Button>
              </div>
            )}
          </CardActions>
        </Box>
      </Box>
    </Card>
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
