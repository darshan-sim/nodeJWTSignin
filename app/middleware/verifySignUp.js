const db = require("../models");
const ROLE = db.ROLE;
const User = db.user;

checkDuplicateUsernameOrEmail = async (req, res, next) => {
	try {
		// Username
		let user = await User.findOne({
			where: {
				username: req.body.username
			}
		});
		if (user) {
			return res.status(400).send({
				message: "Failed! Username is already in use!"
			});
		}
		// Email
		user = await User.findOne({
			where: {
				email: req.body.email
			}
		});
		if (user) {
			return res.status(400).send({
				message: "Failed! Email is already in use!"
			});
		}
		next();
	} catch (error) {
		return res.status(500).send({
			message: "Unable to validate Username!",
			error: `error: ${error}`,
			req: `req: ${req.body}`
		});
	}
};

checkRolesExisted = (req, res, next) => {
	if (req.body.role) {
		if (!ROLE.includes(req.body.role)) {
			res.status(400).send({
				message: "Failed! Role does not exist = " + req.body.role
			});
			return;
		}
	}
	next();
};

const verifySignUp = {
	checkDuplicateUsernameOrEmail,
	checkRolesExisted
};
module.exports = verifySignUp;
