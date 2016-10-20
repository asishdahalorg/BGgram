/**
 * Created by Asish on 10/19/2016.
 */

describe("Various buttons", function() {
    var TestUtils = React.addons.TestUtils;
    var renderedmenu, element, renderedDOM;
    beforeEach(function(){
        var firebase = firebase
    });
    it("Has login button", function () {
        element = React.createElement(loginmenu);
        renderedmenu = TestUtils.renderIntoDocument(element);
        letbuttons = TestUtils.scryRenderedDOMComponentsWithTag(renderedmenu, "button");
        expect(buttons[1]).not.toBeUndefined();
        expect(buttons[1].innerHTML).toBe("New");
    });
    it("Has Log off button", function () {
        element = React.createElement("logoffmenu");
        renderedmenu = TestUtils.renderIntoDocument(element);
        letbuttons = TestUtils.scryRenderedDOMComponentsWithTag(renderedmenu, "button");
        expect(buttons[1]).not.toBeUndefined();
        expect(buttons[1].innerHTML).toBe("New");

    });
    it("Communicates with firebase to authenticate ", function () {
        element = React.createElement("logoffmenu");
        renderedmenu = TestUtils.renderIntoDocument(element);
        var inputs = TestUtils.scryRenderedDOMComponentsWithTag(renderedmenu,"input");
        var setSpy;
        setSpy = jasmine.createSpy();
        spyOn(firebase.auth,"signInWithEmailAndPassword");
        inputs[0].value = "wrongemail@gmail.com";
        inputs[1].value  = "password";
        TestUtils.Simulate.change(inputs[0]);
        TestUtils.Simulate.change(inputs[1]);
        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalled();
        expect(firebase.auth().signInWithEmailAndPassword).toHaveBeenCalled();
    });

});
