log = (req, res, next) => {
  console.log("Logger is working");
  next();
};
module.exports = log;
