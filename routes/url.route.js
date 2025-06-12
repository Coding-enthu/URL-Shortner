const {createShortId, getAnalytics} = require("../controllers/url.controller.js");

const express = require("express");

const router = express.Router();

router.route("/").post(createShortId);

router.route("/analytics/:shortId").get(getAnalytics);

module.exports = router;