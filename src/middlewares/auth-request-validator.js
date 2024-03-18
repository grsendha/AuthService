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

const validateIsAdminRequest = (req, res, next) => {
  if (!req.body.id) {
    return res.status(400).json({
      success: false,
      data: {},
      err: "User id not given",
      message: 'Something went wrong '
    })
  }
  next();
}

module.exports = {
  validateUserAuth, validateIsAdminRequest
}