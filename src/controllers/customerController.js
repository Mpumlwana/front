import CustomerService from '../services/customerService';

export default {
  data() {
    return {
      customers: []  // Holds the customer list
    };
  },
  methods: {
    fetchCustomers() {
      CustomerService.getAllCustomers()
        .then(response => {
          this.customers = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the customers!", error);
        });
    },

    handleDeleteCustomer(userId) {
      deleteCustomer(userId)
        .then(() => {
          // Reload customer data after deletion
          this.fetchCustomers();
        })
        .catch(error => {
          console.error("Error deleting customer:", error);
        });
    },
    
    handleUpdateCustomer(userId, updatedCustomer) {
      updateCustomer(userId, updatedCustomer)
        .then(() => {
          // Optionally, reload customer data or handle post-update logic
          this.fetchCustomers();
        })
        .catch(error => {
          console.error("Error updating customer:", error);
        });
    }
  }
  };
