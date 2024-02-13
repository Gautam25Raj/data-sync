const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authenticate = require("../middleware/auth");

router.get("/:id", userController.getUser);

router.post("/", userController.postUser);
router.post("/login", userController.loginUser);
router.post("/logout", authenticate, userController.logoutUser);

router.put("/:id", authenticate, userController.updateUser);

router.delete("/:id", authenticate, userController.deleteUser);

module.exports = router;
