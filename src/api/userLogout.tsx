export const userLogout = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    localStorage.removeItem('state');
    //localStorage.setItem('isAuth', 'false');
  }
};
