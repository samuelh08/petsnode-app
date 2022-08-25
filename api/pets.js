import http from './http';

export async function getPets(url = '/pets') {
  return await http.get(url).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
      meta: json.meta,
    };
  });
}
