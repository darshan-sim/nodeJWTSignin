const config = require("../config/ db.config.js");
const Sequelize = require("sequelize");
// import config from "../config/ db.config.js";
// import Sequelize from "sequelize";``
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
// db.role = require("./role.model.js")(sequelize, Sequelize);
db.placementCell = require("./placementCell.model.js")(sequelize, Sequelize);
db.student = require("./student.modal.js")(sequelize, Sequelize);

// db.role.hasMany(db.user, {
// 	foreignKey: "roleId",
// 	otherKey: "userId"
// });
// db.user.belongsTo(db.role, {
// 	foreignKey: "userId",
// 	otherKey: "roleId"
// });

db.user.hasOne(db.student, {
	foreignKey: "userId",
	as: "studentProfile"
});
db.student.belongsTo(db.user, {
	foreignKey: "userId",
	as: "user"
});

db.user.hasOne(db.placementCell, {
	foreignKey: "userId",
	as: "placementProfile"
});
db.placementCell.belongsTo(db.user, {
	foreignKey: "userId",
	as: "user"
});

db.placementCell.hasMany(db.student, {
	foreignKey: "placementCellId",
	as: "students"
});
db.student.belongsTo(db.placementCell, {
	foreignKey: "placementCellId",
	as: "placementCell"
});

db.ROLES = ["superAdmin", "placementCell", "recruiter", "student"];
module.exports = db;
