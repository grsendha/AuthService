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
    res.status(500).json({ error: 'Something went wrong in user-controller' });
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

module.exports = {
  create, destroy
}