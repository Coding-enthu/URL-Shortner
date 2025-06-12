const express = require("express");

const {connectDB} = require("./connection.js");
const urlRoute= require("./routes/url.route.js");
const Url = require("./models/url.model.js");

const app = express();
const PORT = 8001;

app.use(express.json());



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