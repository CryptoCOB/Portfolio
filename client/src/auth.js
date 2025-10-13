export const getApiBase = () => {
  return import.meta?.env?.VITE_API_URL || 'http://localhost:5001';
};

export const getToken = () => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('token');
};

export const setToken = (token) => {
  if (typeof window === 'undefined') return;
  localStorage.setItem('token', token);
};

export const clearToken = () => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('token');
};

export const isLoggedIn = () => Boolean(getToken());
