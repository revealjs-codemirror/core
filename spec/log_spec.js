/*global describe:false, it:false, expect:false, beforeEach:false, revealjscodemirror: false */
describe('Log', function(){
    it('should be defined', function(){
        expect(revealjscodemirror.Log).toBeDefined();
    });

    describe('methods', function(){
        var log;

        beforeEach(function(){
            log = new revealjscodemirror.Log();
        });

        describe('lines', function(){
            it('should start out empty', function(){
                expect(log.lines()).toEqual([]);
            });
        });

        describe('append', function(){
            var message;

            beforeEach(function(){
                message = 'Hello World!';
            });

            it('should append lines', function(){
                log.append(message);

                expect(log.lines().length).toBe(1);
                expect(log.lines()[0]).toBe(message);
            });

            it('should notify', function(done){
                log.addListener(function(){
                    expect(true).toBeTruthy();
                    done();
                });

                log.append(message);
            });
        });

        describe('clear', function(){
            it('should clear append lines', function(){
                log.append('Throw away');

                log.clear();

                expect(log.lines()).toEqual([]);
            });

            it('should notify', function(done){
                log.addListener(function(){
                    expect(true).toBeTruthy();
                    done();
                });

                log.clear();
            });
        });

        describe('notification', function(){
            it('should add and notify listeners', function(done){
                log.addListener(function(){
                    expect(this).toBe(log);
                    done();
                });

                log.notify();
            });
        });
    });
});
