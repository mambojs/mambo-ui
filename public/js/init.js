// Main Object where Mambo UI is Built
const ui = { class: {}, d: domJS() };

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
	{ text: "Toaster" },
	{ text: "Time Picker" },
	{ text: "TreeView" },
	{ text: "Video Player" },
];

async function loadScripts() {
	ui.storyFn = ui.storyFn || {};

	const classNames = components.map((component) => {
		return component.text.replaceAll(" ", "");
	});

	await Promise.all(
		classNames.map(async (className) => {
			try {
				const [scriptResponse, storyResponse] = await Promise.all([
					fetch(`/getFile?type=script&name=${className}`),
					fetch(`/getFile?type=story&name=${className}`),
				]);

				const scriptContent = await scriptResponse.text();
				const storyContent = await storyResponse.text();

				const scriptFunction = new Function("ui", scriptContent);
				scriptFunction(ui);

				const functionName = `story${className}`;
				window[functionName] = new Function(`return ${storyContent}`)();
			} catch (error) {
				console.error(`Error loading script for ${className}:`, error);
			}
		})
	);
}

loadScripts().then(() => {
	installStoryboard({ components });
	setupThemeCombobox();

	const path = "ui/";

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
});
