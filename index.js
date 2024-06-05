const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");
const db = require("./db/connection");
const express = require("express");
const app = express();
const PORT = 4000;
app.use(express.json());

app.use("/user", userRoutes);
app.use("/admin", adminRoutes);

app.get("/", (req, res) => res.send("<h1>Node Server is running</h1>"));

// Listen to port only when db connection is succesfful
db()
  .then(() => {
    app.listen(PORT);
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB");
  });
