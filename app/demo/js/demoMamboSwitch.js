function demoSwitch(parentEle) {

    defaultSwitch();
    checkedSwitch();
    customTextSwitch();
    disabledSwitch();

    function defaultSwitch() {
        const config = {
            fnChange: (context) => {
                console.log(context.switch.checked());
            }
        };

        new MamboSwitch(parentEle, config);
    }

    function checkedSwitch() {
        const config = {
            checked: true,
            fnChange: (context) => {
                console.log(context.switch.checked());
            }
        };

        new MamboSwitch(parentEle, config);
    }

    function customTextSwitch() {
        const config = {
            checked: true,
            messages: {
                checked: "YES",
                unchecked: "NO"
            },
            fnChange: (context) => {
                console.log(context.switch.checked());
            }
        };

        new MamboSwitch(parentEle, config);
    }

    function disabledSwitch() {
        const config = {
            enable: false,
            fnChange: (context) => {
                console.log(context.switch.checked());
            }
        };

        new MamboSwitch(parentEle, config);
    }
}
