const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
app.use('/public' , express.static(__dirname + '/public'));

app.get('/' , (req, res) => {
  res.render('index.pug');
})

app.listen(3000 , (req, res) => {
  console.log('start 3000 port');
})