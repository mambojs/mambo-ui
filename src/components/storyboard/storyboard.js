function installStoryboard() {
	const storyParentTag = dom.getTag("storyboard-component");
	let stories;
	setup();

	function setup() {
		configureStoriesData();
		installComponentTreeView();
	}

	function configureStoriesData() {
		// Use alpha characters and spaces only, any other char will break
		stories = [
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
			{ text: "Slideout" },
			{ text: "Slider" },
			{ text: "Switch" },
			{ text: "Tab" },
			{ text: "Time Picker" },
			{ text: "TreeView" },
			{ text: "Video Player" },
		];

		// Add props to stories collection
		stories.map((story) => {
			story.id = story.text.replaceAll(" ", "-").toLowerCase();
			story.parentTag = dom.createTag(`story-${story.id}`);
		});
	}

	function installComponentTreeView() {
		const treeViewConfig = {
			parentTag: "storyboard-treeview",
			data: [
				{
					text: "UI Components",
					items: stories,
				},
			],
			expanded: true,
			fnSelect: loadComponent,
		};

		ui.treeView(treeViewConfig);
	}

	function loadComponent({ itemData }) {
		if (!itemData.id) {
			// User clicked the main Tree
			return;
		}

		const selectedStory = stories.find((story) => story.id === itemData.id);
		selectedStory.parentTag.innerHTML = null;
		storyParentTag.innerHTML = null;
		storyParentTag.appendChild(dom.createTag("h4", { text: selectedStory.text }));
		storyParentTag.appendChild(selectedStory.parentTag);

		// Invoke story function from the global scope
		const fnName = `story${selectedStory.text.replaceAll(" ", "")}`;
		const storyFn = window[fnName];
		storyFn(selectedStory);
		const storyFnContent = window[fnName].toString();

		installTab();

		//outputCode(selectedStory.name);
	}

	function installTab() {
		let tabConfig = {
			parentTag: storyParentTag,
			tabs: {
				buttons: [
					{
						text: "Tab 1",
						fnClick: (context) => {
							// You can declare individual event handlers for tab clicks
						},
					},
					{
						text: "Tab 2",
					},
					{
						text: "Tab 3",
					},
				],
				fnClick: (buttonContext) => {
					// You can declare a single event handler for all tab clicks
				},
			},
			fnTabReady: (contentTag, tab) => {},
		};

		//ui.tab(tabConfig);
	}

	async function outputCode(storyName) {
		const file = await fetch(`getStoryCodeExample?name=${storyName}`).then((resp) => resp.text());
		const codeEle = dom.createTag("code", { class: "prettyprint lang-basic", text: file });
		storyParentTag.appendChild(codeEle);
		PR.prettyPrint();
	}
}
