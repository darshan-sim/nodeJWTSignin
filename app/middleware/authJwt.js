const jwt = require("jsonwebtoken");
const config = require("../config/auth.config.js");
const db = require("../models/index.js");
const User = db.user;

verifyToken = async (req, res, next) => {
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
	jwt.verify(token, config.secret, async (err, decoded) => {
		if (err) {
			return res.status(401).send({
				message: "Unauthorized!",
				error: err
			});
		}
		const user = await User.findByPk(decoded.userId);
		if (!user) {
			return res.status(404).send({ message: "User not found!", decoded });
		}
		req.user = user;
		next();
	});
};

const checkRole = (requiredRole) => {
	return (req, res, next) => {
		try {
			const role = req.user.role;
			if (!role) {
				return res.status(400).send({ message: "Role not assigned!" });
			}
			if (role.toLowerCase() !== requiredRole.toLowerCase()) {
				return res
					.status(403)
					.send({ message: `Require ${requiredRole} Role!` });
			}
			return next();
		} catch (error) {
			return res.status(500).send({ message: "Unable to validate User role!" });
		}
	};
};

const authJwt = {
	verifyToken,
	isAdmin: checkRole("admin"),
	isStudent: checkRole("student"),
	companyAdmin: checkRole("companyAdmin"),
	placementCellAdmin: checkRole("placementCellAdmin")
};
module.exports = authJwt;
