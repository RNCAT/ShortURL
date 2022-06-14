import 'dotenv/config'
import express, { Express, Request, Response } from 'express'

import ShortRouter from './routes/short'
import { getShortURL } from './handlers/short'

const app: Express = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use('/api/shorts', ShortRouter)
app.get('/:short_url', getShortURL)

app.listen(port)
