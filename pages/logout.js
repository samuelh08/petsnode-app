import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

import UserContext from '../context/user';

export default function LogOut() {
  const context = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    context?.setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    router.push('/login');
  }, [context, router]);

  return null;
}
