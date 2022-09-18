import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import PetsIcon from '@mui/icons-material/Pets';
import Swal from 'sweetalert2';

import { logIn } from '../../api/users';
import UserContext from '../../context/user';

export default function Login() {
  const context = useContext(UserContext);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(event) {
    event.preventDefault();
    const { email, password } = event.target.elements;
    setLoading(true);
    try {
      const json = await logIn({
        email: email.value,
        password: password.value,
      });
      context.setUser(json.data);
      Swal.fire({
        title: 'Success!',
        text: 'Log in successful',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      router.push('/');
    } catch (error) {
      setError(error);
      Swal.fire({
        title: 'Error!',
        text: 'Log in failed',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}

      <Paper elevation={10} sx={{ margin: '100px auto', maxWidth: '330px' }}>
        <Grid container flexDirection="column" alignItems="center">
          <Grid item>
            <Grid container justifyContent="center" padding="20px">
              <Grid item marginRight={1}>
                <PetsIcon />
              </Grid>
              <Grid item>
                <Typography variant="h5">PetsNode</Typography>
              </Grid>
            </Grid>
          </Grid>
          <Grid item>
            <Typography variant="body">Log in to your account</Typography>
          </Grid>
          <Grid item>
            <Grid
              container
              component="form"
              onSubmit={handleSubmit}
              flexDirection="column"
              alignItems="center"
              padding="20px"
              spacing={2}
            >
              <Grid item>
                <FormControl>
                  <InputLabel htmlFor="email">Email address</InputLabel>
                  <Input id="email" />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl>
                  <InputLabel htmlFor="password">Password</InputLabel>
                  <Input type="password" id="password" />
                </FormControl>
              </Grid>
              <Grid item>
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={loading}
                >
                  Login
                </LoadingButton>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
