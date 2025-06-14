const express = require("express");
const router = express.Router();
const Url = require("../models/url.model.js");

router.get("/", async (req, res)=>{
    if(!req.user) return res.redirect("/login");
    const urls = await Url.find({createdBy: req.user._id});
    return res.render("home.ejs", {
        urls: urls
    });
})

router.get("/signup", async (req, res)=>{
    return res.render("signup.ejs");
});

router.get("/login", async (req, res)=>{
    return res.render("login.ejs");
});

module.exports = router;