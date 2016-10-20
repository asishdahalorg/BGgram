/*
    Jasmine Testing. This tests the basic functionality of the uploads page.
*/
var TestUtils;
var appComponents, element, renderedDOM;
$(function(){

describe("ModalPanel", function() {
	TestUtils = React.addons.TestUtils;
	  // beforeEach(function(){
	  // });
	it("Load Button Opens The Modal Panel", function () {
       $(".upload1").click();
		expect(
			RenderedModalPanel.state.showModal
		).toBe(true);
        
	});
 	it("Close Button Closes Modal Panel", function () {
   		$(".cancel").click();
		expect(
			RenderedModalPanel.state.showModal
		).toBe(false);  
	});
 	beforeEach(function(){
   		spyOn(RenderedModalPanel,'save').and.callThrough()
	  });
	it("State should be false and should call the save function after the clicking save, which calls onSave()", function () {	  
	   	$(".save").click();
   		expect(
			RenderedModalPanel.state.showModal
		).toBe(false); 

		expect(
			RenderedModalPanel.save

		).toHaveBeenCalled();
	});

 });
});


