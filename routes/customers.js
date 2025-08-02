const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');

router.post("/register", async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone } = req.body;

    const existingUser = await Customer.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const customer = new Customer({ firstName, lastName, email, password, phone });
    await customer.save();

    res.status(201).json({ message: "Registration successful" });
  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ message: "Server error" });
  }
});


router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const customer = await Customer.findOne({ email });
    if (!customer || customer.password !== password)
      return res.status(401).json({ message: "Invalid credentials" });

    res.json({ message: "Login successful", token: "dummy-token" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
