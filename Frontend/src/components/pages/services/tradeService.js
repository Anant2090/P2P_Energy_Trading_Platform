import axios from "axios";

const API_URL = "http://localhost:8000/api/trade";

export const createTrade = async (tradeData) => {
  return await axios.post(`${API_URL}/create`, tradeData);
};

export const getTrades = async () => {
    return await axios.get(`${API_URL}/list`);
};

export const getTradesByEmail = async (email) => {
    return await axios.get(`${API_URL}/user_trades?email=${email}`);
};

export const deleteTrade = async (email, tradeType) => {
    return await axios.delete(`${API_URL}/delete_trade?email=${email}&tradeType=${tradeType}`);
}