import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import {
  Alert,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import Swal from 'sweetalert2';

import publish from '../../../public/publish.jpg';
import { updatePet } from '../../../api/pets';

export default function EditPet({ data }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [petName, setPetName] = useState(data.name);
  const [petBreed, setPetBreed] = useState(data.breed);
  const [petAnimal, setPetAnimal] = useState(data.animal);
  const [petSex, setPetSex] = useState(
    data.sex.charAt(0).toUpperCase() + data.sex.slice(1),
  );
  const [petSize, setPetSize] = useState(
    data.size.charAt(0).toUpperCase() + data.size.slice(1),
  );
  const [petAge, setPetAge] = useState(
    data.age.charAt(0).toUpperCase() + data.age.slice(1),
  );
  const [petDescription, setPetDescription] = useState(data.description);
  const [petColor, setPetColor] = useState(data.color);
  const [petTrained, setPetTrained] = useState(data.trained);
  const [petVaccinated, setPetVaccinated] = useState(data.vaccinated);
  const [petSterilized, setPetSterilized] = useState(data.sterilized);
  const router = useRouter();

  const animals = ['Dog', 'Cat', 'Other'];
  const sexes = ['Male', 'Female', 'Unknown'];
  const dogSizes = ['Mini', 'Small', 'Medium', 'Big', 'Giant'];
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
  const ages = ['Baby', 'Young', 'Adult', 'Senior'];
  const dogAges = ['Puppy', 'Young', 'Adult', 'Senior'];
  const catAges = ['Kitten', 'Young', 'Adult', 'Senior'];

  const handleChange = (event, setfunction) => {
    setfunction(event.target.value);
  };

  const handleChangeCheck = (event, setFunction) => {
    setFunction(event.target.checked);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    const payload = event.target.elements;
    setLoading(true);
    try {
      await updatePet(data._id, {
        name: payload.name.value,
        breed: payload.breed.value,
        animal: payload.animal.value,
        sex: payload.sex.value,
        age: payload.age.value,
        size: payload.size.value,
        color: payload.color.value,
        vaccinated: payload.vaccinated.value,
        sterilized: payload.sterilized.value,
        trained: payload.trained.value,
        description: payload.description.value,
      });
      Swal.fire({
        title: 'Success!',
        text: 'Pet was updated successfully',
        icon: 'success',
        confirmButtonText: 'Ok',
      });
      router.push(`/pets/${data._id}`);
    } catch (error) {
      setError(error);
      Swal.fire({
        title: 'Error!',
        text: 'An error occurred while updating the pet',
        icon: 'error',
        confirmButtonText: 'Ok',
      });
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
            Edit pet
          </Typography>
          <Grid
            container
            component="form"
            onSubmit={handleSubmit}
            direction="column"
            padding="10px"
            spacing={3}
          >
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="name">{"Pet's name"}</InputLabel>
                <OutlinedInput
                  id="name"
                  label="Pet's name"
                  onChange={function (event) {
                    handleChange(event, setPetName);
                  }}
                  value={petName}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel id="animal-label">Animal</InputLabel>
                <Select
                  labelId="animal-label"
                  name="animal"
                  id="animal"
                  label="Animal"
                  onChange={function (event) {
                    handleChange(event, setPetAnimal);
                  }}
                  value={petAnimal}
                >
                  {animals.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="breed">Breed</InputLabel>
                <OutlinedInput
                  id="breed"
                  label="Breed"
                  onChange={function (event) {
                    handleChange(event, setPetBreed);
                  }}
                  value={petBreed}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="sex">Sex</InputLabel>
                <Select
                  name="sex"
                  id="sex"
                  label="sex"
                  onChange={function (event) {
                    handleChange(event, setPetSex);
                  }}
                  value={petSex}
                >
                  {sexes.map((option) => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="age">Age</InputLabel>
                <Select
                  name="age"
                  id="age"
                  label="age"
                  onChange={function (event) {
                    handleChange(event, setPetAge);
                  }}
                  value={petAge}
                >
                  {petAnimal === 'Dog' &&
                    dogAges.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  {petAnimal === 'Cat' &&
                    catAges.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  {petAnimal === 'Other' &&
                    ages.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="size">Size</InputLabel>
                <Select
                  name="size"
                  id="size"
                  label="size"
                  onChange={function (event) {
                    handleChange(event, setPetSize);
                  }}
                  value={petSize}
                >
                  {petAnimal === 'Dog'
                    ? dogSizes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))
                    : sizes.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="color">Color</InputLabel>
                <OutlinedInput
                  id="color"
                  label="Color"
                  onChange={function (event) {
                    handleChange(event, setPetColor);
                  }}
                  value={petColor}
                />
              </FormControl>
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox name="vaccinated" checked={petVaccinated} />}
                label="Vaccinated"
                onChange={function (event) {
                  handleChangeCheck(event, setPetVaccinated);
                }}
                value={petVaccinated}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox name="sterilized" checked={petSterilized} />}
                label="Spayed / Neutered"
                onChange={function (event) {
                  handleChangeCheck(event, setPetSterilized);
                }}
                value={petSterilized}
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                control={<Checkbox name="trained" checked={petTrained} />}
                label="Trained"
                onChange={function (event) {
                  handleChangeCheck(event, setPetTrained);
                }}
                value={petTrained}
              />
            </Grid>
            <Grid item>
              <FormControl fullWidth sx={{ paddingRight: 10 }}>
                <InputLabel htmlFor="description">Description</InputLabel>
                <OutlinedInput
                  id="description"
                  multiline={true}
                  rows={3}
                  label="description"
                  onChange={function (event) {
                    handleChange(event, setPetDescription);
                  }}
                  value={petDescription}
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
        <Grid item xs={0} sm={6} position="relative">
          <Image src={publish} alt="publish" layout="fill" objectFit="cover" />
        </Grid>
      </Grid>
    </>
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
