import { Button, Typography } from '@mui/material';
import React, { useContext } from 'react';

import UserContext from '../context/user';

export default function BarUser() {
  const context = useContext(UserContext);
  return context?.user?.data ? (
    <>
      <Typography>{context.user.data.name}</Typography>
      <Button flexGrow={1} color="inherit" href="/logout">
        Logout
      </Button>
    </>
  ) : (
    <>
      <Button flexGrow={1} color="inherit" href="/login">
        Login
      </Button>
    </>
  );
}
