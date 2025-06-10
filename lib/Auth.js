import Cookies from 'js-cookie';

export const setAuthCookie = (token, email, username) => {
  Cookies.set('token', token, { expires: 7 });
  Cookies.set('email', email, { expires: 7 });
  Cookies.set('username', username, { expires: 7 });
};

export const clearAuthCookie = () => {
  Cookies.remove('token');
  Cookies.remove('email');
  Cookies.remove('username');
};

export const getAuthCookie = () => {
  return {
    token: Cookies.get('token'),
    email: Cookies.get('email'),
    username: Cookies.get('username'),
  };
};
