import axiosInstance from '../definations/axios/axiosInstance';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

interface RequestParams extends AxiosRequestConfig {
  method?: NonNullable<AxiosRequestConfig['method']>;
}

const makeRequest = async ({
  method,
  url,
  data,
  headers,
  params,
}: RequestParams): Promise<any> => {
  const config: AxiosRequestConfig = {
    method,
    url,
    data,
    headers,
    params,
  };

  const response: AxiosResponse = await axiosInstance(config);
  return { data: response.data, headers: response.headers };
};

export default makeRequest;
