const validateUserAuth = (req, res, next) => {
  if (!req.body.email || !req.body.password) {
    return res.status(400).json({
      error: 'Bad Request',
      success: false,
      message: "Something went wrong",
      err: "email or password missing"
    });
  }
  next();
}

module.exports = {
  validateUserAuth,
}