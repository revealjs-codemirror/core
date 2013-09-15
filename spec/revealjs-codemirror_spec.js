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
        var textarea_with_code_class;
        var textarea_without_code_class;

        beforeEach(function(){
            textarea_with_code_class = document.createElement('textarea');
            textarea_with_code_class.setAttribute('class', 'code');
            fixture.appendChild(textarea_with_code_class);
            textarea_without_code_class = document.createElement('textarea');
            fixture.appendChild(textarea_without_code_class);
        });

        it('should be defined', function(){
            expect(textarea_with_code_class).toBeDefined();
        });

        it('should be transformed if it has a class \'code\'', function(){
            revealjscodemirror.codemirrorify();

            expect(textarea_with_code_class).toIncludeStyle('display: none;');
        });

        it('should not be transformed if it misses a class \'code\'', function(){
            revealjscodemirror.codemirrorify();

            expect(textarea_without_code_class).not.toIncludeStyle('display: none;');
        });

        afterEach(function(){
            textarea_with_code_class.parentNode.removeChild(textarea_with_code_class);
        });
    });

    afterEach(function(){
        fixture.parentNode.removeChild(fixture);
    });
});
