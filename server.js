const express = require('express');
const config = require('config');
const connectDB = require('./dataBase/connectDB');
const tokenMdwr = require('./middlewares/tokenMiddleware');

const app = express();
const PORT = config.get('serverPort');

connectDB();

app.use(express.json());

app.use((req, res, next) => {
  res.append('Access-Control-Allow-Origin', ['*']);
  res.append('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.append('Access-Control-Allow-Headers', ['Content-Type', 'x-auth-token', 'Cookie']);
  next();
});

app.use('/', require('./routes/reg'));
app.use('/auth', require('./routes/auth'));
app.use('/shortcuts', tokenMdwr, require('./routes/shortcuts'));

// example
app.get('/dashboard', tokenMdwr, (req, res) => res.send('Dash page'));

app.listen(PORT, () => {
  console.log('Server started on port 5000');
});
