describe('q', function(){
	it('should be defined', function(){
		expect(Q).toBeDefined();
	});

	describe('promise', function(){
		var promise;

		beforeEach(function(){
			promise = Q.defer().promise;
		});

		it('should be created', function(){
			expect(promise).toBeDefined();
		});
	});
});
