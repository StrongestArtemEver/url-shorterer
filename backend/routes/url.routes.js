import express from 'express'
import { createShortLink,getShortLink,getUrlStats,updateUrlStats } from '../controllers/url.controller.js'
import dotenv from 'dotenv'
dotenv.config()


export const urlRouter = express.Router()

urlRouter.post('/short',async (req,res) => {
    const port = process.env.PORT
    const shortCode = await createShortLink(req.body.link)
    let shortLink = `http://127.0.0.1:${port}/redirect/${shortCode}`
    res.status(200).send(shortLink)
})

urlRouter.get('/redirect/:shortCode',async (req,res) => {
    try{
        const link = await getShortLink(req.params.shortCode)
        await updateUrlStats(req.params.shortCode)
        res.redirect(link)
    }catch(e){
        throw new Error(e)
    }
    
})

urlRouter.post('/stats',async (req,res) => {
    const stats = await getUrlStats(req.body.link)
    res.status(200).send(stats)
})


