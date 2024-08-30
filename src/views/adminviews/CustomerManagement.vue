<template>
  <div class="management-section">
    <h3>Manage Customers</h3>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('id')">ID</th>
          <th @click="sortBy('firstName')">First Name</th>
          <th @click="sortBy('lastName')">Last Name</th>
          <th @click="sortBy('email')">Email</th>
          <th @click="sortBy('phone')">Phone</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="customer in customers" :key="customer.id">
          <td>{{ customer.userId }}</td>
          <td>{{ customer.firstName }}</td>
          <td>{{ customer.lastName }}</td>
          <td>{{ customer.contact.email }}</td>
          <td>{{ customer.contact.phoneNumber }}</td>
          <button @click="handleUpdateCustomer(customer.id, updatedCustomerData)">Update</button>
          <button @click="handleDeleteCustomer(customer.id)">Delete</button>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCustomers } from '@/services/customerService';

export default {
  data() {
    return {
      customers: [],
      sortKey: '',
      sortAsc: true
    };
  },
  async created() {
    try {
      this.customers = await getCustomers();  // Fetch customers on component creation
    } catch (error) {
      console.error('Error fetching customers:', error);  // Handle any errors
    }
  }
  
};
</script>

<style scoped>
.management-section {
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  text-align: left;
  padding: 10px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;
}

button {
  padding: 5px 10px;
  background-color: #3498db;
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3498db;
}
</style>