const express = require("express");
const { Connection } = require("./config/db");
const { userRoute } = require("./routes/userRoutes");
require("dotenv").config();
const app = express();
app.use(express.json());

app.use("/users", userRoute);

app.get("/", (req, res) => {
  res.send("Welcome Shaktiman");
});

app.listen(process.env.PORT, async () => {
  try {
    await Connection;
    console.log("Connected to Mongo-DB");
  } catch (error) {
    console.log("Did Not Connected to Mongo-DB");
    Console.log({ msg: error.message });
  }
  console.log(`Server ise Running at Port ${process.env.PORT}`);
});
