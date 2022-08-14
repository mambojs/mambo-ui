function storyDraggable(selectedStory) {
	basic();
	fullScreen();
	axisX();
	axisY();
	grid();

	function basic() {
		const containerTag = dom.createTag("div", { class: "draggable-container" });
		containerTag.appendChild(dom.createTag("span", { class: "draggable-text", text: "Drag" }));
		selectedStory.parentTag.appendChild(containerTag);
		const config = {
			containerTag: containerTag,
			parentTag: containerTag,
		};

		ui.draggable(config);
	}

	function fullScreen() {
		const containerTag = dom.createTag("div", { class: "draggable-container" });
		containerTag.appendChild(dom.createTag("span", { class: "draggable-text", text: "Drag Without Container" }));
		selectedStory.parentTag.appendChild(containerTag);

		const config = {
			parentTag: containerTag,
		};

		ui.draggable(config);
	}

	function axisX() {
		const containerTag = dom.createTag("div", { class: "draggable-container" });
		containerTag.appendChild(dom.createTag("span", { class: "draggable-text", text: "Drag x Axis" }));
		selectedStory.parentTag.appendChild(containerTag);

		const config = {
			containerTag: containerTag,
			parentTag: containerTag,
			axis: "x",
		};
		ui.draggable(config);
	}

	function axisY() {
		const containerTag = dom.createTag("div", { class: "draggable-container" });
		containerTag.appendChild(dom.createTag("span", { class: "draggable-text", text: "Drag y Axis" }));
		selectedStory.parentTag.appendChild(containerTag);

		const config = {
			containerTag: containerTag,
			parentTag: containerTag,
			axis: "y",
		};

		ui.draggable(config);
	}

	function grid() {
		const containerTag = dom.createTag("div", { class: "draggable-container" });
		containerTag.appendChild(dom.createTag("span", { class: "draggable-text", text: "Drag grid [30, 30]" }));
		selectedStory.parentTag.appendChild(containerTag);

		const config = {
			containerTag: containerTag,
			parentTag: containerTag,
			grid: [30, 30],
		};

		ui.draggable(config);
	}
}
