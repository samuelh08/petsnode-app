import http from './http';

export function createReply(url = '/replies', payload) {
  return http.post(url, payload).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
    };
  });
}

export function updateReply(id, payload) {
  return http.put(`/replies/${id}`, payload).then((response) => {
    const { data: json } = response;
    return {
      data: json.data,
    };
  });
}
