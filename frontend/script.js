const socket = io('http://localhost:3000');
messageBox = document.getElementById('messageBox');
var clientId;
totalUsers = [];

socket.on('connect', () => {
  socket.on('message', showMessage);
});

function showMessage(socket) {
  console.log(socket);
  var div = document.createElement('div');
  div.setAttribute('id', 'messageBox');
  div.innerHTML = socket.user + ': ' + socket.msg;
  div.style.borderColor = '#6441a5';
  div.style.backgroundColor = '#9146ff';

  document.getElementsByTagName('body')[0].appendChild(div);

  setTimeout(() => {
    div.remove();
    div.style.borderColor = 'initial';
    div.style.backgroundColor = 'initial';
  }, 10000);
}
