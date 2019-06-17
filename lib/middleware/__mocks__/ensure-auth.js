module.exports = () => (req, res, next) => {
  req.user = { sub: '12345' };
  console.log('IT WORKED!!!!!!!!!');
  return next();
};
