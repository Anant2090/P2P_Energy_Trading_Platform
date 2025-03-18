import axios from "axios";

const API_URL = "http://localhost:8080/api/trade";

export const createTrade = async (tradeData) => {
    console.log("Received Trade Data: ", tradeData);
  try {
    await axios.post(`${API_URL}/create`, tradeData);
  } catch (error) {
    console.error("Error creating trade:", error);
  }
};

export const getTrades = async () => {
  try {
    const response = await axios.get(`${API_URL}/list`);
    return response.data;
  } catch (error) {
    console.error("Error fetching trades:", error);
    return [];
  }
};