//: Slider
//@
demoSlider("demo-slider")

function demoSlider(parentEle) {

    defaultSlider();
    verticalSlider();

    function defaultSlider() {
        const config = {
            fnSelect: (context) => {
                console.log(context.slider.value());
            }
        };

        new ui.slider(parentEle, config);
    }

    function verticalSlider() {
        const config = {
            orientation: "vertical",
            showButtons: false,
            fnSelect: (context) => {
                console.log(context.slider.value());
            }
        };

        new ui.slider(parentEle, config);
    }
}
//!