const express = require("express");
const router = express.Router();

const {
  getTableauToken,
  getTableauProjects,
} = require("../controllers/tableauController");
const authenticate = require("../middleware/auth");

router.get("/token/:siteId", authenticate, getTableauToken);
router.get("/projects/:siteId", authenticate, getTableauProjects);

module.exports = router;
