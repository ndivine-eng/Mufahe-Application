const authRoutes = require("./routes/auth.routes");
const consultRoutes = require("./routes/consult.routes");
const consultationsRoutes = require("./routes/consultations.routes");
const resourcesRoutes = require("./routes/resources.routes");

app.use("/auth", authRoutes);
app.use("/consult", consultRoutes);
app.use("/consultations", consultationsRoutes);
app.use("/resources", resourcesRoutes);
