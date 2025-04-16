import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authService = {
  register: (userData) => api.post('/register', userData),
  login: async (credentials) => {
    try {
      const response = await api.post('/login', credentials);
      if (response.data && response.data.token) {
        return response;
      }
      throw new Error('Invalid response from server');
    } catch (error) {
      if (error.response && error.response.status === 401) {
        throw new Error('Invalid credentials');
      }
      throw error;
    }
  },
  logout: () => api.post('/logout'),
  updateUser: (id, userData) => api.post(`/user/${id}`, userData),
  deleteUser: (id) => api.delete(`/user/${id}`),
  getProfile: () => api.get('/user'),
};

export const filmService = {
  getFilms: () => api.get('/film'),
  getFilm: (id) => api.get(`/film/${id}`),
  createFilm: (filmData) => api.post('/film', filmData),
  updateFilm: (id, filmData) => api.put(`/film/${id}`, filmData),
  deleteFilm: (id) => api.delete(`/film/${id}`),
  getStats: () => api.get('/admin/stats'),
};

export const sessionService = {
  getSessions: () => api.get('/session'),
  createSession: (sessionData) => api.post('/session', sessionData),
  getSessionsByType: (type) => api.get('/sessions', { params: { type } }),
};

export const bookingService = {
  createBooking: (bookingData) => api.post('/bookings', bookingData),
  getBooking: (id) => api.get(`/bookings/${id}`),
  getUserBookings: (userId) => api.get(`/users/${userId}/bookings`),
};

export default api; 