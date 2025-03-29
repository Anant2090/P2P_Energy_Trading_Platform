import axios from "axios";

const API_URL = "http://localhost:8000/api/request";

export const createRequest = async (RequestData) => {
  return await axios.post(`${API_URL}/create`, RequestData);
};

export const getUserRequest = async (email) => {
    return await axios.get(`${API_URL}/list?email=${email}`);
}

export const deleteRequest = async (email, seller_name) => {
    return await axios.delete(`${API_URL}/delete?email=${email}&seller_name=${seller_name}`);
}

export const deleteSellerRequest = async (seller_name) => {
  console.log(seller_name);
  return await axios.delete(`${API_URL}/delete_request?seller_name=${seller_name}`);
}

export const getSellerEmail = async (seller_name) => {
  return await axios.get(`${API_URL}/seller_email?seller_name=${seller_name}`);
}

export const deleteTrades=async(seller_email,buyer_email)=>{
  return await axios.delete(`${API_URL}/delete_trade?Seller_Email=${seller_email}&Buyer_Email=${buyer_email}`);
}