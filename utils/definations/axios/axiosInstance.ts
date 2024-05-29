import axios from 'axios';
import makeRequest from '../../supportingFns/axiosApiCall';
import { AxiosRequestConfig } from 'axios';
import {
  UseMutationOptions,
  UseMutationResult,
  useMutation,
} from '@tanstack/react-query';

// Create an Axios instance with withCredentials set to true
const axiosInstance = axios.create({
  baseURL: process.env.BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true, // Ensuring cookies are sent with requests
});

export default axiosInstance;

interface Config extends AxiosRequestConfig {}

// Updated useDynamicRequest hook to ensure withCredentials is passed along
export const useDynamicRequest = <TData = any, TError = any>(
  config: Config,
  options?: UseMutationOptions<TData, TError, Config>,
): UseMutationResult<TData, TError, Config> => {
  return useMutation({
    mutationFn: (requestConfig: Config) => {
      if (!requestConfig.method) {
        throw new Error('HTTP method is required');
      }
      return makeRequest({
        ...config,
        ...requestConfig,
        withCredentials: true,
      });
    },
    ...options,
  });
};
