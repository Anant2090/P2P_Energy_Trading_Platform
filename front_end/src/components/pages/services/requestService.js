import axios from "axios";

const API_URL = "http://localhost:5000/api/request";

export const createRequest = async (RequestData) => {
  return await axios.post(`${API_URL}/create`, RequestData);
};

export const getUserRequest = async (username) => {
    return await axios.get(`${API_URL}/getrequest?username=${username}`);
}