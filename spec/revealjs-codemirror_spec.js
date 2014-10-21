/*global describe:false, it:false, beforeEach:false, afterEach:false, expect:false, document:false, Q:false, revealjscodemirror: false */
describe('revealjs-codemirror', function(){
    var fixture;

    beforeEach(function(){
        var body = document.getElementsByTagName('body')[0];
        fixture = document.createElement('div');
        fixture.setAttribute('class', 'fixture');
        body.appendChild(fixture);
    });

    describe('textarea', function(){
        describe('without \'code\' class', function(){
            var textarea;

            beforeEach(function(){
                textarea = document.createElement('textarea');
                fixture.appendChild(textarea);
            });

            it('should be defined', function(){
                expect(textarea).toBeDefined();
            });

            it('should *not* be transformed', function(){
                revealjscodemirror.codemirrorify();

                expect(textarea).not.toIncludeStyle('display: none;');
                expect(document.getElementsByClassName('CodeMirror').length).toBe(0);
            });


            afterEach(function(){
                textarea.parentNode.removeChild(textarea);
            });
        });

        describe('with \'code\' class', function(){
            describe('without \'runnable\' data attribute', function(){
                var textarea;

                beforeEach(function(){
                    textarea = document.createElement('textarea');
                    textarea.setAttribute('class', 'code');
                    fixture.appendChild(textarea);
                });

                it('should be defined', function(){
                    expect(textarea).toBeDefined();
                });

                it('should be transformed', function(){
                    revealjscodemirror.codemirrorify();

                    expect(textarea).toIncludeStyle('display: none;');
                    expect(document.getElementsByClassName('CodeMirror').length).toBe(1);
                });

                afterEach(function(){
                    textarea.parentNode.removeChild(textarea);
                });
            });

            describe('with \'runnable\' data attribute set to \'true\'', function(){
                var textarea;

                beforeEach(function(){
                    textarea = document.createElement('textarea');
                    textarea.setAttribute('class', 'code');
                    textarea.dataset.runnable = true;
                    fixture.appendChild(textarea);
                });

                it('should be defined', function(){
                    expect(textarea).toBeDefined();
                });

                it('should be transformed', function(){
                    revealjscodemirror.codemirrorify();

                    expect(textarea).toIncludeStyle('display: none;');
                    expect(document.getElementsByClassName('CodeMirror').length).toBe(1);
                });


                describe('run button', function(){
                    var content;

                    beforeEach(function(){
                        textarea.value = content = 'console.log(\'Hello World!\');';
                    });

                    it('should be added', function(){
                        revealjscodemirror.codemirrorify();

                        var codeMirror = document.getElementsByClassName('CodeMirror')[0];

                        expect(codeMirror.getElementsByClassName('run').length).toBe(1);
                    });

                    it('should have an onclick', function(done){
                        revealjscodemirror.codemirrorify({
                            runHandler: function(value){
                                expect(value).toBe(content);
                                done();
                            }
                        });
                        var codeMirror = document.getElementsByClassName('CodeMirror')[0];

                        var button = codeMirror.getElementsByClassName('run')[0];
                        button.onclick();
                    });

                    it('should return a promise of the evaluated behavior', function(done){
                        var deferred = Q.defer();
                        revealjscodemirror.codemirrorify({
                            runHandler: function(){
                                return deferred.promise;
                            }
                        });
                        var codeMirror = document.getElementsByClassName('CodeMirror')[0];

                        var button = codeMirror.getElementsByClassName('run')[0];
                        button.onclick();
                        deferred.resolve(['message']);

                        deferred.promise.then(function(){
                            var log = codeMirror.getElementsByClassName('log')[0];
                            expect(log.innerText).toBe('message');
                            done();
                        });
                    });
                });

                describe('clear button', function(){
                    it('should have added to CodeMirror', function(){
                        revealjscodemirror.codemirrorify();

                        var codeMirror = document.getElementsByClassName('CodeMirror')[0];

                        expect(codeMirror.getElementsByClassName('clear').length).toBe(1);
                    });

                    it('should clear the log', function(){
                        revealjscodemirror.codemirrorify();
                        var codeMirror = document.getElementsByClassName('CodeMirror')[0];
                        var log = codeMirror.getElementsByClassName('log')[0];
                        log.innerText = 'Some Text';

                        var clear = codeMirror.getElementsByClassName('clear')[0];
                        clear.onclick();

                        expect(log.innerText).toBe('');
                    });
                });

                it('should have added log area to CodeMirror', function(){
                    revealjscodemirror.codemirrorify();

                    var codeMirror = document.getElementsByClassName('CodeMirror')[0];

                    expect(codeMirror.getElementsByClassName('log').length).toBe(1);
                });

                afterEach(function(){
                    textarea.parentNode.removeChild(textarea);
                });
            });
        });
    });

    afterEach(function(){
        fixture.parentNode.removeChild(fixture);
    });
});
