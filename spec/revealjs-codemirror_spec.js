/*global describe:false, it:false, beforeEach:false, afterEach:false, expect:false, document:false, revealjscodemirror: false */
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

                it('should have added run button to CodeMirror', function(){
                    revealjscodemirror.codemirrorify();

                    var codeMirror = document.getElementsByClassName('CodeMirror')[0];

                    expect(codeMirror.getElementsByClassName('run').length).toBe(1);
                });

                it('should have added clear button to CodeMirror', function(){
                    revealjscodemirror.codemirrorify();

                    var codeMirror = document.getElementsByClassName('CodeMirror')[0];

                    expect(codeMirror.getElementsByClassName('clear').length).toBe(1);
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
