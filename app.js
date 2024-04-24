// Import modules
const express = require('express'); 
const app = express(); 
const bodyPaser = require('body-parser'); 
const { engine } = require('express-handlebars');
const path = require('path');


app.use('.bootstrap', express.static('./node_modules/bootstrap/dist'));// Add bootstrap
app.use('/css', express.static('./css'));// Add CSS
app.use(bodyPaser.urlencoded({extended: false}));// manipulation route and use bodyp-parser
app.use(express.json());
app.use('/js',express.static('./js'));


app.engine('handlebars', engine());// handlebars configuration
app.set('view engine', 'handlebars');
app.set('views', './views');

// Route main
app.get('/', (req, res) => {
  res.render('home', {title: 'Question one'});
});

// Router dynamic
app.get('/things/:id([0-9]{5})', (req, res,) => {
  res.send('Hello Node.js Express! ' + 'id: ' + req.params.id);
})

// Onother route
app.get('*', (req, res) => {
  res.send('Sorry, this is a invalid URL.')
});

app.post('/question1', (req, res) => {
  let text = req.body.text;

  if (text == 2) {
    res.render('newhome', {title: 'Question two'});
    console.log(text);
  } else if (text == '') {
    res.send(`Please, You need put your answer to continue next question`);
  } 
  else {
    res.send(`Your answer is ${text},It is wrong. Try again!`);
    const time = res.render('/');
    setTimeout(time, 2000);
  }
});

app.post('/question2', (req, res) => {
  let text = req.body.text;

  if (text == 10) {
    res.render('question3', {title: 'Question three'});
    console.log(text);
  } else if (text == '') {
    res.send(`Please, You need put your answer to continue next question`);
  } 
  else {
    res.send('It is wrong answer, try again!')
  }

});

// server
const port = 3000; // port
app.listen(port, (error) => {
  if (error) {
   throw error;
  }
  console.log(`The server is running port: http://localhost:${port}`);
});

