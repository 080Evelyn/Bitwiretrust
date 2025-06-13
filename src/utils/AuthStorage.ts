export const getToken = () => localStorage.getItem("token");
export const getUserId = () => localStorage.getItem("userId");
export const getEmail = () => localStorage.getItem("email");

export const clearAuth = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
};
