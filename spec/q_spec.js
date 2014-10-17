/*global describe, it, expect, Q, beforeEach */
describe('q', function(){
	it('should be defined', function(){
		expect(Q).toBeDefined();
	});

	describe('promise', function(){
		var deferred;
		var promise;

		beforeEach(function(){
			deferred = Q.defer();
			promise = deferred.promise;
		});

		it('should be created', function(){
			expect(promise).toBeDefined();
		});

		it('should resolve', function(done){
			promise.then(function(value){
				expect(value).toBeTruthy();
				done();
			});

			deferred.resolve(true);
		});
	});
});
