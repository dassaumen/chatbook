var socket = io(); 
function submitfunction(){
  var from = $('#user').val();
  var message = $('#m').val();
  if(message != '') {
    socket.emit('chatMessage', from, message);
  }
  $('#m').val('').focus();
    return false;
}
 
function notifyTyping() { 
  var user = $('#user').val();
  socket.emit('notifyUser', user);
}
 
socket.on('chatMessage', function(from, msg){
  var me = $('#user').val();
  var color = (from == me) ? 'green' : '#009afd';
  var from = (from == me) ? 'Me' : from;
  var imgicon = (from == 'System')? 'system' : 'user';
  var d = new Date();
  $('#messages').append('<li class="media"><div class="media-body"><div class="media"><a class="pull-left" href="#"><img class="media-object img-circle" src="assets/img/'+imgicon+'.png" /></a><div class="media-body">'+msg+'<br /><small class="text-muted">'+from+' | '+d.toLocaleString()+'</small><hr /></div></div></div></li>');
});
 
socket.on('notifyUser', function(user){
  var me = $('#user').val();
  if(user != me) {
    $('#notifyUser').html('<b>'+user+'</b> is typing...');
  }
  setTimeout(function(){ $('#notifyUser').text(''); }, 5000);;
});
 
$(document).ready(function(){
  var name = genRandUid();
  $('#user').val(name);
  socket.emit('chatMessage', 'System', '<b>' + name + '</b> has joined the conversation');
  $("#m").keyup(function(event){
    if(event.keyCode == 13){
      submitfunction();
    }
  });
});

function genRandUid() {
  var text = "Usr_";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for( var i=0; i < 5; i++ ) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
}