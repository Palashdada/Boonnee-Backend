const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const { dbConnect } = require("./utiles/db");
// app.use(express.json());

// const corsOptions = {
//   origin: "https://dreamy-gaufre-cdd089.netlify.app",
//   credentials: true,
//   methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
//   allowedHeaders: ["Content-Type", "Authorization"],
//   optionsSuccessStatus: 200,
// };

// app.use(cors(corsOptions));
// app.options("*", cors(corsOptions));
app.use(
  cors({
    origin: ["https://dreamy-gaufre-cdd089.netlify.app"],
    credentials: true,
  })
);
const port = process.env.PORT;
app.use(bodyParser.json());
app.use("/api", require("./routes/authRoutes"));

app.get("/", (req, res) => res.send("Hello World"));
dbConnect();
app.listen(port, () => console.log(`server is running on port ${port}!`));
