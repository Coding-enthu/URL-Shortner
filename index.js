const express = require("express");
const path = require("path");

const {connectDB} = require("./connection.js");
const urlRoute= require("./routes/url.route.js");
const staticRoute = require("./routes/static.route.js");
const Url = require("./models/url.model.js");

const app = express();
const PORT = 8001;


app.set("viewengine", "ejs");
app.set("views", path.resolve("./views"));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.use("/", staticRoute);

app.get("/test", async (req, res)=>{
    const allURL = await Url.find();
    //console.log(allURL);
    return res.render("home.ejs", {
        urls: allURL
    });
});

app.use("/url", urlRoute);

app.get("/:shortId", async (req, res) => {
    const id = req.params.shortId;

    const entry = await Url.findOneAndUpdate({shortId: id},
        {$push:{
            visitCount: {
                timestamp: Date.now()
            }
        }},
        {new: true}
    );
    //console.log(entry)
    if(!entry) {
        return res.status(400).json({msg: "Invalid id"});
    }
    //const data = await Url.findOne({shortId: id});
    //console.log(data);

    res.redirect(entry.redirectURL);
    res.status(200);
});

const start = async ()=>{
    app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)); 
    await connectDB("mongodb://127.0.0.1:27017");  
    console.log("DB Connected!"); 
}

start();