<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Add Customer</h3>
        <form @submit.prevent="submitAddCustomer">
          <div>
            <label>First Name:</label>
            <input v-model="customer.firstName" required>
          </div>
          <div>
            <label>Last Name:</label>
            <input v-model="customer.lastName" required>
          </div>
          <div>
            <label>Email:</label>
            <input v-model="customer.contact.email" type="email" required>
          </div>
          <div>
            <label>Phone:</label>
            <input v-model="customer.contact.phoneNumber" required>
          </div>
          <button type="submit">Add Customer</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean
    },
    data() {
      return {
        customer: {
          firstName: '',
          lastName: '',
          contact: {
            email: '',
            phoneNumber: ''
          }
        }
      };
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      submitAddCustomer() {
        this.$emit('add-customer', this.customer);
        this.closeModal();
      }
    }
  };
  </script>
  
  <style scoped>
  /* Add your modal styles here */
  </style>
  