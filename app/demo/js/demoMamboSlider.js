function demoSlider(parentEle) {

    defaultSlider();
    verticalSlider();

    function defaultSlider() {
        const config = {
            parentTag: parentEle,
            orientation: "horizontal",
            showButtons: true,
            fnSelect: (context) => {
                console.log(context.slider.value());
            }
        };

         new MamboSlider(config);
    }

    function verticalSlider() {
        const config = {
            parentTag: parentEle,
            orientation: "vertical",
            showButtons: true,
            fnSelect: (context) => {
                console.log(context.slider.value());
            }
        };

        new MamboSlider(config);
    }
}

    
