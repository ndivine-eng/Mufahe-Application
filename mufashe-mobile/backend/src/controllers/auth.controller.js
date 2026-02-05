const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

const isEmail = (value) => /\S+@\S+\.\S+/.test(value);

// Removes spaces/dashes, keeps leading + if present, or digits only
const normalizePhone = (p) => (p || "").trim().replace(/[\s-]/g, "");

// Optional: make name compare more consistent (trim only)
const normalizeName = (n) => (n || "").trim();

exports.register = async (req, res) => {
  try {
    let { name, email, phone, password } = req.body;

    name = normalizeName(name);
    email = email ? email.trim().toLowerCase() : undefined;
    phone = phone ? normalizePhone(phone) : undefined;

    if (!name || !password) {
      return res.status(400).json({
        message: "name and password are required",
      });
    }

    // require at least one: email OR phone
    if (!email && !phone) {
      return res.status(400).json({
        message: "Provide at least one: email or phone",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        message: "Password must be at least 6 characters",
      });
    }

    // Check duplicates
    if (email) {
      const existsEmail = await User.findOne({ email });
      if (existsEmail) return res.status(409).json({ message: "Email already exists" });
    }

    if (phone) {
      const existsPhone = await User.findOne({ phone });
      if (existsPhone) return res.status(409).json({ message: "Phone already exists" });
    }

    // If you allow login by name, name should be unique
    const existsName = await User.findOne({ name });
    if (existsName) return res.status(409).json({ message: "Name already exists" });

    const passwordHash = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      phone,
      passwordHash,
    });

    const token = signToken(user._id);

    return res.status(201).json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email || null,
        phone: user.phone || null,
      },
    });
  } catch (err) {
    // handle Mongo unique errors nicely
    if (err.code === 11000) {
      const field = Object.keys(err.keyPattern || {})[0] || "field";
      return res.status(409).json({ message: `${field} already exists` });
    }
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    if (!identifier || !password) {
      return res.status(400).json({
        message: "identifier (email, phone, or name) and password are required",
      });
    }

    const idRaw = String(identifier).trim();
    const idEmail = idRaw.toLowerCase();
    const idPhone = normalizePhone(idRaw);

    // ✅ Debug (keep for now)
    console.log("LOGIN identifier:", idRaw);

    let query;
    if (isEmail(idRaw)) {
      query = { email: idEmail };
    } else if (/^\+?\d+$/.test(idPhone)) {
      // digits or +digits
      query = { phone: idPhone };
    } else {
      // fallback = name login
      query = { name: idRaw };
    }

    console.log("LOGIN query:", query);

    const user = await User.findOne(query);
    console.log("USER FOUND?", !!user);

    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const ok = await bcrypt.compare(password, user.passwordHash);
    console.log("PASSWORD MATCH?", ok);

    if (!ok) return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user._id);

    return res.json({
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email || null,
        phone: user.phone || null,
      },
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};

exports.me = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-passwordHash");
    if (!user) return res.status(404).json({ message: "User not found" });
    return res.json(user);
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }
};
