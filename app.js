// const path = require("node:path");
// const data = path.parse(__filename);
// console.log(data);
// -----------------------------------------
const os = require("node:os");
const total = os.totalmem();
const free = os.freemem();
console.log("free ===>", free, "Total ===>", total);
// ------------------------------------
