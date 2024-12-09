function installStoryboard(props) {
	const storyParentTag = dom.getTag("story-tab");

	let stories = props.components;
	let selectedStory = null;
	let documentations = {};

	setup();

	function setup() {
		configureStoriesData();
		installComponentTreeView();
		setupHomeButton();
		loadDocumentation().then();
	}

	function configureStoriesData() {
		// Add props to stories collection
		stories.map((story) => {
			story.id = story.text.replaceAll(" ", "-").toLowerCase();
			const storyWrapperClass = `story-${story.id}-wrapper`;
			story.parentTag = dom.createTag(`story-${story.id}`, { class: storyWrapperClass });
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
			onSelect: loadComponent,
		};

		ui.treeView(treeViewConfig);
	}

	async function loadComponent({ itemData }) {
		if (!itemData.id) {
			// User clicked the main Tree
			return;
		}

		selectedStory = stories.find((story) => story.id === itemData.id);
		selectedStory.parentTag.innerHTML = null;
		storyParentTag.innerHTML = null;

		storyParentTag.appendChild(dom.createTag("h4", { text: selectedStory.text }));

		// Invoke story function from the global scope
		const fnName = `story${selectedStory.text.replaceAll(" ", "")}`;
		const storyFn = window[fnName];
		storyFn(selectedStory);
		installTab();
		await outputCode(selectedStory.text);
	}

	function installTab() {
		let tabConfig = {
			parentTag: storyParentTag,
			tabs: {
				buttons: [
					{
						id: 0,
						text: "Demo",
						onClick: (context) => {},
					},
					{
						id: 1,
						text: "Code",
					},
					{
						id: 2,
						text: "Documentation",
						onClick: async (context) => {
							outputDocumentation(selectedStory.text);
						},
					},
				],
				onClick: (buttonContext) => {},
			},
			onTabComplete: (contentTag, tab) => {
				const storyContainer = dom.getTag("story-container");
				storyContainer.appendChild(selectedStory.parentTag);
			},
			contents: [
				dom.createTag("story-container"),
				dom.createTag("code-container", { class: "code-container" }),
				dom.createTag("documentation-container", { class: "documentation-container" }),
			],
		};

		ui.tab(tabConfig);
	}

	async function outputCode(storyName) {
		const file = await fetch(`getFile?type=story&name=${storyName}`);
		const text = await file.text();
		const codeElement = dom.createTag("pre", { class: "prettyprint lang-basic", text: text });
		const codeContainer = dom.getTag("code-container");
		codeContainer.appendChild(codeElement);
		PR.prettyPrint();
	}

	async function loadDocumentation() {
		const file = await fetch("getFile?type=documentation");
		const text = await file.text();
		const descriptionElement = dom.createTag("description-element");
		descriptionElement.innerHTML = addIdsToHeadings(marked.parse(text));
		storyParentTag.appendChild(descriptionElement);
	}

	function slugify(text) {
		return text
			.toString()
			.toLowerCase()
			.trim()
			.replace(/[\s]+/g, " ")
			.replace(/[^\w-]+/g, "");
	}

	function addIdsToHeadings(htmlContent) {
		const tempDiv = document.createElement("div");
		tempDiv.innerHTML = htmlContent;
		const headings = tempDiv.querySelectorAll("h2");
		documentations = {};

		headings.forEach((heading, index) => {
			const headingId = slugify(heading.textContent);
			heading.setAttribute("id", headingId);

			let sectionContent = `<h2 id="${headingId}">${heading.textContent}</h2>`;
			let nextElement = heading.nextElementSibling;

			while (nextElement && nextElement.tagName !== "H2") {
				sectionContent += nextElement.outerHTML;
				nextElement = nextElement.nextElementSibling;
			}

			documentations[headingId] = sectionContent;
		});

		return tempDiv.innerHTML;
	}

	function outputDocumentation(storyName) {
		const sectionId = slugify(storyName);
		const documentationContainer = dom.getTag("documentation-container");

		if (documentations[sectionId]) {
			documentationContainer.innerHTML = documentations[sectionId];
		}
	}

	function setupHomeButton() {
		const homeButton = dom.getTag("#homeButton");
		homeButton.setup({
			id: "homeButton",
			text: "Home",
			size: "medium",
			onClick: () => {
				storyParentTag.innerHTML = null;
				loadDocumentation();
			},
		});
	}
}
