const AdminService = require('../services/adminService');

exports.getAdmins = async (req, res) => {
  try {
    const admins = await AdminService.getAllAdmins();
    res.status(200).json(admins);  // Return all categories as JSON
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ message: 'Error fetching categories' });
  }
};

exports.loginAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
      return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Call the service method to login the admin
    const admin = await AdminService.loginAdmin(username, password);

    // Check if the login was successful
    if (!admin) {
      return res.status(412).json({ message: 'Invalid username or password.' }); // Precondition failed
    }

    // Login success, return the admin info or a success message
    res.status(200).json({ message: 'Login successful', admin });
  } catch (error) {
    console.error('Error during admin login:', error);
    res.status(500).json({ message: 'Error during admin login' });
  }
};