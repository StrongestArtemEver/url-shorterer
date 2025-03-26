import express from 'express';
import cors from 'cors'
import dotenv from 'dotenv'
import { client } from './models/db.js';

const PORT = process.env.PORT
const app = express()


app.use(cors())
app.listen(PORT,console.log("started on 3000"))