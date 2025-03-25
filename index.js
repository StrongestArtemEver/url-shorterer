import express from 'express';
import cors from 'cors'

const app = express()




app.use(cors())
app.listen(3000,console.log("started on 3000"))