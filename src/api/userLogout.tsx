export const userLogout = () => {
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token');
    localStorage.removeItem('id');
    //localStorage.setItem('isAuth', 'false');
  }
};
