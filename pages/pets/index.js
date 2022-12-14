import { useState } from 'react';
import useSWR from 'swr';
import {
  Alert,
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  CircularProgress,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Pagination,
  Select,
  Tab,
  Tabs,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { getPets } from '../../api/pets';

export default function Pets() {
  const [animal, setAnimal] = useState('Dog');
  const [nameValue, setNameValue] = useState('');
  const [name, setName] = useState('');
  const [size, setSize] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('');
  const [page, setPage] = useState(1);

  const { data, error } = useSWR(
    `/pets?status=Available&animal=${animal}&name=${name}&size=${size}&age=${age}&sex=${sex}&page=${page}&limit=8`,
    getPets,
  );

  const sexes = ['Any', 'Male', 'Female', 'Unknown'];
  const dogSizes = ['Any', 'Mini', 'Small', 'Medium', 'Big', 'Giant'];
  const sizes = ['Any', 'Small', 'Medium', 'Large', 'Extra Large'];
  const ages = ['Any', 'Baby', 'Young', 'Adult', 'Senior'];
  const dogAges = ['Any', 'Puppy', 'Young', 'Adult', 'Senior'];
  const catAges = ['Any', 'Kitten', 'Young', 'Adult', 'Senior'];

  const handleChangeAnimal = (event, newValue) => {
    setAnimal(newValue);
  };
  const handleChangeAge = (event) => {
    setAge(event.target.value);
  };
  const handleChangeName = (event) => {
    setNameValue(event.target.value);
  };
  const handleSearch = (event) => {
    event.preventDefault();
    setName(nameValue);
  };
  const handleChangeSize = (event) => {
    setSize(event.target.value);
  };
  const handleChangeSex = (event) => {
    setSex(event.target.value);
  };
  const handleChangePage = (event, value) => {
    setPage(value);
  };

  return (
    <>
      <main>
        {error && <Alert severity="error">{error}</Alert>}
        <Box sx={{ width: '100%' }}>
          <Tabs
            value={animal}
            onChange={handleChangeAnimal}
            aria-label="animal filter"
            centered
          >
            <Tab value="Dog" label="Dogs" />
            <Tab value="Cat" label="Cats" />
            <Tab value="Other" label="Others" />
          </Tabs>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={4}>
            <Grid container direction="column" spacing={3} margin="10px">
              <Grid item>
                <FormControl fullWidth variant="outlined">
                  <InputLabel htmlFor="name">{"Pet's name"}</InputLabel>
                  <OutlinedInput
                    value={nameValue}
                    id="name"
                    onChange={handleChangeName}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="search"
                          onClick={handleSearch}
                          onMouseDown={handleSearch}
                        >
                          <SearchIcon />
                        </IconButton>
                      </InputAdornment>
                    }
                    label="Pet's name"
                  />
                </FormControl>
              </Grid>
              <Grid item>
                <FormControl fullWidth>
                  <InputLabel htmlFor="size">Size</InputLabel>
                  <Select
                    value={size}
                    name="size"
                    id="size"
                    label="size"
                    margin={4}
                    onChange={handleChangeSize}
                  >
                    {animal === 'Dog'
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
                  <InputLabel htmlFor="sex">Sex</InputLabel>
                  <Select
                    value={sex}
                    name="sex"
                    id="sex"
                    label="sex"
                    onChange={handleChangeSex}
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
                <FormControl fullWidth>
                  <InputLabel htmlFor="age">Age</InputLabel>
                  <Select
                    value={age}
                    name="age"
                    id="age"
                    label="age"
                    onChange={handleChangeAge}
                  >
                    {animal === 'Dog' &&
                      dogAges.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    {animal === 'Cat' &&
                      catAges.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    {animal === 'Other' &&
                      ages.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={8}>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'space-around',
                alignContent: 'flex-start',
                flexWrap: 'wrap',
              }}
              margin={4}
            >
              {!data && <CircularProgress color="inherit" />}
              {data?.data.map((item) => (
                <Card key={item._id} sx={{ maxWidth: 200, marginBottom: 4 }}>
                  <CardActionArea href={`/pets/${item._id}`}>
                    <CardMedia
                      component="img"
                      image={item.picture}
                      alt={item.name}
                    />
                    <CardContent>
                      <Typography variant="h5" textAlign="center">
                        {item.name}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
            {data?.meta.pages > 1 && (
              <Grid item display="flex" justifyContent="center">
                <Pagination
                  count={data.meta.pages}
                  page={page}
                  onChange={handleChangePage}
                />
              </Grid>
            )}
          </Grid>
        </Grid>
      </main>

      <footer></footer>
    </>
  );
}
