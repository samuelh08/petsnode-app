import {
  Alert,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import React, { useContext, useState } from 'react';
import { createPet } from '../../api/pets';
import UserContext from '../../context/user';

export default function CreatePet() {
  const [formAnimal, setFormAnimal] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { user } = useContext(UserContext);

  const handleChangeAnimal = (event) => {
    setFormAnimal(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const {
      name,
      animal,
      breed,
      sex,
      age,
      size,
      color,
      vaccinated,
      sterilized,
      trained,
      description,
      picture,
    } = event.target.elements;

    const formData = new FormData();

    formData.append('name', name.value);
    formData.append('animal', animal.value);
    formData.append('breed', breed.value);
    formData.append('sex', sex.value);
    formData.append('age', age.value);
    formData.append('size', size.value);
    formData.append('color', color.value);
    formData.append('vaccinated', vaccinated.checked);
    formData.append('sterilized', sterilized.checked);
    formData.append('trained', trained.checked);
    formData.append('description', description.value);
    formData.append('picture', picture.files[0]);

    try {
      setLoading(true);
      await createPet(`/users/${user?._id}/pets`, formData);
      setLoading(false);
      router.push('/');
    } catch (error) {
      setError(error);
    }
  };

  const animals = ['Dog', 'Cat', 'Other'];
  const sexes = ['Male', 'Female', 'Unknown'];
  const dogSizes = ['Mini', 'Small', 'Medium', 'Big', 'Giant'];
  const sizes = ['Small', 'Medium', 'Large', 'Extra Large'];
  const ages = ['Baby', 'Young', 'Adult', 'Senior'];
  const dogAges = ['Puppy', 'Young', 'Adult', 'Senior'];
  const catAges = ['Kitten', 'Young', 'Adult', 'Senior'];
  return (
    <>
      {error && <Alert severity="error">{error}</Alert>}
      <Typography variant="h2" margin="10px">
        Rehome a pet
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
            <InputLabel htmlFor="name">{"Pet's name"}</InputLabel>
            <Input id="name" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel id="animal-label">Animal</InputLabel>
            <Select
              labelId="animal-label"
              name="animal"
              id="animal"
              label="Animal"
              onChange={handleChangeAnimal}
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
          <FormControl fullWidth>
            <InputLabel htmlFor="breed">Breed</InputLabel>
            <Input id="breed" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="sex">Sex</InputLabel>
            <Select name="sex" id="sex" label="sex">
              {sexes.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="age">Age</InputLabel>
            <Select name="age" id="age" label="age">
              {formAnimal === 'Dog' &&
                dogAges.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              {formAnimal === 'Cat' &&
                catAges.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              {formAnimal === 'Other' &&
                ages.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="size">Size</InputLabel>
            <Select name="size" id="size" label="size">
              {formAnimal === 'Dog'
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
          <FormControl fullWidth>
            <InputLabel htmlFor="color">Color</InputLabel>
            <Input id="color" />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox name="vaccinated" />}
            label="Vaccinated"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox name="sterilized" />}
            label="Spayed / Neutered"
          />
        </Grid>
        <Grid item>
          <FormControlLabel
            control={<Checkbox name="trained" />}
            label="Trained"
          />
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="description">Description</InputLabel>
            <Input id="description" multiline={true} rows={3} />
          </FormControl>
        </Grid>
        <Grid item>
          <FormControl fullWidth>
            <InputLabel htmlFor="picture">Picture</InputLabel>
            <Input
              id="picture"
              type="file"
              label="picture"
              accept="image/jpeg"
            />
          </FormControl>
        </Grid>
        <Grid item>
          <Button variant="contained" type="submit" loading={loading}>
            Create
          </Button>
        </Grid>
      </Grid>
    </>
  );
}
