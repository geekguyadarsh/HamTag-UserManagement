const API = "http://localhost:8000/api";

export const createUser = (token, user) => {
  return fetch(`${API}/user/create/`, {
    method: "POST",
    headers: {
      accept: "application/json",
      Authorization: `Bearer ${token}`,
      "content-Type": "application/json",
    },
    body: JSON.stringify(user),
  })
    .then((response) => {
      return response.json();
    })
    .catch((error) => error);
};

export const getAllUsers = (token) => {
  return fetch(`${API}/users`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const getAUser = (token, userId) => {
  return fetch(`${API}/user/${userId}`, {
    method: "GET",
    Authorization: `Bearer ${token}`,
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};

export const deleteUser = (userId, token) => {
  return fetch(`${API}/user/${userId}`, {
    method: "DELETE",
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then((response) => {
      return response.json();
    })
    .catch((err) => console.log(err));
};
