const express = require('express');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use('/public' , express.static(__dirname + '/public'));
app.engine('html', require('ejs').renderFile);

app.get('/' , (req, res) => {
  res.render('index.html');
})

app.listen(3000 , (req, res) => {
  console.log('start 3000 port');
})