import express from 'express'
import request from 'request'
import morgan from 'morgan'

const app = express()
app.use(morgan('dev'))

app.get('/', async (req, res, next) => {
  const {
    query: { id, manifest },
  } = req

  await request(manifest, async (error, response, body) => {
    const parsedBody = JSON.parse(body)
    parsedBody.start_url = `${parsedBody.start_url}/${id}`
    await res.json(parsedBody)
  })
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.info('Server is running on ' + PORT)
})
