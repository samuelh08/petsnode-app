import React, { useState } from 'react';
import { useRouter } from 'next/router';
import {
  Alert,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

import adopt from '../../public/adopt.jpg';
import { Signup } from '../../api/users';
import Image from 'next/image';

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
      <Grid container>
        <Grid item xs={6}>
          <Typography variant="h2" marginTop="20px" marginX="40px">
            Signup
          </Typography>
          <Grid
            container
            component="form"
            onSubmit={handleSubmit}
            direction="column"
            spacing={3}
            padding="10px"
          >
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="firstname">{'First name'}</InputLabel>
                <OutlinedInput id="firstname" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="lastname">{'Last name'}</InputLabel>
                <OutlinedInput id="lastname" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">{'Email'}</InputLabel>
                <OutlinedInput id="email" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="password">{'Password'}</InputLabel>
                <OutlinedInput type="password" id="password" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="phone">{'Phone number'}</InputLabel>
                <OutlinedInput id="phone" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="address">{'Address'}</InputLabel>
                <OutlinedInput id="address" />
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
                <OutlinedInput
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
                type="submit"
                loading={loading}
              >
                Sign Up
              </LoadingButton>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={6} position="relative">
          <Image src={adopt} alt="adopt" layout="fill" objectFit="cover" />
        </Grid>
      </Grid>
    </>
  );
}
