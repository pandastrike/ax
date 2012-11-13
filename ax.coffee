{sprintf} = require "sprintf"

w = (string) -> string.split " "

module.exports = class Ax
  
  _suppress: 
    "error": w "warn info debug verbose"
    "warn": w "info debug verbose"
    "info": w "debug verbose"
    "debug": w "verbose"
    "verbose": w ""
    
  constructor: (configuration) ->
    {@level,@stream,@name} = configuration
    @name ?= "-"
    @stream ?= process.stdout
    
  log: (level,message) ->
    unless level in @_suppress[@level]
      @print sprintf "%7s [%s] %s '%s'",
        level.toUpperCase(),
        new Date().toISOString(),
        @name,
        message
    
  print: (string) -> @stream.write string + "\n"
  
  error: (message) -> @log "error", message
    
  warn: (message) -> @log "warn", message
    
  info: (message) -> @log "info", message
    
  debug: (message) -> @log "debug", message
  
  verbose: (message) -> @log "verbose", message
  
