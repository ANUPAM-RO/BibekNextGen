export const AUTH_STORAGE_KEY = "bng_authenticated";

export const setAuthenticated = () => {
  sessionStorage.setItem(AUTH_STORAGE_KEY, "1");
};

export const clearAuthenticated = () => {
  sessionStorage.removeItem(AUTH_STORAGE_KEY);
};

export const isAuthenticated = () => {
  if (typeof window === "undefined") return false;
  return sessionStorage.getItem(AUTH_STORAGE_KEY) === "1";
};
