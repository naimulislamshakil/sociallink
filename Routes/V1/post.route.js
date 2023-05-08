const router = require('express').Router();
const Collaction = require('../../Collaction/post.collaction');
const { verifyToken } = require('../../Middleware/verifyToken');

router.route('/createPost').post(verifyToken, Collaction.createPostCollaction);

module.exports = router;
