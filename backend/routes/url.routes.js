import express from 'express'
import { createShortLink,getShortLink,getUrlStats } from '../controllers/url.controller.js'

export const urlRouter = express.Router()

urlRouter.post('/short',async (req,res) => {
    const shortLink = await createShortLink(req.body.link)
    res.status(200).send(shortLink)
})

urlRouter.get('/redirect/:shortUrl',async (req,res) => {
    const link = await getShortLink(req.params.shortUrl)
    res.redirect(link)
})

urlRouter.post('/stats',async (req,res) => {
    const stats = await getUrlStats(req.body.link)
    res.status(200).send(stats)
})


