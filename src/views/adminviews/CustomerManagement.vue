<template>
  <div class="management-section">
    <h3>Manage Customers</h3>
    <button @click="openAddModal">Add Customer</button>
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
          <button @click="openUpdateModal(customer)">Update</button>
          <button @click="removeCustomer(customer.userId)">Delete</button>
        </tr>
      </tbody>
    </table>
  <!-- Modals -->
  <AddCustomerModal
    :isVisible="isAddModalVisible"
    @close="closeAddModal"
    @add-customer="addCustomer"
  />
  <UpdateCustomerModal
    :isVisible="isUpdateModalVisible"
    :customer="selectedCustomer"
    @close="closeUpdateModal"
    @update-customer="updateCustomer"
  />
  </div>
</template>

<script>
import AddCustomerModal from '@/modals/AddCustomerModal.vue';
import UpdateCustomerModal from '@/modals/UpdateCustomerModal.vue';
import { getCustomers, deleteCustomer, updateCustomer, createCustomer } from '@/services/customerService';

export default {
  components: {
    AddCustomerModal,
    UpdateCustomerModal
  },
  data() {
    return {
      customers: [],
      sortKey: '',
      sortAsc: true,
      isAddModalVisible: false,
      isUpdateModalVisible: false,
      selectedCustomer: null
    };
  },
  async created() {
    await this.fetchCustomers(); // Fetch the customers when the component is created
  },
  methods: {
    async fetchCustomers() {
      try {
        this.customers = await getCustomers();
      } catch (error) {
        console.error('Error fetching customers:', error);
      }
    },
    openAddModal() {
    console.log('Opening Add Modal');
    this.isAddModalVisible = true;
    console.log('Modal Opened');
    },
    closeAddModal() {
      this.isAddModalVisible = false;
      console.log('Modal Closed');
    },
    openUpdateModal(customer) {
    console.log('Opening Update Modal for customer:', customer);
    this.selectedCustomer = customer;
    this.isUpdateModalVisible = true;
    },
    closeUpdateModal() {
      this.isUpdateModalVisible = false;
    },
    async addCustomer(newCustomer) {
      try {
        await createCustomer(newCustomer); // This is the function call that should now work
        this.fetchCustomers(); // Refresh the customer list after addition
      } catch (error) {
        console.error('Error adding customer:', error);
      }
    },
    
    async updateCustomer(customerId, updatedCustomer) {
    if (!customerId || customerId === 'undefined') {
      console.error('Invalid Customer ID');
      return;
    }
    try {
      await updateCustomer(customerId, updatedCustomer);
      this.fetchCustomers(); // Refresh the customer list after update
    } catch (error) {
      console.error('Error updating customer:', error);
    }
  },
    async removeCustomer(customerId) {
      if (confirm('Are you sure you want to delete this customer?')) {
        try {
          await deleteCustomer(customerId);
          this.fetchCustomers(); // Refresh the customer list after deletion
        } catch (error) {
          console.error('Error deleting customer:', error);
        }
      }
    },
    
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
  background-color: #2980b9;
}
</style>