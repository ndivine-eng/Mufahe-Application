const mongoose = require("mongoose");

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    category: { type: String, required: true }, // land, employment, family, commercial
    language: { type: String, default: "English" },
    minutes: { type: Number, default: 5 },
    content: { type: String, default: "" }, // later: full text
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema); // => resources
