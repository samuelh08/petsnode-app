import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  Paper,
  Typography,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

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
      router.push('/');
    } catch (error) {
      setError(error);
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
                <Button variant="contained" type="submit" loading={loading}>
                  Login
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
}
