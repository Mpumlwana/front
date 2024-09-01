<template>
  <div class="management-section">
    <h3>Manage Categories</h3>
    <button @click="addCategory">Add Category</button>
    <table>
      <thead>
        <tr>
          <th @click="sortBy('id')">ID</th>
          <th @click="sortBy('name')">Name</th>
          <th @click="sortBy('description')">Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="category in categories" :key="category.id">
          <td>{{ category.categoryId }}</td>
          <td>{{ category.name }}</td>
          <td>{{ category.description }}</td>
          <td>
            <button @click="updateCategory(category.categoryId)">Update</button>
            <button @click="removeCategory(category.categoryId)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getCategories, deleteCategory } from '@/services/categoryService';

export default {
  data() {
    return {
      categories: [],
      sortKey: '',
      sortAsc: true
    };
  },
  async created() {
    try {
      this.categories = await getCategories();  // Fetch categories on component creation
    } catch (error) {
      console.error('Error fetching customers:', error);  // Handle any errors
    }
  },
  async removeCategory(categoryId) {
      if (confirm('Are you sure you want to delete this category?')) {
        try {
          await deleteCategory(categoryId);
          this.fetchCategories(); // Refresh the category list after deletion
        } catch (error) {
          console.error('Error deleting category:', error);
        }
      }
    },

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