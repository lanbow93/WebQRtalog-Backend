import dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import cookieParser from 'cookie-parser'
import userRouter from './controllers/User.js'
import inventoryRouter from './controllers/InventoryItem.js'
import possessionRouter from './controllers/Possession.js'
dotenv.config()
const app = express()

app.use(
  cors({
    credentials: true,
    origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'https://webqrtalog.netlify.app']
  })
)
app.use(express.json())
app.use(morgan('common'))
app.use(cookieParser())
app.use('/user', userRouter)
app.use('/inventory', inventoryRouter)
app.use('/possession', possessionRouter)

app.get('/', (request, response) => {
  response.send('Server is functional')
})

const PORT = process.env.PORT | 7777
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
})
