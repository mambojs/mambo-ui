//: Percentage
//@
demoPercentage("demo-percentage")

function demoPercentage(parentEle) {

    lowPercentage();
    highPercentage();
    fullPercentage();

    function lowPercentage() {
        const config = {
            value: .3
        };

        new ui.percentage(parentEle, config);
    }

    function highPercentage() {
        const config = {
            value: .8
        };

        new ui.percentage(parentEle, config);
    }

    function fullPercentage() {
        const config = {
            value: 1
        };

        new ui.percentage(parentEle, config);
    }
}
//!