function demoCheckboxRadioGroup(parentEle) {

    checkboxGroup();
    radioGroup();

    function checkboxGroup() {
        const config = {
            checkboxes: [{
                id: 1,
                text: "Checkbox One",
                value: "One",
                fnClick: (context) => {
                    // You can declare individual event handlers for each checkbox
                }
            }, {
                id: 2,
                text: "Checkbox Two",
                value: "Two"
            }, {
                id: 3,
                text: "Checkbox Three",
                value: "Three"
            }],
            fnClick: (context) => {
                // You can declare a single event handler for all checkboxes
                console.log(`Checkbox id: ${context.checkboxRadio.getId()} ${context.checkboxRadio.select() ? 'checked' : 'not checked'}.`);
            },
            fnGroupClick: (context) => {
                // You can declare an event handler for the group
                console.log(`Selected:`);
                const selected = context.checkboxRadioGroup.select();
                selected.forEach((checkbox) => console.log(`${checkbox.value()}`));
            }
        };

        new MamboCheckboxRadioGroup(parentEle, config);
    }

    function radioGroup() {
        const config = {
            radios: [{
                id: 1,
                text: "Radio One",
                value: "One",
                fnClick: (context) => {
                    // You can declare individual event handlers for each checkbox
                }
            }, {
                id: 2,
                text: "Radio Two",
                value: "Two"
            }, {
                id: 3,
                text: "Radio Three",
                value: "Three"
            }],
            fnClick: (context) => {
                // You can declare a single event handler for all checkboxes
                console.log(`Radio id: ${context.checkboxRadio.getId()} ${context.checkboxRadio.select() ? 'checked' : 'not checked'}.`);
            },
            fnGroupClick: (context) => {
                // You can declare an event handler for the group
                console.log(`Selected: ${context.checkboxRadioGroup.select()[0].value()}`);
            }
        };

        new MamboCheckboxRadioGroup(parentEle, config);
    }
}
