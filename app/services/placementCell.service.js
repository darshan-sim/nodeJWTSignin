const db = require("../models");
const PlacementCell = db.placementCell;

exports.createPlacementCell = async (data, transaction) => {
	return await PlacementCell.create(data, { transaction });
};

exports.getPlacementCell = async (id) => {
	return await PlacementCell.findOne({
		where: {
			placementCellId: id
		}
	});
};
