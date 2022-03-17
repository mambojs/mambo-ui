function demoRating(parentEle) {
    defaultRating();
    tenStars();
    disabled();

    function defaultRating() {
        const config = {
            fnSelect: (context) => {
                console.log(context.rating.value());
            }
        };

        new MamboRating(parentEle, config);
    }

    function tenStars() {
        const config = {
            css: {
                parent: "rating-parent-ten",
            },
            value: 5,
            max: 10,
            fnSelect: (context) => {
                console.log(context.rating.value());
            }
        };

        new MamboRating(parentEle, config);
    }

    function disabled() {
        const config = {
            value: 3,
            enable: false
        };

        new MamboRating(parentEle, config);
    }
}