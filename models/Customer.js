const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    password: String,
    phone: String,
});

module.exports = mongoose.model("Customer", customerSchema);
