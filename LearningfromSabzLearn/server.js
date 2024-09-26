const express = require("express");
const app = express();
require("dotenv").config();

const port = process.env.PORT || 3000;
app.listen(port, (err) =>
  err ? console.log(err) : console.log(`server is runnig in port ${port}`)
);

app.get("/", (req, res) => {
  res.send("Salam Express");
});

app.get("/api/customers", (req, res) => {
  res.send([
    { id: 1, name: "hamed" },
    { id: 2, name: "saeed" },
  ]);
});
