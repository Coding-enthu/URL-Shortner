const express = require("express");
const router = express.Router();
const Url = require("../models/url.model.js");

router.get("/", async (req, res)=>{
    const urls = await Url.find({});
    return res.render("home.ejs", {
        urls: urls
    });
})

module.exports = router;