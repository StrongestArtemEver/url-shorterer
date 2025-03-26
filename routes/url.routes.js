import express from 'express'

export const urlRouter = express.Router()

urlRouter.post('short',(req,res) => {
    res.status(200).send('ok')
})

urlRouter.post('redirect',(req,res) => {

})

urlRouter.post('stats',(req,res) => {
    
})