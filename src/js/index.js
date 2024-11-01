// Instantiate global Object Manager and required Object instances
const tools = mamboTools();
const object = tools.object();
object.save(tools.utils(), "utils");
object.save(tools.string(), "string");
object.save(tools.history(), "history");
object.save(tools.router({ historyManager: object.get("history") }), "router");
object.save(tools.api(), "api");
const dom = domJS();

// Use alpha characters and spaces only, any other char will break
const components = [
	{ text: "Button" },
	{ text: "Button SVG" },
	{ text: "Button Group" },
	{ text: "Calendar" },
	{ text: "Checkbox" },
	{ text: "Checkbox Group" },
	{ text: "Combobox" },
	{ text: "Date Picker" },
	{ text: "Dialog" },
	{ text: "Drag Drop" },
	{ text: "Draggable" },
	{ text: "Dropdown" },
	{ text: "File Chooser" },
	{ text: "Grid" },
	{ text: "Input" },
	{ text: "Listbox" },
	{ text: "MapBox" },
	{ text: "Percentage" },
	{ text: "Radio" },
	{ text: "Radio Group" },
	{ text: "Rating" },
	{ text: "Search" },
	{ text: "Slideout" },
	{ text: "Slider" },
	{ text: "Switch" },
	{ text: "Tab" },
	{ text: "Textarea" },
	{ text: "Time Picker" },
	{ text: "TreeView" },
	{ text: "Video Player" },
];

const path = "src/ui/";

const defaultCompStylesheets = components.map((component) => {
	const name = component.text.replaceAll(" ", "");
	return `${path}components/${name}/${name}.css`;
});

const orangeCompStylesheets = components.map((component) => {
	const name = component.text.replaceAll(" ", "");
	return `${path}components/${name}/${name}-Orange.css`;
});

const defaultStylesheets = { stylesheets: [...defaultCompStylesheets, ...[`${path}themes/m-default.css`]] };
const orangeStylesheets = { stylesheets: [...orangeCompStylesheets, ...[`${path}themes/m-orange.css`]] };

ui.theme.loadStylesheets(defaultStylesheets);

// Begin Storyboard development installation
installStoryboard({ components });
setupThemeCombobox();

function setupThemeCombobox() {
	const combobox = dom.getTag("#themeCombobox");
	combobox.setup({
		data: [
			{ id: 1, text: "Default Theme" },
			{ id: 2, text: "Orange Theme" },
		],
		value: "Default Theme",
		input: {
			placeholder: "Select theme",
		},
		dropdown: {
			button: {
				text: "",
			},
		},
		fnSelect: ({ Combobox }) => {
			if (Combobox.value() === 1) {
				ui.theme.reloadStylesheets(defaultStylesheets);
			} else {
				ui.theme.reloadStylesheets(orangeStylesheets);
			}
		},
	});
}

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
