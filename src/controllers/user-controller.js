const UserService = require('../services/user-service');


const userService = new UserService();

const create = async (req, res) => {
  try {

    const user = await userService.createUser({
      email: req.body.email,
      password: req.body.password
    });

    res.status(201).json({
      success: true,
      data: user,
      message: 'User created successfully',
      error: null,
    });
  } catch (error) {
    res.status(error.statusCode).json({
      message: error.message,
      data: null,
      success: false,
      err: error.explanation
    });
  }


}
const destroy = async (req, res) => {
  try {
    const user = await userService.destroy(req.params.userId);
    res.status(200).json({
      success: true,
      data: user,
      message: 'User deleted successfully',
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong in user-controller' });
  }
}

const signIn = async (req, res) => {
  try {
    const response = await userService.signIn(req.body.email, req.body.password);

    res.status(200).json({
      success: true,
      data: response,
      message: 'User signed in successfully',
      error: null,
    });
  } catch (error) {
    res.status(500).json({
      error: 'Something went wrong during sign-in'
    });
  }
}

const isAuthenticated = async (req, res) => {
  const token = req.headers['x-access-token'];
  const response = userService.isAuthenticated(token);
  return res.status(200).json({
    message: "user is authenticated"
  });
}
const isAdmin = async (req, res) => {
  try {
    const response = await userService.isAdmin(req.body.id);
    res.status(200).json({
      success: true,
      data: response,
      message: 'Successfull',
      error: null,
    });
  } catch (error) {
    res.status(500).json({ error: 'Something went wrong in user-controller' });
  }

}

module.exports = {
  create,
  destroy,
  signIn,
  isAuthenticated,
  isAdmin,
}