var html = require('fs').readFileSync(__dirname+'/html/index.html');
var server = require('http').createServer(function(req, res){
  res.end(html);
});
server.listen(8080);

var nowjs = require("now");
var everyone = nowjs.initialize(server);

everyone.now.distributeMessage = function(message){
  everyone.now.receiveMessage(this.now.name, message);
};

setInterval(function() {
    everyone.getUsers(function (users) {
      for (var i = 0; i < users.length; i++) {
        nowjs.getClient(users[i], function () {
          if (this.now.tick) {
            this.now.tick();
          }
        });
      }
    });
}, 1000 / 20);
