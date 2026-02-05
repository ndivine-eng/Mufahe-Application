const mongoose = require("mongoose");

const consultationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: false },
    question: { type: String, required: true },
    answer: { type: String, required: true },
    language: { type: String, default: "English" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Consultation", consultationSchema); 
