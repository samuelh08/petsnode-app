import http from './http';

export async function createApplication(url = '/applications', payload) {
  return await http.post(url, payload).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
    };
  });
}

export async function getApplications(url = '/applications') {
  return await http.get(url).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
      meta: json.meta,
    };
  });
}

export async function deleteApplication(id) {
  return await http.delete(`applications/${id}`).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
    };
  });
}
