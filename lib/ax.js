var inspect = require("util").inspect
  , fs = require("fs")
  , colors = require('colors')
  , _ = require('underscore')
;


// this is a quick-and-dirty logger. there are other nicer loggers out there
// but the ones i found were also somewhat involved. this one has a Ruby
// logger type interface and color codes the console output
//
// we can easily replace this, provide the info, debug, etc. methods are the
// same. or, we can change Haiku to use a more standard node.js interface

var format = function(level,message) {
  var debug = (level=="debug"||level=="error");
  if (!message) { return message.toString(); }
  if (typeof(message) == "object") {
    if (message instanceof Error && debug) {
      return message.stack;
    } else {
      return inspect(message);
    }
  } else {
    return message.toString();
  }
};

var noOp = function(message) { return this; }
var makeLogger = function(level,fn) {
  return function(message) { 
    this.stream.write(this.format(level, message)+"\n");
    return this;
  }
};

var Logger = function(options) {
  var logger = this;
	var options = options||{};
  // this.level = options.level;
  // this.colors = options.colors || this.colors;

  // Default options
  logger.options = _.defaults(options, {
      level: 'info'
    , colors: {
        info: 'green'
      , warn: 'yellow'
      , debug: 'cyan'
      , error: 'red'
      }
    , prefix: ''
  });

  // Allows a prefix to be added to the message.
  //
  //    var logger = new Ax({ module: 'Haiku' })
  //    logger.warn('this is going to be awesome!');
  //    //=> Haiku: this is going to be awesome!
  //
  if (logger.options.module){
    logger.options.prefix = logger.options.module + ': ';
  }

  // Write to stderr or a file
  if (logger.options.file){
    logger.stream = fs.createWriteStream(logger.options.file);
  } else {
      if(process.title === "node")
	  logger.stream = process.stderr;
      else if(process.title === "browser")
	  logger.stream = console[logger.options.level];
  }

  switch(logger.options.level){
    case 'debug':
      _.each(['debug', 'info', 'warn'], function(level){
        logger[level] = Logger.writer(level);
      });
    case 'info':
      _.each(['info', 'warn'], function(level){
        logger[level] = Logger.writer(level);
      });
    case 'warn':
      logger.warn = Logger.writer('warn');
  }
}

// Used to define logger methods
Logger.writer = function(level){
  return function(message){
    var logger = this;

    if(process.title === "node")
	logger.stream.write(logger.format(level, message) + '\n');
    else if(process.title === "browser")
	logger.stream(logger.format(level, message) + '\n');

  };
}


Logger.prototype = {
  info: function(){},
  debug: function(){},
  warn: function(){},
  error: Logger.writer('error'),
  format: function(level, message){
    if (! message) return '';

    var logger = this
      , prefix = logger.options.prefix
      , color = logger.options.colors[level]
    ;

    // TODO: maybe this should handle

    return (prefix + message)[color];
  }
};

module.exports = Logger;
