const express = require("express");
const app = express();
// برای اینکه بتونیم فایل های ای ان وی رو بخونیم باید از این پکیج استفاده کنیم
const dotEnv = require("dotenv");
dotEnv.config();

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

app.get("/", (req, res) => {
  res.send("Hello World");
});
