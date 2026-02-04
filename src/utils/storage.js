const TOKEN_KEY = "unitrade_token";
const ROLE_KEY = "unitrade_role";

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = (token, role) => {
  localStorage.setItem(TOKEN_KEY, token);
  if (role) {
    localStorage.setItem(ROLE_KEY, role);
  }
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};

export const getRole = () => localStorage.getItem(ROLE_KEY);
