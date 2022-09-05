import React from 'react';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Grid,
  Link,
  MobileStepper,
  Paper,
  Typography,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SwipeableViews from 'react-swipeable-views';
import { autoPlay } from 'react-swipeable-views-utils';

import { KeyboardArrowLeft, KeyboardArrowRight } from '@mui/icons-material';

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

export default function Home({ data, meta }) {
  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);
  const maxSteps = meta.total;

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  return (
    <>
      <Grid container alignItems="center" justifyContent="space-around">
        <Grid item>
          <Grid container flexDirection="column">
            <Grid item alignSelf="center">
              <Typography variant="h3" marginTop={1}>
                Featured Pets
              </Typography>
            </Grid>
            <Grid item alignSelf="center">
              <Box sx={{ maxWidth: 400, flexGrow: 1 }}>
                <Paper
                  square
                  elevation={0}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    height: 50,
                    pl: 2,
                    bgcolor: 'background.default',
                  }}
                >
                  <Typography variant="h5">{data[activeStep].name}</Typography>
                </Paper>
                <AutoPlaySwipeableViews
                  axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                  index={activeStep}
                  onChangeIndex={handleStepChange}
                  enableMouseEvents
                >
                  {data.map((step, index) => (
                    <div key={step._id}>
                      {Math.abs(activeStep - index) <= 2 ? (
                        <Link href={`/pets/${step._id}`}>
                          <Box
                            component="img"
                            sx={{
                              maxHeight: 400,
                              display: 'block',
                              maxWidth: 400,
                              overflow: 'hidden',
                              width: '100%',
                            }}
                            src={step.picture}
                            alt={step.name}
                          />
                        </Link>
                      ) : null}
                    </div>
                  ))}
                </AutoPlaySwipeableViews>
                <MobileStepper
                  steps={maxSteps}
                  position="static"
                  activeStep={activeStep}
                  nextButton={
                    <Button
                      size="small"
                      onClick={handleNext}
                      disabled={activeStep === maxSteps - 1}
                    >
                      Next
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowLeft />
                      ) : (
                        <KeyboardArrowRight />
                      )}
                    </Button>
                  }
                  backButton={
                    <Button
                      size="small"
                      onClick={handleBack}
                      disabled={activeStep === 0}
                    >
                      {theme.direction === 'rtl' ? (
                        <KeyboardArrowRight />
                      ) : (
                        <KeyboardArrowLeft />
                      )}
                      Back
                    </Button>
                  }
                />
              </Box>
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
              <Card
                sx={{
                  backgroundColor: 'slateBlue',
                }}
              >
                <CardActionArea href="/pets">
                  <CardContent>
                    <Typography
                      variant="h3"
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
                  backgroundColor: 'slateBlue',
                }}
              >
                <CardActionArea href="/createPet">
                  <CardContent>
                    <Typography
                      variant="h3"
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
