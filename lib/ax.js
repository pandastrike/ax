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

  this.level = options.level;
  this.colors = options.colors||this.colors;
  if (options.file) {
    this.stream = fs.createWriteStream(options.file);
  } else {
    this.stream = process.stderr;
  }

  // switch statements "fall through" after a match
  // so a value here of "debug" will define all the
  // necessary logger functions
  switch(this.level){
    case "debug":
      this.debug = makeLogger("debug");
    case 'info':
      this.info = makeLogger("info");
    case "warn":
      this.warn = makeLogger("warn");
  }

  if (options.module) {
    this.prefix = options.module + ": ";
  } else { this.prefix = ""; }
  
  //console.log("LOGGER CREATED");
}

Logger.prototype = {
  info: noOp,
  debug: noOp,
  warn: noOp,
  error: makeLogger("error"),
  colors: {
    info: "green",
    warn: "yellow",
    debug: "cyan",
    error: "red"
  },
  format: function(level,message) {
    return (this.prefix+format(level,message))[this.colors[level]]
  }
};

module.exports = Logger;