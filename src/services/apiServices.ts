import axios, { AxiosError } from 'axios';
import Config from './Config';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

const service = axios.create({
  baseURL: Config.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Check if access token is expired
function isAccessTokenExpired(accessToken: string): boolean {
  if (!accessToken) return true;
  try {
    const decodedToken = jwtDecode<{ exp?: number }>(accessToken);
    const currentTime = Date.now() / 1000;
    return decodedToken.exp ? currentTime > decodedToken.exp : true;
  } catch (error) {
    return true; // If token is invalid, treat it as expired
  }
}

// ✅ Refresh access token
async function refreshAccessToken(refreshToken?: string | null) {
  if (!refreshToken) {
    throw { message: 'No RefreshToken', status: 402 };
  }

  try {
    const payload = { rtoken: refreshToken };
    const res = await post(`auth/refresh-token`, payload);

    const token = res?.data?.data?.token;
    const newRefreshToken = res?.data?.data?.refresh_token;

    if (token && newRefreshToken) {
      Cookies.set('token', token);
      Cookies.set('refresh_token', newRefreshToken);
      return token;
    }

    throw new Error('Invalid refresh response');
  } catch (error) {
    Cookies.remove('token');
    Cookies.remove('refresh_token');
    throw { message: 'Failed to refresh token', status: 402 };
  }
}

// ✅ Request Interceptor
service.interceptors.request.use(
  async (config) => {
    // Skip token for auth endpoints
    if (!config.url?.match(/^\/?auth/i)) {
      let token = Cookies.get('token');

      if (isAccessTokenExpired(token as string)) {
        const refreshToken = Cookies.get('refresh_token');
        token = await refreshAccessToken(refreshToken);
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// ✅ Response Interceptor
service.interceptors.response.use(
  async function (response) {
    const token = response?.data?.data?.token;
    const refresh = response?.data?.data?.refresh || response?.data?.data?.refresh_token;

    if (token && refresh) {
      Cookies.set('token', token);
      Cookies.set('refresh_token', refresh);
    }

    return response;
  },

  async function (error: AxiosError) {
    const refreshToken = Cookies.get('refresh_token');

    if (error?.response?.status === 402 || error.code === 'ERR_BAD_REQUEST') {
      try {
        await refreshAccessToken(refreshToken);
      } catch (refreshError) {
        console.error('Refresh failed:', refreshError);
        Cookies.remove('token');
        Cookies.remove('refresh_token');
        window.location.href = '/auth/login';
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Standard HTTP Methods

export const post = async (url: string, payload?: any) => {
  try {
    const data = await service.post(url, payload);
    return data;
  } catch (error: any) {
    handleError(error);
    return error;
  }
};

export const patch = async (url: string, payload: any) => {
  try {
    const data = await service.patch(url, payload);
    return data;
  } catch (error: any) {
    handleError(error);
    return error;
  }
};

export const put = async (url: string, payload: any) => {
  try {
    const data = await service.put(url, payload);
    return data;
  } catch (error: any) {
    handleError(error);
    return error;
  }
};

export const Delete = async (url: string) => {
  try {
    const data = await service.delete(url);
    return data;
  } catch (error: any) {
    handleError(error);
    return error;
  }
};

export const get = async (url: string) => {
  try {
    const data = await service.get(url);
    return data.data;
  } catch (error: any) {
    handleError(error);
    return error;
  }
};

// ✅ Centralized error handler
function handleError(error: any) {
  if (error?.status === 403) {
    window.location.href = '/auth/login';
  } else if (error?.status === 0) {
    throw new Error('An error occurred, please try again later.');
  } else if (error?.data?.code >= 400) {
    throw new Error(error?.data?.message || 'Something went wrong');
  }
}
