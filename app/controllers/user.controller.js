const db = require("../models");
const User = db.user;

exports.allAccess = (req, res) => {
	res.status(200).send("Public Content.");
};
exports.userBoard = (req, res) => {
	res.status(200).send("User Content.");
};
exports.adminBoard = (req, res) => {
	const user = res.status(200).send("Admin Content.");
};
exports.moderatorBoard = (req, res) => {
	res.status(200).send("Moderator Content.");
};
exports.getSignedUser = async (req, res) => {
	try {
		const user = await User.findOne({
			where: {
				userId: req.userId
			}
		});
		if (!user) {
			return res.status(404).send({ message: "User not found." });
		}
		res.status(200).send(user);
	} catch (error) {
		console.error(error);
		res.status(500).send({ message: "Server error." });
	}
};
