module.exports = () => (req, res, next) => {
  req.user = { sub: '12345' };
  return next();
};
