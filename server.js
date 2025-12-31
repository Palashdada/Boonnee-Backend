const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { dbConnect } = require("./utiles/db");

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
const port = process.env.PORT;
app.use(bodyParser.json());
app.use("/api", require("./routes/authRoutes"));

app.get("/", (req, res) => res.send("Hello World"));
dbConnect();
app.listen(port, () => console.log(`server is running on port ${port}!`));
