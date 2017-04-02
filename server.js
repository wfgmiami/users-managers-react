const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = require('./routes');
const db = require('./db');

app.use('/vendor', express.static('node_modules'));
app.use('/public', express.static('dist'));
app.use(bodyParser.json());

app.use('/api', router);

app.get('/', (req,res,next)=>{
  res.sendFile(__dirname + '/index.html');
})

app.use((err,req,res,next)=>{
  console.log(err);
  res.sendStatus(500).send(err.message);
})


const port = process.env.PORT || 3000;
app.listen(port, ()=>`listen on port ${port}`);

db.seed()
.then(()=>console.log('db is synced and seeded'))
.catch( e => console.log(e));
