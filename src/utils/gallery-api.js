import axios from 'axios';

export async function fetchingGalleryPage(userRequest) {
  const getConfig = {
    method: 'get',
    url: 'https://api.unsplash.com/search/photos',
    headers: {
      Authorization: 'Client-ID f2G1Xa4JTBGFMXLmICWHFxse_TbYP5YFlxnMnI8nQdg',
    },
    params: {
      query: userRequest,
      page: 1,
      per_page: 20,
    },
  };

  const response = await axios(getConfig);

  return response.data.results;
}
