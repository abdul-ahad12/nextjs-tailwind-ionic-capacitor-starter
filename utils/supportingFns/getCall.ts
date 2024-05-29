import { useState } from 'react';
import axios from 'axios';

const useDynamicGetRequest = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const makeRequest = async (
    url = '',
    method = 'GET',
    params = null,
    headers = {},
  ) => {
    setLoading(true);
    try {
      const response = await axios({
        method,
        url,
        params,
        headers,
      });
      setData(response.data);
      setError(null);
    } catch (error: any) {
      setError(error);
      setData(null);
    }
    setLoading(false);
  };

  return { data, error, loading, makeRequest };
};

export default useDynamicGetRequest;
