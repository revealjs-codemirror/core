/*global jasmine:false, beforeEach:false */
beforeEach(function(){
    jasmine.addMatchers({
        toIncludeStyle: function(){
			return {
				compare: function(actual, expectedStyle){
					var style = actual.getAttribute('style');
					var result = {};
					result.pass = style && style.indexOf(expectedStyle) !== -1;
					return result;
				}
			};
        }
    });
});
