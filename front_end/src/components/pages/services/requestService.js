import axios from "axios";

const API_URL = "http://localhost:8000/api/request";

export const createRequest = async (RequestData) => {
  return await axios.post(`${API_URL}/create`, RequestData);
};

export const getUserRequest = async (email) => {
    return await axios.get(`${API_URL}/list?email=${email}`);
}