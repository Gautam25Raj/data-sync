const express = require("express");
const router = express.Router();

const siteController = require("../controllers/siteController");
const authenticate = require("../middleware/auth");

router
  .route("/:siteId")
  .get(authenticate, siteController.getSite)
  .put(authenticate, siteController.updateSite)
  .delete(authenticate, siteController.deleteSite);

router.route("/").post(authenticate, siteController.createSite);

router
  .route("/admin/:adminId")
  .get(authenticate, siteController.getAllSitesByAdmin);

module.exports = router;
