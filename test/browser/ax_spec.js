describe('REST API Tutorial', function () {
var Ax = require('./ax.js') ;
	
  describe('Initialization', function(){
    describe('ax', function(){
      it('should have module defined', function(){
        var Ax_obj = new Ax({module : 'haiku'}) ;
        expect(Ax_obj.options.module).toBeDefined();
      });

      it('should have default level as info', function(){
        var Ax_obj = new Ax({module : 'haiku'}) ;
        expect(Ax_obj.options.level).toBe('info');
      });

      it('should have file has undefined', function(){
        var Ax_obj = new Ax({module : 'haiku'}) ;
        expect(Ax_obj.options.file).toBeUndefined;
      });

      it('should have level as debug', function(){
        var Ax_obj = new Ax({module : 'haiku', level : 'debug'}) ;
        expect(Ax_obj.options.level).toBe('debug');
      });

      it('should have stream mapped to console.info', function(){
        var Ax_obj = new Ax({module : 'haiku'}) ;
        expect(Ax_obj.stream).toBe(console.info);
      });

      it('should have stream mapped to console.debug', function(){
        var Ax_obj = new Ax({module : 'haiku', level : 'debug'}) ;
        expect(Ax_obj.stream).toBe(console.debug);
      });

    });
  });
}) ;

