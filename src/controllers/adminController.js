import AdminService from '../services/adminService';

export default {
  methods: {
    fetchAdmins() {
      AdminService.getAllAdmins()
        .then(response => {
          this.admins = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the admins!", error);
        });
    },

    loginAdmin(loginData) {
      AdminService.loginAdmin(loginData)
        .then(response => {
          if (response.status === 200) {
            console.log('Login successful');
            // Handle successful login, such as navigating to dashboard
            this.$router.push({ name: 'AdminDashboard' });
          } else {
            console.error('Login failed');
            // Handle failed login, e.g., show error message
          }
        })
        .catch(error => {
          console.error('Error during admin login:', error);
        });
    }
  }
};
