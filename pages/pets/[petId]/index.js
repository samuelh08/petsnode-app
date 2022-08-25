import React from 'react';
import { Container, Typography } from '@mui/material';

export default function Pet({ data }) {
  return (
    <Container>
      <Typography variant="h2">{data.name}</Typography>
    </Container>
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
