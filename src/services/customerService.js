import axios from 'axios';

const API_URL = '/ecommerce/customer/';

export function getCustomers() {
  return axios.get(`${API_URL}getAll`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error fetching customers:', error);
      throw error;
    });
}

export async function createCustomer(newCustomer) {
  await axios.post(`${API_URL}register`, newCustomer)
  .then(response => response.data)
    .catch(error => {
      console.error('Error creating customer:', error);
      throw error;
    });
}

// Function to delete a customer by ID
export function deleteCustomer(userId) {
  return axios.delete(`${API_URL}delete/${userId}`)
    .then(response => response.data)
    .catch(error => {
      console.error('Error deleting customer:', error);
      throw error;
    });
}

// Function to update a customer's details
export function updateCustomer(userId, updatedCustomer) {
  return axios.put(`${API_URL}update/${userId}`, updatedCustomer)
    .then(response => response.data)
    .catch(error => {
      console.error('Error updating customer:', error);
      throw error;
    });
}
