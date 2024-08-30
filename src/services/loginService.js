import axios from 'axios';

const API_URL = '/admin/';


export const loginAdmin = async (loginData) => {
  try {
    return await axios.post(`${API_URL}login`, loginData); 
  } catch (error) {
    console.error('Login failed:', error); // Optional: Log or handle the error
    throw error; // Re-throw the error to be handled in the calling function
  }
};
