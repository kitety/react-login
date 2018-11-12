import express from 'express';
import users from './routes/users.mjs'
import bodyParser from 'body-parser'

let app = express()
app.use(bodyParser.json())
app.use('/api/user', users)
app.get('/', (req, res) => {
  res.send('Hello')
})

app.listen(6060, () => {
  console.log('The server is listening on port: 6060');
})
