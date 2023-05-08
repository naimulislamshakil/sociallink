const jwt = require('jsonwebtoken');
const { promisify } = require('util');

exports.verifyToken = async (req, res, next) => {
	try {
		const token = req.headers?.authorization?.split(' ')[1];

		if (!token) {
			return res.status(404).json({
				status: 'Failed',
				message: 'You Are Not Logged In.',
			});
		}

		const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

		req.user = decoded;
		next();
	} catch (error) {
		res.status(404).json({
			status: 'Failed',
			message: 'Invalid Token',
		});
	}
};
