const Consultation = require("../models/Consultation");

exports.consult = async (req, res) => {
  try {
    const { question, language = "English", userId = null } = req.body;

    if (!question) {
      return res.status(400).json({ ok: false, message: "Question is required" });
    }

    // MVP mock answer (later: RAG + AI)
    const answer =
      "MVP response: I can help. Next, MUFASHE will retrieve relevant legal documents and explain them in simple language.";

    const saved = await Consultation.create({
      userId: userId || undefined,
      question,
      answer,
      language,
    });

    return res.json({
      ok: true,
      consultationId: saved._id,
      question,
      language,
      answer,
      createdAt: saved.createdAt,
    });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
};
