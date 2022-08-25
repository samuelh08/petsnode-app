import http from './http';

export function logIn({ email, password }) {
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
