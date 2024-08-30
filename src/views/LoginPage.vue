<template>
  <div class="container">
    <header class="header">
      <h1 class="center-align">Admin Login</h1>
    </header>
    <form @submit.prevent="login">
      <div class="row">
        <div class="input-field col s12">
          <input id="email" type="email" v-model="email" required>
          <label for="email">Email</label>
        </div>
      </div>
      <div class="row">
        <div class="input-field col s12">
          <input id="password" type="password" v-model="password" required>
          <label for="password">Password</label>
        </div>
      </div>
      <button class="btn waves-effect waves-light" type="submit" name="action">Login</button>
      <button class="btn btn-secondary waves-effect waves-light" type="button" @click="cancel">Back</button>
    </form>
    <p v-if="message">{{ message }}</p>
  </div>
</template>

<script>
import { loginAdmin } from '@/services/loginService'; // Make sure the loginAdmin service is defined correctly

export default {
  name: 'LoginPage',
  data() {
    return {
      email: '',
      password: '',
      message: ''
    };
  },
  methods: {
    async login() {
      try {
        const loginData = {
          username: this.username,  
          password: this.password
        };
        // Call the admin login service
        const response = await loginAdmin(loginData);

        if (response.status === 200) {
          // Login success, navigate to admin dashboard
          this.$router.push({ name: 'AdminDashboard' });
        } else if (response.status === 412) {
          // Precondition failed (Invalid credentials)
          this.message = 'Invalid email or password.';
        } else {
          this.message = 'An error occurred during login.';
        }
      } catch (error) {
        this.message = 'Failed to login. Please check your connection.';
      }
    },
    cancel() {
      window.history.back();
    }
  }
};
</script>

<style scoped>
/* Styles remain the same */
</style>
