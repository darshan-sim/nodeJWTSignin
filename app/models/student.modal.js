module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("students", {
		studentId: {
			type: Sequelize.STRING
		},
		enrollmentNumber: {
			type: Sequelize.STRING
		},
		isVerified: {
			type: Sequelize.STRING
		},
		placementCellId: {
			type: Sequelize.STRING
		}
	});
	return User;
};
