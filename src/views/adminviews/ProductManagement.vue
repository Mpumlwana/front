<template>
  <div class="management-section">
    <h3>Manage Products</h3>
    <button @click="addProduct">Add Product</button>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('id')">ID</th>
          <th @click="sortBy('name')">Name</th>
          <th @click="sortBy('category')">Category</th>
          <th @click="sortBy('price')">Price</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="product in products" :key="product.id">
          <td>{{ product.productId }}</td>
          <td>{{ product.name }}</td>
          <td>{{ product.category.name }}</td>
          <td>{{'R' + product.price}}</td>
          <td>
            <button @click="updateProduct">Update</button>
            <button @click="deleteProduct(product.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import { getProducts } from '@/services/productService';
export default {
  data() {
    return {
      products: [
      ],
      sortKey: '',
      sortAsc: true
    };
  },
  async created() {
    try {
      this.products = await getProducts();  // Fetch products on component creation
    } catch (error) {
      console.error('Error fetching products:', error);  // Handle any errors
    }
  },
  methods: {
    sortBy(key) {
      this.sortKey = key;
      this.sortAsc = !this.sortAsc;
    },
    addProduct() {
      // Implement add product logic here
    },
    updateProduct() {
      // Dummy update function
      alert('Update product functionality will be implemented later.');
    },
    deleteProduct(id) {

      this.products = this.products.filter(product => product.id !== id);
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
  background-color: #2980b9;
}
</style>