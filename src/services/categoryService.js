import axios from 'axios';

const API_URL = '/ecommerce/categories/';

export function getCategories() {
  return axios.get(`${API_URL}getAll`)
    .then(response => {
      console.log('Categories response:', response.data);  // Log the response data
      return response.data;  // Ensure this is returning an array of categories
    })
    .catch(error => {
      console.error('Error fetching categories:', error);
      throw error;
    });
}
