const express = require("express");
const controller = require("./controller");

const router = express.Router();

router.route("/").get((req, res) => controller.getUsers(req, res));
router.route("/:id").get((req, res) => controller.getUserById(req, res));
router.route("/").post((req, res) => controller.createUser(req, res));

module.exports = router;
