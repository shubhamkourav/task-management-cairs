import axios from "./axios"

// Create a base function for making requests to a specific module
const createRequest = (module, method) => ( id, data) => {
  // Construct the URL for the API request based on the module and optional ID
  const url = `/${module}${id ? `/${id}` : ''}`;
  
  // Use axios to make the HTTP request with the specified method and data
  return axios[method](url, data);
};

// Define specific functions for each HTTP method
export const getAll = (module) => createRequest(module,'get');
export const create = (module) => createRequest(module,'post');
export const deleteOne = (module) => createRequest(module,'delete');
export const getOne = (module) => createRequest(module,'get');
export const update = (module) => createRequest(module,'put');