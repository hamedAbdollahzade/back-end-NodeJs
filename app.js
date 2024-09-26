const morgan = require("morgan");
const Logger = require("./middlewares/logger");

const express = require("express");
const app = express();

const couresesRoute = require("./routes/courses-route");

//! -----------------------------------------
// برای اینکه بتونیم فایل های ای ان وی رو بخونیم باید از این پکیج استفاده کنیم
const dotEnv = require("dotenv");
dotEnv.config();

//! ------------Create-Server----------------------------
const port = process.env.APP_PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

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

// با این دستور میتونیم بفهمیم تو چه محیطی هستیم
console.log(app.get("env")); // ==> development

// حالا میتونیم شرط بذاریم ک مورگان تو پروداکشن اجرا نشه و فقط تو حالت دولوپمنت اجرا بشه
// این مرگان واسه اینه هر ریکوئستی زده میشه ی لاگ میندازه برامون
if (app.get("env") === "development") {
  app.use(morgan("tiny"));
}

// !-----Create--Custom-Middleware------------------------
// برای نوشتن کاستوم میدلور
// نکس رو حتما مینویسیم چون باعث میشه کنترل عملیات رو بتونیم بدیم به میدلور بعدی
app.use((req, res, next) => {
  console.log("Request Processing...");
  next();
});

app.use(Logger);

// اینجا از میدلور استفاده میکنیم برای اینکه این ادرس رو وصل کنه به فایل روت هامون
app.use("/api/courses", couresesRoute);
//! ----------------------------------------------------------
// اینجا هم یک نوع میدلور ک درخواست رو میگیره و یک سری پردازش میکنه و جواب رو برمیگردونه
app.get("/", (req, res) => {
  res.send("Hello World");
});
