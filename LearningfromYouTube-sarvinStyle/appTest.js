// const path = require("node:path");
// const data = path.parse(__filename);
// console.log(data);
// -----------------------------------------
// const os = require("node:os");
// const total = os.totalmem();
// const free = os.freemem();
// console.log("free ===>", free, "Total ===>", total);
// ------------------------------------
const fs = require("node:fs");
//! Sync
// const files = fs.readdirSync("./");
// console.log(files);
//! Async
// const files = fs.readdir("./", (err, files) => {
//   if (err) {
//     console.log("Error ==>", err);
//   } else console.log(files);
// });
// console.log(files);
// ------------------------------------------
// const EventEmitter = require("node:events");
// const emitter = new EventEmitter();
// // اول این نوشته میشه
// emitter.on("MessageLogged", (data) => {
//   console.log("Listener called", data);
// });
// // بعد اینجا زنگوله به صدا در میاد
// emitter.emit("MessageLogged", { id: 1, name: "Hamed-AB" });
// ------------------------------------------
const http = require("node:http");

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.write("Hello from Home Page ");
    res.end();
  }
  if (req.url === "/api/course") {
    res.write(
      JSON.stringify([
        { id: 1, name: "Node.js" },
        { id: 2, name: "React.js" },
        { id: 3, name: "Angular.js" },
      ])
    );
    res.end();
  }
});

/// ! روش قدیمی
// server.on("connection", (socket) => {
//   console.log("New Connection is Connected");
// });

server.listen(3000);
console.log("server is Listening in port 3000");
// -----------------------------------------------
