import axios from 'axios';
import Config from './Config';
import { storage } from '@/lib/storage/localstorage';
import { jwtDecode } from 'jwt-decode';

const service = axios.create({
  baseURL: Config.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request Interceptor
service.interceptors.request.use(
  async function (config) {
    const token: string | null = (await storage.getValueFor('token')) as string | null;

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Response Interceptor
service.interceptors.response.use(
  async function (response) {
    if (response.status === 200) {
      const resData = response?.data?.data;

      if (resData?.token) {
        await storage.save('token', resData.token);
      }
      if (resData?.refresh) {
        await storage.save('refresh_token', resData.refresh);
      }
    }

    // Optional: Handle auto logout on 401 here if necessary
    if (response.status === 401) {
      await storage.remove('token');
      await storage.remove('refresh_token');
      window.location.href = '/auth/login';
    }

    return response;
  },
  function (error) {
    if (error.response) {
      alert(error.response?.data?.message || 'Something went wrong');
      return Promise.reject(error.response);
    } else if (error.request) {
      return Promise.reject(error.request);
    } else {
      return Promise.reject(error.message);
    }
  }
);

// Helper: Token Expiry Check
function isAccessTokenExpired(accessToken: string | null): boolean {
  if (!accessToken) return true;

  try {
    const decodedToken = jwtDecode<{ exp?: number }>(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp ? currentTime > decodedToken.exp : true;
  } catch (e) {
    return true;
  }
}

// ==== API UTILITY METHODS ====

export const post = async (url: string, payload?: any) => {
  try {
    const response = await service.post(url, payload);
    return response;
  } catch (error: any) {
    handleCommonErrors(error);
    throw error;
  }
};

export const patch = async (url: string, payload: any) => {
  try {
    const response = await service.patch(url, payload);
    return response;
  } catch (error: any) {
    handleCommonErrors(error);
    throw error;
  }
};

export const put = async (url: string, payload: any) => {
  try {
    const response = await service.put(url, payload);
    return response;
  } catch (error: any) {
    handleCommonErrors(error);
    throw error;
  }
};

export const Delete = async (url: string) => {
  try {
    const response = await service.delete(url);
    return response;
  } catch (error: any) {
    handleCommonErrors(error);
    throw error;
  }
};

export const get = async (url: string) => {
  try {
    const response = await service.get(url);
    return response.data;
  } catch (error: any) {
    handleCommonErrors(error);
    throw error;
  }
};

// Common error handler
function handleCommonErrors(error: any) {
  if (error?.status === 403) {
    storage.remove('token');
    storage.remove('refresh_token');
    window.location.href = '/auth/login';
  } else if (error?.status === 0) {
    throw new Error('An error occurred, please try again later.');
  } else if (error?.data?.code >= 400) {
    throw new Error(error?.data?.message || 'Something went wrong');
  }
}
