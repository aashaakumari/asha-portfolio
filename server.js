const express = require("express");
const fs = require("fs");
const app = express();

app.use(express.json());
app.use(express.static(__dirname));

app.post("/contact", (req, res) => {
  const newData = req.body;

  let existingData = [];
  if (fs.existsSync("data.json")) {
    const file = fs.readFileSync("data.json");
    existingData = JSON.parse(file);
  }

  existingData.push(newData);
  fs.writeFileSync("data.json", JSON.stringify(existingData, null, 2));

  res.json({ message: "Message saved successfully!" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
});
