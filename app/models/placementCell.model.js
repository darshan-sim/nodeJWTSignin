module.exports = (sequelize, Sequelize) => {
	const PlacementCell = sequelize.define("placement_cells", {
		placementCellId: {
			type: Sequelize.INTEGER,
			autoIncrement: true,
			primaryKey: true
		},
		adminId: {
			type: Sequelize.INTEGER,
			allowNull: false,
			references: {
				model: "users",
				key: "userId"
			},
			onUpdate: "CASCADE",
			onDelete: "RESTRICT"
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
	return PlacementCell;
};
