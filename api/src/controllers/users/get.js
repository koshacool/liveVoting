const { sendOne } = require('../../middleware/index');

const get = ({ User }) => async (req, res, next) => {
  console.log('asdfasdf', User)
  try {
    const user = await User.findById(req.params._id);
    return sendOne(res, { user });

  } catch (error) {
    next(error);
  }
};

module.exports = get;
