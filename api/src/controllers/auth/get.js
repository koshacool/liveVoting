const { sendOne } = require('../../middleware');
const { MethodNotAllowed } = require('rest-api-errors');

const get = ({ User }) => async (req, res, next) => {
    try {
        const user = await User.findOne({ _id: req.user.id }, { email: 1, fullName: 1 });

        if (!user) {
            throw new MethodNotAllowed(405, 'Some went wrong.');
        }

        return sendOne(res, { user });
    } catch (error) {
        next(error);
    }
};

module.exports = get;