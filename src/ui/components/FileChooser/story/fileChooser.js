function storyFileChooser(selectedStory) {
	singleFile();
	multipleFiles();

	function singleFile() {
		const config = {
			parentTag: selectedStory.parentTag,
			buttonOnly: true,
			button: {
				text: "Choose a single .txt file",
			},
			input: {
				tags: {
					input: { attr: { accept: ".txt" } },
				},
			},
			fnUpload: handleFileSelection,
		};

		ui.fileChooser(config);
	}

	function multipleFiles() {
		const config = {
			parentTag: selectedStory.parentTag,
			input: {
				tags: {
					input: { attr: { multiple: true } },
				},
			},
			fnUpload: handleFileSelection,
		};

		ui.fileChooser(config);
	}

	function handleFileSelection(context) {
		console.log(context.files);
	}
}
