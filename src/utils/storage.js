const TOKEN_KEY = "unitrade_token";
const ROLE_KEY = "unitrade_role";

/**
 * Decode JWT payload (no library needed)
 */
const decodeToken = (token) => {
  try {
    const payload = token.split(".")[1];
    return JSON.parse(atob(payload));
  } catch {
    return null;
  }
};

export const setToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);

  const decoded = decodeToken(token);
  if (decoded?.role) {
    localStorage.setItem(ROLE_KEY, decoded.role);
  }
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const getRole = () => localStorage.getItem(ROLE_KEY);

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(ROLE_KEY);
};

export const getUserId = () => {
  const token = localStorage.getItem(TOKEN_KEY);
  if (!token) return null;

  const decoded = decodeToken(token);
  return decoded?.userId || null;
};
