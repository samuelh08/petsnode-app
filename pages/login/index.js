import React, { useContext, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  Box,
  Button,
  FormControl,
  Input,
  InputLabel,
  Paper,
} from '@mui/material';

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
      context.setUser(json);
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
      <Box maxWidth="330px" margin="0 auto">
        <Paper elevation={10}>
          <Box
            component="form"
            onSubmit={handleSubmit}
            display="flex"
            flexDirection="column"
            padding="20px"
            marginTop="30px"
          >
            <FormControl>
              <InputLabel htmlFor="email">Email address</InputLabel>
              <Input id="email" />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input type="password" id="password" />
            </FormControl>
            <Button variant="contained" type="submit" loading={loading}>
              Login
            </Button>
          </Box>
        </Paper>
      </Box>
    </>
  );
}
