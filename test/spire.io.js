
var express = require('express')
  , app = express.createServer()
;

app.configure(function(){
  app.use(express.logger('dev'));
});

// Returns a resources object
app.get('/', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  res.send({
    resources: {
      sessions: {
        url: 'http://' + req.header('host') + '/sessions'
      },
      accounts: {
        url: 'http://' + req.header('host') + '/accounts'
      },
      schema: {
        '1.0': {
          json: {
            session: 'application/vnd.spire-io.session+json;version=1.0',
            account: 'application/vnd.spire-io.account+json;version=1.0',
            channel: '',
            channels: '',
            message: '',
            messages: ''
          },
          text: {
            session: 'application/vnd.spire-io.session+text;version=1.0',
            account: 'application/vnd.spire-io.account+text;version=1.0'
          },
          html: {
            session: 'application/vnd.spire-io.session+html;version=1.0',
            account: 'application/vnd.spire-io.account+html;version=1.0'
          }
        }
      }
    }
  });
});

app.options('/sessions', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  // Jesus: http://bit.ly/oBnHW4
  res.header("Access-Control-Allow-Headers",
    "X-Requested-With, Content-type");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");

  res.end();
});

app.post('/sessions', function(req, res){
  var url = 'http://'
      + req.header('host')
      + '/sessions/aSdpvevtpbnKZFXnvvtesurfhoewtvhb'
    , channelURL =   'http://'
      + req.header('host')
      + '/channels/aSdpvevtpbnKZFXnvvtesuzdVvf'



  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Location", url);

  res.send({
    session: {
      url: url,
      services: {
        notifications: {
          channels: {
            url: channelURL
          }
        }
      }
    }
  }, 201);
});

app.options('/messages', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  // Jesus: http://bit.ly/oBnHW4
  res.header("Access-Control-Allow-Headers",
    "X-Requested-With, Content-type");
  // res.header("Access-Control-Allow-Headers", "X-Requested-With");

  res.end();
});

app.post('/messages', function(req, res){
  var url = 'http://'
      + req.header('host')
      + '/messages/aSdpvevtpbnKZFXnvvtesurfhoewtvhb'

  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  res.header("Location", url);

  res.send({
    message: {
      url: url
    }
  }, 201);
});

app.get('/subscribe', function(req, res){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  res.send({
    messages: [
      {}
    ]
  }, 200);
});

app.listen(1337);
