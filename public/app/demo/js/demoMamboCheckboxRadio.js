function demoCheckboxRadio(parentEle) {

    checkbox();
    radio();

    function checkbox() {
        const config = {
            id: 1,
            text: "Checkbox",
            fnClick: (context) => {
                console.log(`Checkbox id: ${context.checkboxRadio.getId()} ${context.checkboxRadio.select() ? 'checked' : 'not checked'}.`);
            }
        };

        new MamboCheckboxRadio(parentEle, config);
    }

    function radio() {
        const config = {
            id: 2,
            text: "Radio",
            attr: {
                type: "radio"
            },
            fnClick: (context) => {
                console.log(`Radio id: ${context.checkboxRadio.getId()} ${context.checkboxRadio.select() ? 'checked' : 'not checked'}.`);
            }
        };

        new MamboCheckboxRadio(parentEle, config);
    }
}
