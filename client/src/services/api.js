import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:3001/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token if available
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    // Handle different error types
    if (error.response) {
      // Server responded with error status
      const { status, data } = error.response;
      
      switch (status) {
        case 401:
          // Unauthorized - clear token and redirect to login
          localStorage.removeItem('authToken');
          window.location.href = '/login';
          break;
        case 403:
          // Forbidden
          console.error('Access forbidden:', data.error);
          break;
        case 404:
          // Not found
          console.error('Resource not found:', data.error);
          break;
        case 422:
          // Validation error
          console.error('Validation error:', data.error);
          break;
        case 500:
          // Server error
          console.error('Server error:', data.error);
          break;
        default:
          console.error('API error:', data.error || 'Unknown error');
      }
      
      return Promise.reject(data);
    } else if (error.request) {
      // Network error
      console.error('Network error:', error.message);
      return Promise.reject({ error: 'Network error. Please check your connection.' });
    } else {
      // Other error
      console.error('Request error:', error.message);
      return Promise.reject({ error: error.message });
    }
  }
);

// Helper methods for common HTTP operations
const apiMethods = {
  // GET request
  get: (url, config = {}) => {
    return api.get(url, config);
  },

  // POST request
  post: (url, data = {}, config = {}) => {
    return api.post(url, data, config);
  },

  // PUT request
  put: (url, data = {}, config = {}) => {
    return api.put(url, data, config);
  },

  // PATCH request
  patch: (url, data = {}, config = {}) => {
    return api.patch(url, data, config);
  },

  // DELETE request
  delete: (url, config = {}) => {
    return api.delete(url, config);
  },

  // File upload
  upload: (url, formData, config = {}) => {
    return api.post(url, formData, {
      ...config,
      headers: {
        'Content-Type': 'multipart/form-data',
        ...config.headers,
      },
    });
  },

  // Download file
  download: (url, filename, config = {}) => {
    return api.get(url, {
      ...config,
      responseType: 'blob',
    }).then((response) => {
      const blob = new Blob([response]);
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    });
  },
};

// Health check
export const healthCheck = () => {
  return api.get('/health');
};

export default apiMethods;