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
        var textarea;

        beforeEach(function(){
            textarea = document.createElement('textarea');
            fixture.appendChild(textarea);
        });

        it('should be defined', function(){
            expect(textarea).toBeDefined();
        });

        it('should be transformed on codemirrorify', function(){
            revealjscodemirror.codemirrorify();

            expect(textarea.getAttribute('style')).toBe('display: none; ');
        });

        afterEach(function(){
            textarea.parentNode.removeChild(textarea);
        });
    });

    afterEach(function(){
        fixture.parentNode.removeChild(fixture);
    });
});
