let memoryToken: string | null = null;

export const setMemoryToken = (token: string | null) => {
  memoryToken = token;
};

export const getToken = () => memoryToken;
export const getUserId = () => localStorage.getItem("userId");
export const getEmail = () => localStorage.getItem("email");

export const clearAuth = () => {
  memoryToken = null;
  localStorage.removeItem("token");
  localStorage.removeItem("userId");
  localStorage.removeItem("email");
};
