<template>
    <div v-if="isVisible" class="modal">
      <div class="modal-content">
        <span class="close" @click="closeModal">&times;</span>
        <h3>Update Customer</h3>
        <form @submit.prevent="submitUpdateCustomer">
          <div>
            <label>First Name:</label>
            <input v-model="localCustomer.firstName" required>
          </div>
          <div>
            <label>Last Name:</label>
            <input v-model="localCustomer.lastName" required>
          </div>
          <div>
            <label>Email:</label>
            <input v-model="localCustomer.contact.email" type="email" required>
          </div>
          <div>
            <label>Phone:</label>
            <input v-model="localCustomer.contact.phoneNumber" required>
          </div>
          <button type="submit">Update Customer</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      isVisible: Boolean,
      customer: Object
    },
    data() {
      return {
        localCustomer: { ...this.customer } // Create a local copy of the customer object
      };
    },
    watch: {
      customer: {
        immediate: true,
        handler(newCustomer) {
          this.localCustomer = { ...newCustomer }; // Update local copy when prop changes
        }
      }
    },
    methods: {
      closeModal() {
        this.$emit('close');
      },
      submitUpdateCustomer() {
  if (!this.localCustomer.userId) {
    console.error('User ID is missing for this customer.');
    return; // Early return if userId is missing
  }
  this.$emit('update-customer', this.localCustomer); // Emit local copy of customer
  this.closeModal();
}
    }
  };
  </script>
  
  <style scoped>
  /* Add your modal styles here */
  </style>
  