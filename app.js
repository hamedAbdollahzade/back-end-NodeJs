const express = require("express");
const app = express();

// اگر این میدل‌ور را استفاده نکنید و تلاش کنید به req.body دسترسی پیدا کنید، معمولاً undefined دریافت خواهید کرد، زیرا Express نمی‌تواند بدنه درخواست را به درستی تجزیه کند.
app.use(express.json());

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
console.log(courses);

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
  // "/api/courses/:id/:name?sort=id" ==> bade ? mishe query hamun !
  res.json([course, req.params.name, req.query.sort]);
});

app.post("/api/courses", (req, res) => {
  const { name } = req.body;
  if (!name || name.length < 3) return res.status(400).send("Name is required");
  const newCourse = {
    id: courses.length + 1,
    name: name,
  };
  courses.push(newCourse);
  res.send(courses);
});

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  const { name } = req.body;
  if (!name || name.length < 3) return res.status(400).send("Name is required");
  course.name = name;
  res.send(courses);
});

app.delete("/api/courses/:id", (req, res) => {
  const index = courses.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Course not found");
  courses.splice(index, 1);
  res.send(courses);
});
