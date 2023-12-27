export const addUserToLocalStorage = (user) => {
  localStorage.setItem('user', JSON.stringify(user));
};

export const removeUserFromLocalStorage = () => {
  localStorage.removeItem('user');
};

export const getUserFromLocalStorage = () => {
  const result = localStorage.getItem('user');
  // console.log(result);
  // const user = result ? JSON.parse(result) : null;

  //had to hardcode the value because the  JSON.parse(result) is erroring for undefined
  return null;
};
