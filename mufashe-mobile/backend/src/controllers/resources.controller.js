const Resource = require("../models/Resource");

// GET /resources?category=land&language=English
exports.listResources = async (req, res) => {
  try {
    const { category, language } = req.query;

    const filter = {};
    if (category) filter.category = category;
    if (language) filter.language = language;

    const resources = await Resource.find(filter)
      .sort({ createdAt: -1 })
      .select("title category language minutes createdAt");

    return res.json({ ok: true, resources });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
};

// POST /resources/seed (optional for MVP)
exports.seedResources = async (req, res) => {
  try {
    const count = await Resource.countDocuments();
    if (count > 0) return res.json({ ok: true, message: "Already seeded", count });

    await Resource.insertMany([
      { title: "How to resolve a land dispute", category: "land", language: "English", minutes: 5 },
      { title: "Your Employment Contract", category: "employment", language: "English", minutes: 8 },
      { title: "Registering a Small Business", category: "commercial", language: "English", minutes: 6 },
    ]);

    return res.json({ ok: true, message: "Seeded resources" });
  } catch (err) {
    return res.status(500).json({ ok: false, message: err.message });
  }
};
