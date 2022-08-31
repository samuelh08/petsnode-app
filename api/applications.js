import http from './http';

export async function createApplication(url = '/applications', payload) {
  return await http.post(url, payload).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
    };
  });
}
