import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  FormControl,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { Signup } from '../../api/users';

export default function SignUp() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [type, setType] = useState('');
  const router = useRouter();

  const documentTypes = ['CC', 'CE'];
  const handleChange = (event) => {
    setType(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const payload = event.target.elements;
    setLoading(true);
    try {
      await Signup({
        firstname: payload.firstname.value,
        lastname: payload.lastname.value,
        email: payload.email.value,
        password: payload.password.value,
        phone: payload.phone.value,
        address: payload.address.value,
        documentType: payload.documentType.value,
        document: payload.document.value,
      });
      router.push('/login');
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h2" margin="10px">
        Signup
      </Typography>
      <Grid
        container
        component="form"
        onSubmit={handleSubmit}
        direction="column"
        margin="10px"
        spacing={3}
        xs={6}
      >
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="firstname">{'First name'}</InputLabel>
            <Input id="firstname" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="lastname">{'Last name'}</InputLabel>
            <Input id="lastname" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="email">{'Email'}</InputLabel>
            <Input id="email" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="password">{'Password'}</InputLabel>
            <Input type="password" id="password" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="phone">{'Phone number'}</InputLabel>
            <Input id="phone" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="address">{'Address'}</InputLabel>
            <Input id="address" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="documentType-label">Document type</InputLabel>
            <Select
              labelId="documentType-label"
              name="documentType"
              id="documentType"
              label="Document type"
              onChange={handleChange}
            >
              {documentTypes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="document">{'Document number'}</InputLabel>
            <Input
              startAdornment={
                <InputAdornment position="start">{type}</InputAdornment>
              }
              id="document"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <LoadingButton
            variant="contained"
            color="secondary"
            type="submit"
            loading={loading}
          >
            Sign Up
          </LoadingButton>
        </Grid>
      </Grid>
    </>
  );
}
