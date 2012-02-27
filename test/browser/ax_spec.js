var Ax = require('./ax.js') ;
	
describe('With default log level', function () {
  beforeEach(function () {
    this.ax = new Ax({
      module: 'test'
    });
  });

  it('should have module defined', function(){
    expect(this.ax.options.module).toBeDefined();
  });

  it('should have default level as info', function(){
    expect(this.ax.options.level).toBe('info');
  });

  it('should have stream mapped to console.info', function(){
    expect(this.ax.stream).toBe(console.info);
  });

  it('should have file has undefined', function(){
    expect(this.ax.options.file).toBeUndefined;
  });
});

describe('With log level set to debug', function () {
  beforeEach(function () {
    this.ax = new Ax({
      module: 'test',
      level: 'debug'
    });
  });

  it('should have log level debug', function(){
    expect(this.ax.options.level).toBe('debug');
  });

  it('should have stream mapped to console.debug', function(){
    expect(this.ax.stream).toBe(console.debug);
  });
});
