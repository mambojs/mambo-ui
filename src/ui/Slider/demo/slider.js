//: Slider
//@
sliderStoryboard("storyboard-slider");

function sliderStoryboard(parentEle) {
	defaultSlider();
	verticalSlider();

	function defaultSlider() {
		const config = {
			parentTag: parentEle,
			fnSelect: (context) => {
				console.log(context.slider.value());
			},
		};

		ui.slider(config);
	}

	function verticalSlider() {
		const config = {
			parentTag: parentEle,
			orientation: "vertical",
			fnSelect: (context) => {
				console.log(context.slider.value());
			},
		};

		ui.slider(config);
	}
}
//!
