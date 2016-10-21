$(function(){
	describe("Submit button", function() {

		it("Search Submit functionality", function () {	
				spyOn(searchClass, "searchClick");
				searchClass.searchClick()
				expect(searchClass.searchClick.calls.any()).toEqual(true);
		});
	});
	describe("KeyUp button", function() {

		it("Search KeyUp functionality", function () {	
				spyOn(searchClass, "keyUp");
				searchClass.keyUp()
				expect(searchClass.keyUp.calls.any()).toEqual(true);
		});
	});
	describe("From PXLR Option", function() {
		searchClass.fromPIXLR();
		it("Photo From PXLR Search Option when fromPxlr not active, if fails fromPxlr is active.", function () {	
				expect(fromPxlr).toEqual(false);
		});
		it("Photo From PXLR Search Option when fromPxlr active. If fails fromBGgram is active.", function () {	
				expect(fromPxlr).toEqual(true);
		});
	});
	describe("From BGgram Option", function() {
		searchClass.fromBGgram();
		it("Photo From BGgram Search Search Option when fromPxlr not active. If fails fromBGgram is active.", function () {	
				expect(fromPxlr).toEqual(true);
		});
		it("Photo From BGgram Search Search Option when fromPxlr active. If fials, fromPxlr is active.", function () {	
				expect(fromPxlr).toEqual(false);
		});
	});
});