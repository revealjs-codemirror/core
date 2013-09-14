/*global describe:false, it:false, expect:false, revealjscodemirror*/
describe('revealjs-codemirror', function(){
    var namespace = revealjscodemirror;

    it('should have a namespace', function(){
        expect(namespace).toBeDefined();
    });

    describe('namespace', function(){
        it('should have a version', function(){
            expect(namespace.version).toBeDefined();
        });
    });
});
