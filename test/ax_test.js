var vows = require('vows')
  , assert = require('assert')
  , Ax = require('../lib/ax')
;

vows.describe('stderr').addBatch({
 
  'Testing write to file ': {
    topic: function(){
       return new Ax({module :'Haiku' , file : 'temp'});
      },
   
    'should not have stream as null': function(ax){
      assert.isNotNull(ax.stream);
    },
    'should not have level as "debug"': function(collection){
      assert.notEqual(collection.options.level, "debug") ;
    },
    'should have a module name "Haiku" ': function(collection){
      assert.equal(collection.options.module , 'Haiku') ;
    },
    'should have file named "temp"': function(collection){
      assert.equal(collection.options.file , 'temp') ;
    },
      '`.level` should === "info"': function(collection){
        assert.equal(collection.options.level, 'info');
      },
      '`.colors in not Null': function(collection){
        assert.isNotNull(collection.options.colors);
      }
      
      
      
  },
  
  
   'Testing write to stderr': {
    topic: function(){
       return new Ax({module :'Haiku', level :  'debug'});
      },
    
    'should not have stream as null': function(ax){
      assert.isNotNull(ax.stream);
    },
    'should have level as "debug"': function(collection){
      assert.equal(collection.options.level, 'debug') ;
    },
    'should have a module name "Haiku" ': function(collection){
      assert.equal(collection.options.module , 'Haiku') ;
    },
    'should have file name as "undefined"': function(collection){
      assert.isUndefined(collection.options.file) ;
    },
      '`.level` should not === "info"': function(collection){
        assert.notEqual(collection.options.level, 'info');
      },
      '`.colors in not Null': function(collection){
        assert.isNotNull(collection.options.colors);
      }
      
      
      
  }
}).export(module);
