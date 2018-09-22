var express = require('express');
var crypto = require('crypto');
var app = express();

function createUsers() {
  const salt = crypto.randomBytes(128).toString('base64');
  const hash = crypto.pbkdf2Sync('123456', salt, 10000, 512, 'sha512');

  var users = {
    'matt': { salt, hash },
    'angel': { salt, hash },
  };

  return users;
}

app.get('/users', (req, res) => {
  const users = createUsers()

  // Pega a requisição
  let username = req.query.username || '';
  const password = req.query.password || '';

  username = username.replace(/[!@#$%^&*]/g, '');

  if (!username || !password || !users[username]) {
    return res.sendStatus(400);
  }

  const { salt, hash } = users[username];
  const encryptHash = crypto.pbkdf2Sync(password, salt, 10000, 512, 'sha512');

  if (crypto.timingSafeEqual(hash, encryptHash)) {
    res.sendStatus(200);
  } else {
    res.sendStatus(401);
  }
});

app.get('/users/:id', (req, res) => {
  res.status(200).send('Hello World, ' + req.params.id + '!');
});

app.listen(3001, function () {
  console.log('Example app listening on port 3001!');
});