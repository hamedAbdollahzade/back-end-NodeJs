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
const files = fs.readdir("./", (err, files) => {
  if (err) {
    console.log("Error ==>", err);
  } else console.log(files);
});
console.log(files);
// ------------------------------------------
