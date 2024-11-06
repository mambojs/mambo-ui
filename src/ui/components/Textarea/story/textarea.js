function storyTextarea(selectedStory) {
	const textareaConfig = {
		parentTag: selectedStory.parentTag,
		editable: true,
		attr: {
			textarea: { placeholder: "editable@email.com" },
		},
		required: true,
		fnBlur: ({ Textarea }) => {
			Textarea.showRequired();
		},
	};

	ui.textarea(textareaConfig);
}
