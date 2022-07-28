const makeSafe = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const globalErrorHandler = (err, req, res, next) => {
  console.log(err);
  return res
    .status(500)
    .json(JSON.stringify(err.message) || "Internal Server Error");
};

const requestLogger = (req, res, next) => {
  console.log({ method: req.method, url: req.url });
  next();
};

const corsOptions = {
  origin: ["http://localhost:3000", "http://localhost:3001"],
  optionsSuccessStatus: 200,
};

module.exports = {
  makeSafe,
  corsOptions,
  requestLogger,
  globalErrorHandler,
};
