const express = require("express");

const app = express();
app.use(express.json());

require("./app/routes/auth.routes")(app);
require("./app/routes/user.routes")(app);
require("./app/routes/placementCell.routes")(app);

app.get("/", (req, res) => {
	res.send("Hello User!");
});

app.listen(3000);

const db = require("./app/models");

// db.sequelize.sync({ force: true }).then(() => {
// 	console.log("Drop and Resync Db");
// });
/* *******************************
 * initial() function helps us to create 3 rows in the database.
 * In development, you may need to delete existing tables and re-sync the database.
 * So you can use force: true like above code.
 *
 * For production, just enter this line manually and use sync() with no parameters to avoid data loss:
 * *******************************/
db.sequelize.sync();

// function initial() {
// 	Role.create({
// 		id: 1,
// 		name: "user"
// 	});

// 	Role.create({
// 		id: 2,
// 		name: "moderator"
// 	});

// 	Role.create({
// 		id: 3,
// 		name: "admin"
// 	});
// }
