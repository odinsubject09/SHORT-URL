const{ nanoid }=require('nanoid')
const URL=require('../models/url')

async function handleGenerateNewShortUrl(req,res){
    const body=req.body()
    if(!body.url) return  res.status(400).json({error : 'url is required'});

    const shortId=nanoid(8)
    await URL.create({
        shortId:shortId,
        redirectUrl:body.url,
        visitHistory:[]
    })

    return res.json({
        shortUrl:shortId
    })
}
module.exports = {
    handleGenerateNewShortURL
}