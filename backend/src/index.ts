import express from 'express'
import cors from 'cors'
import authRoute from './routes/authRoute'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api', authRoute)

const port = 8000
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})