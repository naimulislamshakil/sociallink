const Service = require('../Services/post.service');

exports.createPostCollaction = async (req, res) => {
	try {
		const result = await Service.createPostService(req.body);

		res.status(200).json({
			status: 'Success',
			message: 'Post Created Successfully.',
			result,
		});
	} catch (error) {
		res.status(404).json({
			status: 'Failed',
			message: 'Post Not Created.',
		});
	}
};
