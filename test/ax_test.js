var vows = require('vows')
  , assert = require('assert')
  , ax = require('../lib/ax')
;

vows.describe('stderr').addBatch({
  'object': {
    topic: function(){
       return ax;
      },
    'should include the writer function': function(ax){
      assert.isFunction(ax.writer);
    },
    'should not have stream as null': function(ax){
      assert.isNotNull(ax.stream) ;
    },
    'should have level as debug': function(ax){
      assert.equal(ax.options.level, "debug") ;
    },
    'should have filename set': function(ax){
      assert.isNull(ax.options.file) ;
    }
  }
}).export(module);
