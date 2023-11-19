import axios from "axios";

// Configurate the base url
const baseUrl = "http://localhost:3001/persons";

// Get all persons from the server
const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

// Create a new person
const create = (newObject) => {
  const request = axios.post(baseUrl, newObject);
  return request.then((response) => response.data);
};

// Update a person
const update = (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  return request.then((response) => response.data);
};

// Delete a person
const extract = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`);
  return request.then((response) => response.data);
};

export default {
  getAll,
  create,
  extract,
  update,
};
