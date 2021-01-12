const express = require('express');
var cors = require('cors');
const app = express();

const mods = [
  'pokemaobr',
  'tiagumb',
  'itsevolution',
  'freakfrog',
  'edersondeveloper',
  'adalovelancebot',
  'caroldonadel',
  'vitthin',
  'vitthinbot',
  'freakyfog',
  'morgiovanelli',
  'kastr0walker',
  'TonhoCodes',
];

app.use(
  cors({
    origin: '*',
  }),
);

const http = require('http').createServer(app);
const io = require('socket.io')(http, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const tmi = require('tmi.js');

const client = new tmi.Client({
  connection: {
    secure: true,
    reconnect: true,
  },
  channels: ['profbrunolopes'],
});

client.connect();

io.on('connection', (socket) => {});

client.on('message', (channel, tags, message, self) => {
  messageSplited = message.split(' ');
  if (
    messageSplited[0] === '!mark' &&
    messageSplited.length >= 3 &&
    mods.includes(tags.username.toLowerCase())
  ) {
    totalText = '';
    messageSplited.forEach((text, index) => {
      if (index >= 2) {
        totalText += text + ' ';
      }
    });
    io.emit('message', { msg: totalText, user: messageSplited[1] });
  }
});

http.listen(3000, () => {
  console.log('listening on *:3000');
});
