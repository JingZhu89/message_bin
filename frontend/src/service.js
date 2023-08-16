import axios from "axios";
let baseURL;

if (process.env.NODE_ENV === "development") {
  baseURL = "http://localhost:3001/";
} else {
  baseURL = "/";
}

export const getEndpoints = async () => {
  const response = await axios.get(`${baseURL}uuids`);
  return response.data;
};

export const getRequestsForEndpoint = async (chosenEndpoint) => {
  const response = await axios.get(`${baseURL}requests/${chosenEndpoint}`);
  return response.data;
};

export const getNewUUID = async () => {
  const response = await axios.get(`${baseURL}createuuid`);
  return response.data;
};
