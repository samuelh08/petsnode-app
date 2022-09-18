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
import { signup } from '../../api/users';
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
    setError(null);
    const payload = event.target.elements;
    setLoading(true);
    try {
      await signup({
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
        <Grid item xs={12} sm={6}>
          <Typography variant="h2" margin="10px" color="#3B4950">
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
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="firstname">{'First name'}</InputLabel>
                <OutlinedInput id="firstname" label="First name" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="lastname">{'Last name'}</InputLabel>
                <OutlinedInput id="lastname" label="Last name" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="email">{'Email'}</InputLabel>
                <OutlinedInput id="email" label="Email" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="password">{'Password'}</InputLabel>
                <OutlinedInput type="password" id="password" label="Password" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="phone">{'Phone number'}</InputLabel>
                <OutlinedInput id="phone" label="Phone number" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="address">{'Address'}</InputLabel>
                <OutlinedInput id="address" label="Address" />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
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
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="document">{'Document number'}</InputLabel>
                <OutlinedInput
                  startAdornment={
                    <InputAdornment position="start">{type}</InputAdornment>
                  }
                  id="document"
                  label="Document number"
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
        <Grid item xs={0} sm={6} position="relative">
          <Image src={adopt} alt="adopt" layout="fill" objectFit="cover" />
        </Grid>
      </Grid>
    </>
  );
}
