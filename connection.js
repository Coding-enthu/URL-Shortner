const mongoose = require("mongoose");

async function connectDB(url){
    await mongoose.connect(`${url}/url-shortner`);
}

module.exports = {
    connectDB,
}