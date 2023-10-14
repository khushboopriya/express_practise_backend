const express = require('express')
const app = express()
const port = 3000
const users = require('./users');
const todos = require('./todos');

// app.use(express.json);
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use('/users',users);
app.use('/todos',todos);
app.get('/home',(req,res) => {
  res.json({"home":"main page", "basic": "app"});
})