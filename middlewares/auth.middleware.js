const {getUser} = require("../service/auth.service.js");

const isLoggedIn = (req, res, next)=>{
    const userId = req.cookies?.uid;

    if(!userId) {
        return res.redirect("/login");
    }

    const user = getUser(userId);

    if(!user){
        return res.redirect("/login");
    }

    req.user = user;
    next();
}
//console.log(isLoggedIn);

const checkAuth = (req, res, next)=>{
    const userId = req.cookies?.uid;

    const user = getUser(userId);

    req.user = user;
    next();
}

module.exports = {isLoggedIn, checkAuth};