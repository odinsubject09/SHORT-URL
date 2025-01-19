const express=require('express')
const { connectToMongoDB } = require('./connect')
const urlRoute=require('./routes/url')
const URL=require('./models/url')
const path=require('path')
const staticRoute=require('./routes/staticRouter')

const app=express()
const PORT=8001

connectToMongoDB("mongodb://localhost:27017/short-url").then(console.log("MongoDB connected"))

app.set("view engine","ejs")
app.set("views",path.resolve("./views"))

app.use(express.json())//read raw from postman
app.use(express.urlencoded({extended:false})) 

app.use('/url',urlRoute)
app.use('/',staticRoute)

app.get("/test",async (req,res)=>{
    const allUsers=await URL.find({})
    return res.render("home",{
        urls: allUrls,
      })
})

app.get('/:shortId',async(req,res)=>{
    const shortId=req.params.shortId
    const entry=await URL.findOneAndUpdate({
        shortId
    },
    {
        $push: 
        {
            visitHistory: {
                timestamp:Date.now()
            },
        },
    })
    res.redirect(entry.redirectUrl)
})

app.listen(PORT,()=>{console.log("Server started")})
