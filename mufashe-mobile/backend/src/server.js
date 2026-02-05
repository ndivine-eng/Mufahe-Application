const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();

const app = express();

// Allow Expo app to call your API
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => res.send("Mufashe API running ✅"));

// Routes
app.use("/api/auth", require("./routes/auth.routes"));

const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
