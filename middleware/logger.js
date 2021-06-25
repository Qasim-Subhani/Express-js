const log = (req, res, next) => {
  console.log("Request Executed...");
  next();
};

module.exports = log;
