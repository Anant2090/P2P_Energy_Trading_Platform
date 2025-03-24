import axios from "axios";

const API_URL = "http://localhost:5000/api/trade";

export const createTrade = async (tradeData) => {
  return await axios.post(`${API_URL}/create`, tradeData);
};

export const getTrades = async () => {
    return await axios.get(`${API_URL}/list`);
};