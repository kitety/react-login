import express from 'express';
let app = express()
app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(6060, () => {
  console.log('The server is listening on port: 6060');
})
