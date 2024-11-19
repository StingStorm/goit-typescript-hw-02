import axios, { AxiosRequestConfig } from 'axios';

type ConfigParams = {
  query: string;
  page: number;
  per_page: number;
  orientation: 'landscape' | 'portrait' | 'squarish';
};

type ApiResponse<T> = {
  results: T[];
  total: number;
  total_pages: number;
};

type RequestConfig<T> = Omit<AxiosRequestConfig, 'params'> & { params: T };

export async function fetchingGalleryPage<T>(
  userRequest: string,
  currentPage = 1
): Promise<ApiResponse<T>> {
  const getConfig: RequestConfig<ConfigParams> = {
    method: 'get',
    url: 'https://api.unsplash.com/search/photos',
    headers: {
      Authorization: 'Client-ID f2G1Xa4JTBGFMXLmICWHFxse_TbYP5YFlxnMnI8nQdg',
    },
    params: {
      query: userRequest,
      page: currentPage,
      per_page: 20,
      orientation: 'landscape',
    },
  };

  const { data } = await axios<ApiResponse<T>>(getConfig);

  return data;
}
