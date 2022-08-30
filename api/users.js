import http from './http';

export async function logIn({ email, password }) {
  return http.post('/users/login', { email, password }).then((response) => {
    const { data: json } = response;

    if (json.meta?.token) {
      localStorage.setItem('token', json.meta.token);
    }

    const user = json.data;

    return {
      data: user,
    };
  });
}

export async function Signup(payload) {
  return http.post('/users/signup', payload).then((response) => {
    const { data: json } = response;

    if (json.meta?.token) {
      localStorage.setItem('token', json.meta.token);
    }

    const user = json.data;

    return {
      data: user,
    };
  });
}
