const config = require("../config/ db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(config.DB, config.USER, config.PASSWORD, {
	host: config.HOST,
	dialect: config.dialect,
	operatorsAliases: false,
	pool: {
		max: config.pool.max,
		min: config.pool.min,
		acquire: config.pool.acquire,
		idle: config.pool.idle
	}
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.user = require("./user.model.js")(sequelize, Sequelize);
db.placementCell = require("./placementCell.model.js")(sequelize, Sequelize);
db.student = require("./student.modal.js")(sequelize, Sequelize);

//users student
db.user.hasOne(db.student, {
	foreignKey: "userId",
	as: "studentProfile"
});
db.student.belongsTo(db.user, {
	foreignKey: "userId",
	as: "user"
});

//users placementCells
db.user.hasOne(db.placementCell, {
	foreignKey: "adminId",
	as: "placementCells"
});
db.placementCell.belongsTo(db.user, {
	foreignKey: "adminId",
	as: "admin"
});

//users recruiter
// db.placementCell.hasMany(db.student, {
// 	foreignKey: "placementCellId",
// 	as: "students"
// });
// db.student.belongsTo(db.placementCell, {
// 	foreignKey: "placementCellId",
// 	as: "placementCell"
// });

db.ROLE = ["superAdmin", "placementCellAdmin", "companyAdmin", "student"];
module.exports = db;
