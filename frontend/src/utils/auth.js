export const isAuthenticated = () => {
    return !!localStorage.getItem('authToken');
  };