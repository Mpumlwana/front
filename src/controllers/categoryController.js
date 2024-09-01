const CategoryService = require('../services/categoryService');

export default {
  data() {
    return {
      categories: [] 
    };
  },
  methods: {
    fetchCategories() {
      CategoryService.getAllCategories()
        .then(response => {
          this.categories = response.data;
        })
        .catch(error => {
          console.error("There was an error fetching the categories!", error);
        });
    }
  }
  };
