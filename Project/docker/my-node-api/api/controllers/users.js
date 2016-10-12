var User = require('../models/user');



function createUser(req, res) {
	if (req.body.username == null || req.body.password == null) {
		res.sendStatus(400);
	} else {
		User.create(req.body, function (err, user) {
			if (err) {
				console.log(err.message);
				res.sendStatus(400);
			}
			console.log(req.body);
			res.sendStatus(201);
		});
	}

};

function updateUser(req, res) {
	console.log(req.body);
	User.findByIdAndUpdate(
		req.params.id,
		{ $set: req.body },
		{ runValidators: true },
		function (err, user) {
			if (err) return res.status(500).send(err);
			res.sendStatus(200);
		}
    );
}

module.exports = {
	create: createUser,
	update: updateUser
};
