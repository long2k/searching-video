const Storage = require('../service/minio/index')
module.exports = async (req, res, next) => {
	try {
		let { bucket, fn } = req.params;
		let ds = await Storage.getItem(bucket, fn);
		if (!ds) return res.status(404).end('Not found.');
		return ds.pipe(res);
	} catch (err) {
		return res.serverError(err.message);
	}
};
