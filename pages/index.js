import React from 'react';
import Carousel from 'react-material-ui-carousel';
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material';
import HouseIcon from '@mui/icons-material/House';
import PetsIcon from '@mui/icons-material/Pets';

import banner from '../public/banner.jpg';
import Image from 'next/image';

export default function Home({ data }) {
  return (
    <>
      <div
        style={{
          position: 'relative',
          height: '50vh',
          width: '100vw',
          overflow: 'hidden',
          zIndex: 0,
          borderBottom: 'solid 8px #E4AD50',
        }}
      >
        <Image
          src={banner}
          alt="banner"
          layout="fill"
          objectFit="cover"
          quality={100}
        />
        <Typography
          variant="h2"
          position="absolute"
          color="#3B4950"
          margin={5}
          style={{ WebkitTextStroke: '2px #e2dfe0' }}
        >
          <strong>Welcome to PetsNode!</strong>
        </Typography>
      </div>
      <Grid container alignItems="center" justifyContent="space-around">
        <Grid item>
          <Grid container flexDirection="column">
            <Grid item alignSelf="center">
              <Typography variant="h3" marginY={1} color="#3B4950">
                Featured Pets
              </Typography>
            </Grid>
            <Grid item alignSelf="center">
              <Carousel
                animation="slide"
                sx={{ height: 450, width: 400, marginBottom: 4 }}
              >
                {data.map((item, i) => (
                  <Card key={i} sx={{ height: 400, width: 400 }}>
                    <CardActionArea href={`/pets/${item._id}`}>
                      <CardMedia
                        component="img"
                        image={item.picture}
                        alt={item.name}
                        sx={{
                          position: 'absolute',
                          top: 0,
                          right: 0,
                        }}
                      />
                      <CardContent
                        sx={{
                          position: 'relative',

                          backgroundColor: 'transparent',
                        }}
                      >
                        <Typography
                          gutterBottom
                          variant="h5"
                          component="h2"
                          color="white"
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" component="p" color="white">
                          {item?.sex} • {item?.age} • {item?.size}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                ))}
              </Carousel>
            </Grid>
          </Grid>
        </Grid>

        <Grid item>
          <Grid
            container
            spacing={4}
            flexDirection="column"
            justifyContent="center"
          >
            <Grid item>
              <Typography
                variant="h3"
                textAlign="center"
                justifySelf="center"
                color="#3B4950"
              >
                What do you want to do?
              </Typography>
            </Grid>
            <Grid item>
              <Card
                sx={{
                  backgroundColor: '#1976d2',
                  marginX: 5,
                }}
              >
                <CardActionArea
                  href="/pets"
                  sx={{
                    display: 'flex',
                  }}
                >
                  <CardMedia>
                    <PetsIcon
                      sx={{ color: 'white', marginLeft: 1 }}
                      fontSize="large"
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography
                      variant="h4"
                      textAlign="center"
                      justifySelf="center"
                      color="white"
                    >
                      Adopt a pet
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
            <Grid item>
              <Card
                sx={{
                  backgroundColor: '#1976d2',
                  marginX: 5,
                  marginBottom: 5,
                }}
              >
                <CardActionArea
                  href="/createPet"
                  sx={{
                    display: 'flex',
                  }}
                >
                  <CardMedia>
                    <HouseIcon
                      sx={{ color: 'white', marginLeft: 1 }}
                      fontSize="large"
                    />
                  </CardMedia>
                  <CardContent>
                    <Typography
                      variant="h4"
                      textAlign="center"
                      justifySelf="center"
                      color="white"
                    >
                      Rehome a pet
                    </Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export async function getServerSideProps() {
  const pets = await fetch(
    `${process.env.NEXT_PUBLIC_REACT_APP_API_URL}/pets`,
    {
      method: 'GET',
    },
  );
  const data = await pets.json();
  return {
    props: {
      data: data.data,
      meta: data.meta,
    },
  };
}
