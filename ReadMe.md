## Ax: Simple Logging Servce

Ax provides a very simple multi-level logging interface.

    Ax = require "ax"
    logger = new Ax level: "debug"
    
    logger.info "Greetings, Professor Falken"
    logger.warn "Warning, Will Robinson!"
    logger.error "If I may say so, sir, I noticed earlier the hyperdrive
      motivator has been damaged. It's impossible to go to lightspeed."
    logger.debug   "Instruments register only those things they're designed
      to register. Space still contains infinite unknowns."

You can also pass a `stream` option to log to a stream instead of `stdout`.