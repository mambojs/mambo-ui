function installStoryboard() {
	const dom = object.get("dom");
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
			{ name: "Button" },
			{ name: "Button Group" },
			{ name: "Calendar" },
			{ name: "Checkbox Radio" },
			{ name: "Checkbox Radio Group" },
			{ name: "Combobox" },
			{ name: "Date Picker" },
			{ name: "Dialog" },
			{ name: "Drag Drop" },
			{ name: "Draggable" },
			{ name: "Dropdown" },
			{ name: "File Chooser" },
			{ name: "Grid" },
			{ name: "Input" },
			{ name: "Percentage" },
			{ name: "Rating" },
			{ name: "Slideout" },
			{ name: "Slider" },
			{ name: "Switch" },
			{ name: "Tab" },
			{ name: "Time Picker" },
			{ name: "TreeView" },
			{ name: "Video Player" },
		];
		// Add props to stories collection
		stories.map((story) => {
			story.text = story.name;
			story.id = story.name.replaceAll(" ", "-").toLowerCase();
			story.parentTag = dom.createTag(`story-${story.id}`);
			story.storyFnName = `story${story.name.replaceAll(" ", "")}`;
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
		if (!itemData.id) return; // User clicked the main Tree
		const selectedStory = stories.find((story) => story.id === itemData.id);
		storyParentTag.innerHTML = null;
		storyParentTag.appendChild(dom.createTag("h4", { text: selectedStory.name }));
		storyParentTag.appendChild(selectedStory.parentTag);

		// Invoke story function from the global scope
		window[selectedStory.storyFnName](selectedStory);

		//installTab();

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
			fnTabReady: (contentTag, tab) => {
				contentTag.appendChild("test");
			},
		};

		ui.tab(tabConfig);
	}

	async function outputCode(storyName) {
		const file = await fetch(`getStoryCodeExample?name=${storyName}`).then((resp) => resp.text());
		const codeEle = dom.createTag("code", { class: "prettyprint lang-basic", text: file });
		storyParentTag.appendChild(codeEle);
		PR.prettyPrint();
	}
}
