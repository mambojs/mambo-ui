function demoButtonGroup(parentEle) {

    // Look at the single Button demo configuration for a complete breakdown of all individual button options
    // A Button Group is simply a collection of individual Buttons

    let btnGroupProps = {
        buttons: [{
            id: 1,
            text: "Button One",
            fnClick: (context) => {
                // You can declare individual event handlers for each button
            }
        }, {
            id: 2,
            text: "Button Two"
        }, {
            id: 3,
            text: "Button Three"
        }],
        fnClick: (context) => {
            // You can declare a single event handler for all buttons
            alert(`'Button clicked: ' ${context.button.getId()}`);
        }
    };

    new MamboButtonGroup(parentEle, btnGroupProps);
}