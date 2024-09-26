const morgan = require("morgan");
const Logger = require("./middlewares/logger");

const express = require("express");
const app = express();

//! -----------------------------------------
// برای اینکه بتونیم فایل های ای ان وی رو بخونیم باید از این پکیج استفاده کنیم
const dotEnv = require("dotenv");
dotEnv.config();

//! ------------Create-Server----------------------------
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
//! -------DATA-BASE-📲------------------------------
const courses = [
  { id: 1, name: "Node.js" },
  { id: 2, name: "React" },
  { id: 3, name: "Angular" },
];
// console.log(courses);
//! ----------built in Middleware Function--------------
//? Req ==> Middleware ==> Middleware ==> Response
// اینجا از این میدلور استفاده کردیم و کاری ک انجام میده میاد ریکوئست رو بررسی میکنه ببینه داخل بادی جیسون قرار داره یا ن اگه وجود داشت میده به اپ دات گت یا دستورات بعدی
app.use(express.json());

// این برای درخواست های قدیمی ک به صورت فرم یورال ارسال میشه داخل بادی میاد میفهمه
// key=value&&key2=value2
// برای اینکه داخل ترمینال وارنینگ نشون نده { extended: true }
app.use(express.urlencoded({ extended: true }));

// اینم یک میدلور بیلت این ک میذاره فایل های استاتیک ما نمایش داده بشن
app.use(express.static("public"));

// این مرگان واسه اینه هر ریکوئستی زده میشه ی لاگ میندازه برامون
app.use(morgan("tiny"));

// !-----Create--Custom-Middleware------------------------
// برای نوشتن کاستوم میدلور
// نکس رو حتما مینویسیم چون باعث میشه کنترل عملیات رو بتونیم بدیم به میدلور بعدی
app.use((req, res, next) => {
  console.log("Request Processing...");
  next();
});

app.use(Logger);

//! ----------------------------------------------------------
// اینجا هم یک نوع میدلور ک درخواست رو میگیره و یک سری پردازش میکنه و جواب رو برمیگردونه
app.get("/", (req, res) => {
  res.send("Hello World");
});
//!---------Method-GET-------------------------------------

app.get("/api/courses", (req, res) => {
  res.json(courses);
});
//! -------------------------------------------------

// علامت ؟ ینی اگه پارامتر وجود داشت بفرست اگه وجود نداشت هم خطا نده
app.get("/api/courses/:id/:name", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  // "/api/courses/:id/:name?sort=id" ==> bade ? mishe query hamun !
  res.json([course, req.params.name, req.query.sort]);
});
//! ----Method-POST------------------------------------------
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
//!---Method-PUT------------------------------------------

app.put("/api/courses/:id", (req, res) => {
  const course = courses.find((c) => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("Course not found");
  const { name } = req.body;
  if (!name || name.length < 3) return res.status(400).send("Name is required");
  course.name = name;
  res.send(courses);
});
//! ---Method-DELETE------------------------------------------

app.delete("/api/courses/:id", (req, res) => {
  const index = courses.findIndex((c) => c.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).send("Course not found");
  courses.splice(index, 1);
  res.send(courses);
});
//! --------------------------------------------
