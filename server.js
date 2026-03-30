const express = require("express");
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.static(__dirname));

// 🔥 MongoDB connect
mongoose.connect("mongodb+srv://asha:9939@cluster0.gmze3c3.mongodb.net/portfolioDB")
.then(() => console.log("MongoDB connected"))
.catch(err => console.log(err));

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String
});

const Contact = mongoose.model("Contact", contactSchema);

// POST route
app.post("/contact", async (req, res) => {
  try {
    const newData = new Contact(req.body);
    await newData.save();
    res.json({ message: "Message saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error saving data" });
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
