import axios, { AxiosError } from 'axios';
import Config from './Config';
import { jwtDecode } from 'jwt-decode';
import Cookies from 'js-cookie';

// ✅ Main Axios instance (uses token, auto-refresh)
const service = axios.create({
  baseURL: Config.apiUrl,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Raw Axios instance (used for refreshing token or public requests)
const rawAxios = axios.create({
  baseURL: Config.apiUrl,
  headers: {
    'Content-Type': 'application/json',
  },
});

// ✅ Token expiry check
function isAccessTokenExpired(accessToken: string | undefined | null): boolean {
  if (!accessToken) return true;
  try {
    const decoded = jwtDecode<{ exp?: number }>(accessToken);
    const now = Date.now() / 1000;
    return decoded.exp ? now > decoded.exp : true;
  } catch {
    return true;
  }
}

// ✅ Refresh token flow
async function refreshAccessToken(refreshToken: string | undefined | null) {
  if (!refreshToken) throw { message: 'No refresh token', status: 402 };

  try {
    const res = await rawAxios.post('/auth/refresh-token', {
      refresh_token: refreshToken,
    });

    const token = res?.data?.data?.token;
    const newRefreshToken = res?.data?.data?.refresh_token;

    if (token && newRefreshToken) {
      Cookies.set('token', token);
      Cookies.set('refresh_token', newRefreshToken);
      return token;
    }

    throw new Error('Invalid refresh response');
  } catch (err) {
    Cookies.remove('token');
    Cookies.remove('refresh_token');
    throw { message: 'Failed to refresh token', status: 402 };
  }
}

// ✅ Attach token to requests
service.interceptors.request.use(
  async (config) => {
    if (!config.url?.includes('auth/login') && !config.url?.includes('auth/refresh-token')) {
      let token = Cookies.get('token');

      if (isAccessTokenExpired(token)) {
        const refreshToken = Cookies.get('refresh_token');
        try {
          token = await refreshAccessToken(refreshToken);
        } catch (error) {
          console.error('Token refresh failed', error);
        }
      }

      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Save new token after response
service.interceptors.response.use(
  async (response) => {
    const token = response?.data?.data?.token;
    const refreshToken = response?.data?.data?.refresh_token || response?.data?.data?.refresh;

    if (token && refreshToken) {
      Cookies.set('token', token);
      Cookies.set('refresh_token', refreshToken);
    }

    return response;
  },
  async (error: AxiosError) => {
    const originalRequest: any = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url?.includes('auth/refresh-token')
    ) {
      originalRequest._retry = true;

      try {
        const newToken = await refreshAccessToken(Cookies.get('refresh_token'));
        if (newToken) {
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return service(originalRequest);
        }
      } catch (err) {
        console.error('Refresh failed', err);
        Cookies.remove('token');
        Cookies.remove('refresh_token');
        // Optional: redirect to login
        // window.location.href = "/auth/login";
      }
    }

    return Promise.reject(error);
  }
);

// ✅ Error handler
function handleError(error: any) {
  if (error?.response?.status === 403 || error?.response?.status === 401) {
    Cookies.remove('token');
    Cookies.remove('refresh_token');
    // Optional: redirect
    // window.location.href = "/auth/login";
  }

  if (error?.response?.data?.message) {
    throw new Error(error.response.data.message);
  }

  if (error?.message) {
    throw new Error(error.message);
  }

  throw new Error('An unknown error occurred.');
}

// ✅ Standard methods
export const post = async (url: string, payload: any) => {
  try {
    const res: any = await service.post(url, payload);
    return res;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const get = async (url: string) => {
  try {
    const res: any = await service.get(url);
    return res.data;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const put = async (url: string, payload: any) => {
  try {
    const res: any = await service.put(url, payload);
    return res;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const patch = async (url: string, payload: any) => {
  try {
    const res: any = await service.patch(url, payload);
    return res;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

export const Delete = async (url: string) => {
  try {
    const res = await service.delete(url);
    return res;
  } catch (error) {
    handleError(error);
    throw error;
  }
};

// ✅ Get file (supports blob download)
export const getFile = (url: string, config = {}) => {
  const isPublicFile = url.includes('/auth/download/labels/');

  if (isPublicFile) {
    return rawAxios.get(url, {
      responseType: 'blob',
      ...config,
    });
  }

  return service.get(url, {
    responseType: 'blob',
    ...config,
  });
};

// ✅ Post file (multipart/form-data upload with auth)
export const postFile = (url: string, formData: FormData, config = {}) => {
  return service.post(url, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
    ...config,
  });
};

// ✅ Export Axios instances if needed elsewhere
export { service, rawAxios };
