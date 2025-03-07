const db = require("../models");
const PlacementCell = db.placementCell;

exports.getPlacementCell = async (req, res) => {
	const { id } = req.params;
	const placementCell = await PlacementCell.findOne({
		where: {
			placementCellId: id
		}
	});
	if (!placementCell) {
		res.status(404).send({ message: "Placement cell not found!" });
	}
	return res.status(200).send(placementCell);
};
