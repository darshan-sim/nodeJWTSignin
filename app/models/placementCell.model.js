module.exports = (sequelize, Sequelize) => {
	const User = sequelize.define("placement_cells", {
		placementCellId: {
			type: Sequelize.STRING,
			primaryKey: true
		},
		name: {
			type: Sequelize.STRING
		},
		email: {
			type: Sequelize.STRING
		},
		verified: {
			type: Sequelize.STRING
		}
	});
	return User;
};
