const {v4: uuidv4} = require("uuid");

const User = require("../models/user.model.js");
const {setUser, getUser} = require("../service/auth.service.js");

const userSignup = async (req, res)=>{
    const {name, email, password} = req.body;
    await User.create({
        name, email, password
    });
    return res.redirect("/");
};

const userLogin = async (req, res)=>{
    const {email, password} = req.body;
    const user = await User.findOne({
        email, password
    });
    if(!user){
        return res.render("login.ejs", {
            error: "Invalid username or password"
        })
    }

    const sessionId = uuidv4();
    setUser(sessionId, user);
    
    res.cookie("uid", sessionId);
    return res.redirect("/");
};

module.exports = {userSignup, userLogin};