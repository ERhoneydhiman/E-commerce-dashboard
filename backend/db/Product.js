const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  userID: { type: String, required: true },
  company: { type: String, required: true },
  image: {
    filename: { type: String, required: true },
    contentType: { type: String, required: true },
    imageBase64: { type: String, required: true },
  },
});

module.exports = mongoose.model("products", productSchema);
