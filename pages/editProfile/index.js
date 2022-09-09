import React, { useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
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

import UserContext from '../../context/user';
import adopt from '../../public/adopt.jpg';
import { updateUser } from '../../api/users';

export default function EditProfile() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userFirstname, setUserFirstname] = useState('');
  const [userLastname, setUserLastname] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhone, setUserPhone] = useState('');
  const [userAddress, setUserAddress] = useState('');
  const [type, setType] = useState('');
  const [userDocument, setUserDocument] = useState('');
  const router = useRouter();

  useEffect(() => {
    setType(user?.documentType.toUpperCase());
    setUserFirstname(user?.firstname);
    setUserLastname(user?.lastname);
    setUserEmail(user?.email);
    setUserPhone(user?.phone);
    setUserAddress(user?.address);
    setUserDocument(user?.document);
  }, [user]);

  const documentTypes = ['CC', 'CE'];
  const handleChange = (event, setfunction) => {
    setfunction(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const payload = event.target.elements;
    setLoading(true);
    try {
      const json = await updateUser(user._id, {
        firstname: payload.firstname.value,
        lastname: payload.lastname.value,
        email: payload.email.value,
        phone: payload.phone.value,
        address: payload.address.value,
        documentType: payload.documentType.value,
        document: payload.document.value,
      });
      setUser(json.data);
      router.push('/profile');
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
            EditProfile
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
                <OutlinedInput
                  id="firstname"
                  label="First name"
                  value={userFirstname}
                  onChange={function (event) {
                    handleChange(event, setUserFirstname);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="lastname">{'Last name'}</InputLabel>
                <OutlinedInput
                  id="lastname"
                  label="Last name"
                  value={userLastname}
                  onChange={function (event) {
                    handleChange(event, setUserLastname);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="email">{'Email'}</InputLabel>
                <OutlinedInput
                  id="email"
                  label="Email"
                  value={userEmail}
                  onChange={function (event) {
                    handleChange(event, setUserEmail);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="phone">{'Phone number'}</InputLabel>
                <OutlinedInput
                  id="phone"
                  label="Phone number"
                  value={userPhone}
                  onChange={function (event) {
                    handleChange(event, setUserPhone);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth>
                <InputLabel htmlFor="address">{'Address'}</InputLabel>
                <OutlinedInput
                  id="address"
                  label="Address"
                  value={userAddress}
                  onChange={function (event) {
                    handleChange(event, setUserAddress);
                  }}
                />
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
                  value={type}
                  onChange={function (event) {
                    handleChange(event, setType);
                  }}
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
                  label="Document number"
                  value={userDocument}
                  onChange={function (event) {
                    handleChange(event, setUserDocument);
                  }}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <LoadingButton
                variant="contained"
                type="submit"
                loading={loading}
              >
                Edit
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
