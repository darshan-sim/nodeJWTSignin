// module.exports = (sequelize, Sequelize) => {
// 	const User = sequelize.define(
// 		"users",
// 		{
// 			userId: Sequelize.STRING,
// 			username: Sequelize.STRING,
// 			email: Sequelize.STRING,
// 			password: Sequelize.STRING,
// 			role: Sequelize.STRING,
// 			isActive: Sequelize.STRING
// 		},
// 		{
// 			defaultScope: {
// 				attributes: { exclude: ["password"] }
// 			}
// 		}
// 	);
// };

module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define(
		"user",
		{
			userId: Sequelize.STRING,
			username: Sequelize.STRING,
			email: Sequelize.STRING,
			password: Sequelize.STRING,
			role: Sequelize.STRING,
			isActive: Sequelize.STRING
		},
		{
			defaultScope: {
				attributes: { exclude: ["password"] }
			}
		}
	);
	return User;
};
