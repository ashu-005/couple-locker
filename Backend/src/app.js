const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/lockers", require("./routes/lockerRoutes"));

app.get("/", (req, res) => {
    res.send("Server Working");
});

module.exports = app;