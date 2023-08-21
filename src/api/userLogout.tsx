export const userLogout = () => {
  if (localStorage.getItem('loginToken') && localStorage.getItem('isAuth') === 'true') {
    localStorage.removeItem('loginToken');
    localStorage.setItem('isAuth', 'false');
  }
};
