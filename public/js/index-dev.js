// Instantiate global Object Manager and required Object instances
const tools = mamboTools();
const object = tools.object();
object.save(tools.utils(), "utils");
object.save(tools.string(), "string");
object.save(tools.history(), "history");
object.save(tools.router({ historyManager: object.get("history") }), "router");
object.save(tools.api(), "api");
const dom = domJS();

const components = [
	{ text: "Button" },
	{ text: "Button SVG" },
	{ text: "Button Group" },
	{ text: "Calendar" },
	{ text: "Card" },
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
	{ text: "ListMenu" },
	{ text: "MapBox" },
	{ text: "Pagination" },
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
	{ text: "Toaster" },
	{ text: "Tooltip" },
	{ text: "Time Picker" },
	{ text: "TreeView" },
	{ text: "Video Player" },
];

const path = "ui/";

const defaultCompStylesheets = components.map((component) => {
	const name = component.text.replaceAll(" ", "");

	return `${path}components/${name}/${name}.css`;
});

const orangeCompStylesheets = components.map((component) => {
	const name = component.text.replaceAll(" ", "");

	return `${path}components/${name}/${name}-Orange.css`;
});

const purpleCompStylesheets = components.map((component) => {
	const name = component.text.replaceAll(" ", "");

	return `${path}components/${name}/${name}-Purple.css`;
});

const defaultStylesheets = { stylesheets: [...defaultCompStylesheets, ...[`${path}themes/m-default.css`]] };
const orangeStylesheets = { stylesheets: [...orangeCompStylesheets, ...[`${path}themes/m-orange.css`]] };
const purpleStylesheets = { stylesheets: [...purpleCompStylesheets, ...[`${path}themes/m-purple.css`]] };

ui.theme.loadStylesheets(defaultStylesheets);

function setupThemeCombobox() {
	const combobox = dom.getTag("#themeCombobox");
	combobox.setup({
		data: [
			{ id: 1, text: "Default Theme" },
			{ id: 2, text: "Orange Theme" },
			{ id: 3, text: "Purple Theme" },
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
		onSelect: ({ Combobox }) => {
			if (Combobox.value() === 1) {
				ui.theme.reloadStylesheets(defaultStylesheets);
			} else if (Combobox.value() === 2) {
				ui.theme.reloadStylesheets(orangeStylesheets);
			} else {
				ui.theme.reloadStylesheets(purpleStylesheets);
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

setupThemeCombobox();

installStoryboard({ components });
