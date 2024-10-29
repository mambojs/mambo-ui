// Instantiate global Object Manager and required Object instances
const tools = mamboTools();
const object = tools.object();
object.save(tools.utils(), "utils");
object.save(tools.string(), "string");
object.save(tools.history(), "history");
object.save(tools.router({ historyManager: object.get("history") }), "router");
object.save(tools.api(), "api");
const dom = domJS();

const themeConfig = {
	stylesheetClasses: {
		default: "mambo-stylesheet",
		orange: "orange-stylesheet",
	},
	combinedPaths: {
		// default: "src/css/mambo-ui-0.0.1.css",
		// orange: "src/css/mambo-ui-0.0.1-orange.css",
	},
	hrefs: "src/ui/", // "src/css/",
	components: {
		common: [
			"Components/Calendar/Calendar.css",
			"Components/Checkbox/Checkbox.css",
			"Components/CheckboxGroup/CheckboxGroup.css",
			"Components/Combobox/Combobox.css",
			"Components/DatePicker/DatePicker.css",
			"Components/Dialog/Dialog.css",
			"Components/DragDrop/DragDrop.css",
			"Components/Draggable/Draggable.css",
			"Components/Dropdown/Dropdown.css",
			"Components/FileChooser/FileChooser.css",
			"Components/Grid/Grid.css",
			"Components/Input/Input.css",
			"Components/Listbox/Listbox.css",
			"Components/MapBox/MapBox.css",
			"Components/Percentage/Percentage.css",
			"Components/Player/Player.css",
			"Components/Radio/Radio.css",
			"Components/RadioGroup/RadioGroup.css",
			"Components/Rating/Rating.css",
			"Components/Search/Search.css",
			"Components/SlideOut/Slideout.css",
			"Components/Slider/Slider.css",
			"Components/Switch/Switch.css",
			"Components/Tab/Tab.css",
			"Components/Textarea/Textarea.css",
			"Components/TimePicker/TimePicker.css",
			"Components/TreeView/TreeView.css",
			"Components/VideoPlayer/VideoPlayer.css",
		],
		default: [
			"themes/m-default.css",
			"Components/Button/Button.css",
			"Components/ButtonSVG/ButtonSVG.css",
			"Components/ButtonGroup/ButtonGroup.css",
		],
		orange: [
			"themes/m-default-orange.css",
			"Components/Button/Button-Orange.css",
			"Components/ButtonSVG/ButtonSVG.css",
			"Components/ButtonGroup/ButtonGroup-Orange.css",
		],
	},
};
ui.theme.setup(themeConfig);
const theme = ui.theme.getThemeStylesheets("default");
ui.theme.loadStylesheets(theme);

// Begin Storyboard development installation
installStoryboard();

const observer = new MutationObserver((mutationsList, observer) => {
	for (const mutation of mutationsList) {
		if (mutation.type === "childList") {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE && node.tagName.toUpperCase() === "I") {
					feather.replace();
				} else if (node.nodeType === Node.ELEMENT_NODE) {
					const icons = node.querySelectorAll("i");
					if (icons.length > 0) {
						icons.forEach((icon) => {
							feather.replace();
						});
					}
				}
			});
		}
	}
});

observer.observe(document.body, {
	childList: true,
	subtree: true,
});
