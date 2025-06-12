const shortid = require('shortid');

const Url = require("../models/url.model.js");

const createShortId = async (req, res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({msg: "url is required"});

    const id = shortid.generate();
    const url = await Url.create({
        shortId: id,
        redirectURL: body.url,
        visitCount: []
    })

    return res.status(201).json({url});
};

const getAnalytics = async (req, res) => {
    const body = req.body;
    const id = req.params.shortId;
    const data = await Url.findOne({shortId: id});
    return res.status(200).json({
        totalClicks: data.visitCount.length,
        analytics: data.visitCount
    })
}

module.exports = {
    createShortId, getAnalytics
};