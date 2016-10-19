/*
    Jasmine Testing
*/


describe("ModalPanel", function() {
	  var TestUtils = React.addons.TestUtils;
	  var appComponents, element, renderedDOM;
	  beforeEach(function(){
	  	element = React.createElement("ModalPanel");
	  	appComponents = TestUtils.renderIntoDocument(element);
	  	appComponents.close;
	  });
	 it("Has Load Button and Close Modal", function () {
        let button =  "#uploadId";
        // TestUtils.Simulate.click(button);
		expect({
			// appComponents.state.showModal.toBeTruthy;
		});
        
	});

 });


