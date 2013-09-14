/*global describe:false, it:false, beforeEach:false, afterEach:false, expect:false, document:false */
describe('fixture setup', function(){
    var fixture;

    beforeEach(function(){
        var body = document.getElementsByTagName('body')[0];
        fixture = document.createElement('div');
        fixture.setAttribute('class', 'fixture');
        body.appendChild(fixture);
    });

    it('should have created a fixture', function(){
        expect(fixture).toBeDefined();
    });

    describe('container', function(){
        var id = 'fixture-setup-test';

        it('can be controlled', function(){
            var div = document.createElement('div');
            div.setAttribute('id', id);
            fixture.appendChild(div);

            var found = document.getElementById(id);
            expect(found).toBeDefined();
            expect(found.getAttribute('id')).toBeDefined(id);
        });
    });

    afterEach(function(){
        fixture.parentNode.removeChild(fixture);
    });
});
