/*global beforeEach:false */
beforeEach(function(){
    this.addMatchers({
        toIncludeStyle: function(expectedStyle){
            var container = this.actual;
            var style = container.getAttribute('style');
            return style && style.indexOf(expectedStyle) !== -1;
        }
    });
});
