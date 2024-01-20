const express = require("express");
const router = express.Router();

//import controller
const shared_controllers = require("../../controllers/shared.controller");

//import routes
const user_routes = require("./users.routes");
const courseRoutes = require("./courses.routes");

router.use("/user", user_routes);
router.use("/course", courseRoutes);

//Method or route not found
router.all("*", shared_controllers.method_not_found_controller);

module.exports = router;
