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
            });


            afterEach(function(){
                textarea.parentNode.removeChild(textarea);
            });
        });

        describe('with \'code\' class', function(){
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
            });

            afterEach(function(){
                textarea.parentNode.removeChild(textarea);
            });
        });
    });

    afterEach(function(){
        fixture.parentNode.removeChild(fixture);
    });
});
