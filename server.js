const express = require("express");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const cors = require("cors");
const mongoose = require("mongoose");

dotenv.config();

const app = express();

const PORT = process.env.PORT || 4500;

app.use(express.json());
app.use(cors());

//routes
const userRoutes = require("./routes/user");

// readdirSync("./routes").map((route) => {
//   console.log("route : ", route);
//   app.use("/api/", require("./routes/" + route));
// });
app.use("/api/user", userRoutes);

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connected."))
  .catch((err) => console.log("Connection Error", err));

app.listen(PORT, () => console.log(`Server started on port : ${PORT} `));
