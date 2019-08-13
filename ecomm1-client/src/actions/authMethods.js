export const saveToken = token => {
  localStorage.setItem("jwt", JSON.stringify(token));
};

export const authToken = () => {
  if (typeof window == "undefined") {
    return false;
  }
  if (localStorage.getItem("jwt")) {
    return JSON.parse(localStorage.getItem("jwt"));
  } else {
    return false;
  }
};
