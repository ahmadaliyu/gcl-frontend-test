import axios from 'axios';
import Config from './Config';
import { storage } from '@/lib/storage/localstorage';



const service = axios.create({
  baseURL: Config.apiUrl,
  headers: {
    // 'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json',
  },
});



// Add a request interceptor
service.interceptors.request.use(
  async function (config) {

    const token: any = await storage.getValueFor("token");

    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },

  function (error) {
    if (error.response) {
      return error.response;
    } else if (error.request) {
      return error.request;
    } else {
      return error.message;
    }
    // return Promise.reject(error);
  }
);


// Add a response interceptor
service.interceptors.response.use(
  async function (response) {

    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    if (response.status === 200) {
      const token = response?.data?.data.token;
      const refreshToken = response?.data?.data.refresh;

      if (token) {
        await storage.save('token', token);
      }
      if (refreshToken) {
        await storage.save('refresh_token', refreshToken);
      }
    }
    if (response.status === 401) {
      //   deleteKey('token
      storage.remove('token');
      storage.remove('refresh_token');
    }
    return response;
  },
  function (error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    if (error.response) {
      return Promise.reject(error.response);
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error.message);
    }
  }
);

export const post = async (url: any, payload?: any) => {
  try {
    const data = await service.post(url, payload);
    const resolvedData = await Promise.resolve(data);

    if (resolvedData) {
      return resolvedData;
    }
  } catch (error: any) {
    if (error.status === 403) {
      window.location.href = '/auth/login';
    } else if (error?.status === 0) {
      throw new Error('An error ocurred, please try again later.');
    } else if (error.data?.code === 400) {
      throw new Error(`${error?.data?.message}`);
    }

    return error;
  }
};

export const patch = async (url: any, payload: any) => {
  try {
    const data = await service.patch(url, payload);
    const resolvedData = await Promise.resolve(data);
    if (resolvedData) {
      return resolvedData;
    }
  } catch (error: any) {
    if (error?.status === 0) {
      throw new Error('An error ocurred, please try again later.');
    }
    return error;
  }
};

export const put = async (url: any, payload: any) => {
  try {
    const data = await service.put(url, payload);
    const resolvedData = await Promise.resolve(data);
    if (resolvedData) {
      return resolvedData;
    }
  } catch (error: any) {
    if (error?.status === 0) {
      throw new Error('An error ocurred, please try again later.');
    }
    return error;
  }
};

export const Delete = async (url: any, payload?: any) => {
  try {
    const data = await service.delete(url);
    const resolvedData = await Promise.resolve(data);
    if (resolvedData) {
      return resolvedData;
    }
  } catch (error: any) {
    if (error?.status === 403) {
    }
    return error;
  }
};

export const get = async (url: any, navigation?: any) => {
  try {
    const { data } = await service.get(url);
    const resolvedData = await Promise.resolve(data);
    if (resolvedData) {
      return resolvedData;
    }
  } catch (error: any) {
    if (error?.status === 403) {
      //   deleteKey('token');
      //   errorMessage('Session timeout');
      window.location.href = '/auth/login';
    } else if (error.status === 0) {
    }
    return error;
  }
};
