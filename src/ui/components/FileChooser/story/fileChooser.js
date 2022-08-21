function storyFileChooser(selectedStory) {
	singleFile();
	multipleFiles();

	function singleFile() {
		const config = {
			parentTag: selectedStory.parentTag,
			textLabel: "Choose a single .txt file.",
			attr: {
				accept: ".txt",
			},
			fnUpload: handleFileSelection,
		};

		ui.fileChooser(config);
	}

	function multipleFiles() {
		const config = {
			parentTag: selectedStory.parentTag,
			attr: {
				multiple: true,
			},
			fnUpload: handleFileSelection,
		};

		ui.fileChooser(config);
	}

	function handleFileSelection(context) {
		console.log(context.files);
	}
}
