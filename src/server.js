var express = require('express')
var request = require('request')
var morgan = require('morgan')

const app = express()
app.use(morgan('dev'))

app.get('/manifest', async (req, res, next) => {
  try {
    const {
      query: { id, manifest },
    } = req
    await request(manifest, async (error, response, body) => {
      try {
        const parsedBody = JSON.parse(body)
        parsedBody.start_url = `${parsedBody.start_url}/${id}`
        await res.json(parsedBody)
      } catch (_) {
        res.status(404).send('An error occured')
      }
    })
  } catch (_) {
    res.status(404).send('An error occured')
  }
})

const PORT = process.env.PORT || 8000
app.listen(PORT, () => {
  console.info('Server is running on ' + PORT)
})
