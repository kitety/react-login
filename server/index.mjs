import express from 'express';
let app = express()
app.get('/', (req, res) => {
  res.send('Hello')
})
app.post('/api/post')

app.listen(6060, () => {
  console.log('The server is listening on port: 6060');
})
