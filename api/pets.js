import axios from 'axios';

export async function getPets(url = `${process.env.REACT_APP_API_URL}/pets`) {
  return await axios.get(url).then((response) => {
    const { data: json } = response;

    return {
      data: json.data,
      meta: json.meta,
    };
  });
}
