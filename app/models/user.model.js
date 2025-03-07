module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("user", {
		userId: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		username: Sequelize.STRING,
		email: Sequelize.STRING,
		password: Sequelize.STRING,
		role: Sequelize.STRING,
		isActive: Sequelize.STRING
	});
	return User;
};
