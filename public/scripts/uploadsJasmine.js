/*
    Jasmine Testing. This tests the basic functionality of the uploads page.
*/
var TestUtils;
var appComponents, element, renderedDOM;
$(function(){

describe("ModalPanel", function() {
	TestUtils = React.addons.TestUtils;
	it("Load Button Opens The Modal Panel", function () {
       $(".upload1").click();
		expect(
			RenderedModalPanel.state.showModal
		).toBe(true);
        
	});
 	it("Close Button Closes Modal Panel", function () {
 		RenderedModalPanel.open();
   		$(".cancel").click();
		expect(
			RenderedModalPanel.state.showModal
		).toBe(false);  
	});


	it("Modal panel should be closed after clicking save", function () {	
		RenderedModalPanel.open();  
	   	$(".save").click();
   		expect(
			RenderedModalPanel.state.showModal
		).toBe(false); 
	});
	it("Should call the save function after clicking save, which calls onSave()", function () {	
        spyOn(RenderedModalPanel, "save");
	    RenderedModalPanel.save();
		expect(RenderedModalPanel.save).toHaveBeenCalled();
	});

 });



});


