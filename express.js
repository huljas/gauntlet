var express = require('express');
var app = express.createServer();

app.configure(function(){
    app.use(express.methodOverride());
    app.use(express.bodyParser());
    app.use(app.router);
});

app.configure('development', function(){
    app.use(express.static(__dirname + '/gamejs'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  var oneYear = 31557600000;
  app.use(express.static(__dirname + '/gamejs', { maxAge: oneYear }));
  app.use(express.errorHandler());
});

app.get('/', function(req, res){
  res.send('hello world');
});

app.listen(3000);

var nowjs = require("now");
var everyone = nowjs.initialize(app);

everyone.now.addShip = function(id, ship){
  console.log(id);
  everyone.getUsers(function (users) {  
    for (var i = 0; i < users.length; i++) {      
      nowjs.getClient(users[i], function() {
        if (users[i] != id && this.now.addRemoteShip) {
          this.now.addRemoteShip(id, ship);
        }
      });
    }
  });
};


everyone.now.updateShip = function(id, ship){
    everyone.getUsers(function (users) {  
        for (var i = 0; i < users.length; i++) {      
          nowjs.getClient(users[i], function() {
            if (users[i] != id && this.now.updateRemoteShip) {
              this.now.updateRemoteShip(id, ship);
            }
          });
        }
    });
};

