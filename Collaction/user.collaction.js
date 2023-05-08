const Service = require('../Services/user.service');
const bcrypt = require('bcrypt');
const { genarateToken } = require('../Utils/genarateToken');

exports.createUserCollaction = async (req, res) => {
	try {
		const data = await Service.createUserService(req.body);

		res.status(200).json({
			status: 'Success',
			message: 'User Create Successfully..',
		});
	} catch (error) {
		res.status(404).json({
			status: 'Failed',
			message: error.message,
		});
	}
};

exports.loginUserCollaction = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await Service.loginUserService(email);

		if (!user) {
			return res.status(404).json({
				status: 'Failed',
				message: 'User Not Exist.',
			});
		}

		const isMatch = bcrypt.compareSync(password, user.password);

		if (!isMatch) {
			return res.status(404).json({
				status: 'Failed',
				message: 'Invalid credentials.',
			});
		}

		const token = genarateToken(email, user._id);

		const { password: pass, ...other } = user.toObject();

		res.status(200).json({
			status: 'Success',
			message: 'User Get Successfully..',
			user: other,
			token,
		});
	} catch (error) {
		res.status(404).json({
			status: 'Failed',
			message: 'User Not Get Successfully..',
		});
	}
};

exports.getMeCollaction = async (req, res) => {
	try {
		const { email } = req.user;
		console.log(email);
		const user = await Service.meService(email);

		const { password, ...other } = user.toObject();

		res.status(200).json({
			status: 'Success',
			message: 'User Get Successfully..',
			user: other,
		});
	} catch (error) {
		res.status(404).json({
			status: 'Failed',
			message: 'Invalid User',
		});
	}
};

exports.getAllUserCollaction = async (req, res) => {
	try {
		const result = await Service.getAllUserService();

		res.status(200).json({
			status: 'Success',
			message: 'User Get Successfully..',
			result,
		});
	} catch (error) {
		res.status(404).json({
			status: 'Failed',
			message: 'User Not Get.',
		});
	}
};

exports.createFriendCollaction = async (req, res) => {
	try {
		const { id } = req.params;

		const result = await Service.createFriendService(id, req.user.email);
		console.log('ashgdas');
		res.status(200).json({
			status: 'Success',
			message: 'Add Friend Successfully.',
			user: result,
		});
	} catch (error) {
		res.status(404).json({
			status: 'Failed',
			message: 'Friend Not Added.',
		});
	}
};

exports.removeFriendCollaction = async (req, res) => {
	try {
		const { id } = req.params;

		const result = await Service.removeFriendService(id, req.user.email);

		res.status(200).json({
			status: 'Success',
			message: 'Remove Friend Successfully.',
			user: result,
		});
	} catch (error) {
		res.status(404).json({
			status: 'Failed',
			message: 'Friend Not Remove.',
		});
	}
};

exports.postLikeCollaction = async (req, res) => {
	try {
		const result = await Service.postLikeService(req.params.id, req.user.id);

		res.status(200).json({
			status: 'Success',
			message: 'Like Add Successfully.',
			post: result,
		});
	} catch (error) {
		res.status(404).json({
			status: 'Failed',
			message: error.message,
		});
	}
};

exports.getSingleUserCollaction = async (req, res) => {
	try {
		const { id } = req.params;
		const result = await Service.getSingleUserService(id);

		res.status(200).json({
			status: 'Success',
			message: 'User Get Successfully.',
			singleUser: result.result,
			SinglePost: result.post,
		});
	} catch (error) {
		res.status(404).json({
			status: 'Failed',
			message: 'User Not Get.',
		});
	}
};
