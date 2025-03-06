const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;

verifyToken = (req, res, next) => {
	const authHeader = req.header("Authorization");
	if (!authHeader) {
		return res.status(403).send({ message: "No token provided!" });
	}
	let token = req.header("Authorization").split(" ")[1];
	if (!token) {
		return res.status(403).send({
			message: "No token provided!"
		});
	}
	// jwt.verify(token, config.secret, (err, decode))
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
				error: err
			});
		}
		req.userId = decoded.id;
		next();
	});
};

const checkRole = (requiredRole) => {
	return async (req, res, next) => {
		try {
			const user = await User.findByPk(req.userId);
			if (!user) {
				return res.status(404).send({ message: "User not found!" });
			}

			const role = await user.role();
			if (!role) {
				return res.status(404).send({ message: "Role not assigned!" });
			}

			if (role.toLowerCase() === requiredRole.toLowerCase()) {
				return next();
			}

			return res.status(403).send({ message: `Require ${requiredRole} Role!` });
		} catch (error) {
			console.error(error);
			return res.status(500).send({ message: "Unable to validate User role!" });
		}
	};
};

const authJwt = {
	verifyToken,
	isAdmin: checkRole("admin"),
	isStudent: checkRole("student"),
	isRecruiter: checkRole("recruiter"),
	isPlacementCell: checkRole("placementCell")
};
module.exports = authJwt;
