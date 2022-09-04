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

export async function getPet(id) {
  return await http.get(`/pets/${id}`).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
    };
  });
}

export async function createPet(url = '/pets', payload) {
  return await http.post(url, payload).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
    };
  });
}

export async function deletePet(id) {
  return await http.delete(`pets/${id}`).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
    };
  });
}
