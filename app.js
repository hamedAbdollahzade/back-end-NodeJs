const express = require("express");
const app = express();
// برای اینکه بتونیم فایل های ای ان وی رو بخونیم باید از این پکیج استفاده کنیم
const dotEnv = require("dotenv");
dotEnv.config();

const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

const courses = [
  { id: 1, name: "Node.js" },
  { id: 2, name: "React" },
  { id: 3, name: "Angular" },
];

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.get("/api/courses", (req, res) => {
  res.json(courses);
});

// علامت ؟ ینی اگه پارامتر وجود داشت بفرست اگه وجود نداشت هم خطا نده
app.get("/api/courses/:id/:name", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  res.json([course, req.params.name , req.query.sort]);
});
