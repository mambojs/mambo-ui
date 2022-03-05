function demoPercentage(parentEle) {

    lowPercentage();
    highPercentage();

    function lowPercentage() {
        const config = {
            value: .3
        };

        new MamboPercentage(parentEle, config);
    }

    function highPercentage() {
        const config = {
            value: .8
        };

        new MamboPercentage(parentEle, config);
    }
}