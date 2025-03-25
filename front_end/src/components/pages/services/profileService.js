import axios from "axios";

const API_URL = "http://localhost:8000/api/profile";

export const updateProfile = async (profileData) => {
    return await axios.post(`${API_URL}/profileupdate`, profileData);
};

export const getProfile = async (email) => {
    return await axios.get(`${API_URL}/getprofile?email=${email}`);
};

