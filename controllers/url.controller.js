const shortid = require('shortid');
// const { customAlphabet } = require('nanoid');
// const nanoid = customAlphabet('1234567890abcdef@', 8);


const Url = require("../models/url.model.js");

const createShortId = async (req, res) => {
    const body = req.body;
    if(!body.url) return res.status(400).json({msg: "url is required"});
    
    const entry = await Url.findOne({redirectURL: body.url});
    if(entry){
        if(entry.redirectURL === body.url){
            return res.status(201).render("home.ejs", {id: entry.shortId});
        }
    }

    const id = shortid.generate();
    //const id = nanoid();
    console.log(id);
    const url = await Url.create({
        shortId: id,
        redirectURL: body.url,
        visitCount: [],
        createdBy: req.user._id
    })

    return res.status(201).render("home.ejs", {id: id});
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