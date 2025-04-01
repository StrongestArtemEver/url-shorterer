import express from 'express';
import cors from 'cors';
import { urlRouter } from './routes/url.routes.js'


const PORT = process.env.PORT
const app = express()

app.use(cors())
app.use(express.json())

app.use('/',urlRouter)


app.listen(PORT,console.log("started on 3000"))