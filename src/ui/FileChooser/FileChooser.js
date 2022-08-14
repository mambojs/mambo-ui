ui.class.FileChooser = class FileChooser extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		let m_parentTag;
		let m_wrapperTag;
		let m_inputTag;

		let m_props;

		// Configure public methods
		this.destroy = destroyFileChooser;
		this.getInputTag = () => m_inputTag;
		this.getParentTag = () => m_wrapperTag;
		this.install = installSelf;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			installDOM();
			finishSetup();
		}

		function installDOM() {
			m_wrapperTag = dom.createTag(m_props.tags.parent, {
				class: m_props.css.parent,
			});

			self.appendChild(m_wrapperTag);

			switch (m_props.buttonOnly) {
				case true:
					installButtonOnly();
					break;
				default:
					installInput();
					break;
			}
		}

		function installButtonOnly() {
			installInput(true);

			const config = {
				parentTag: m_wrapperTag,
				text: m_props.textButton,
				fnClick: () => {
					m_inputTag.getTag().click();
				},
				css: {
					button: m_props.css.button,
				},
			};

			ui.button(config);
		}

		function installInput(hidden) {
			let inputConfig = {
				parentTag: m_wrapperTag,
				labelText: m_props.textLabel,
				attr: m_props.attr,
				css: {
					inputWrapper: m_props.css.wrapper,
				},
				events: [
					{
						name: "change",
						fn: (context) => {
							m_props.fnUpload({
								files: context.Input.getTag().files,
								ev: context.ev,
							});
						},
					},
				],
				fnComplete: () => {
					if (m_props.fnComplete) {
						m_props.fnComplete({ FileChooser: self });
					}
				},
			};

			if (hidden) {
				inputConfig.hidden = true;
			}

			m_inputTag = ui.input(inputConfig);
		}

		function destroyFileChooser() {
			dom.remove(m_wrapperTag);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ FileChooser: self });
		}

		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.getTag(m_parentTag);
			dom.append(m_parentTag, self, prepend);
		}
		function configure(customProps) {
			m_props = {
				install: true,
				buttonOnly: false,
				textButton: "Button Only - Select File",
				textLabel: "Choose files to upload",
				attr: {
					type: "file",
				},
				tag: "default",
				theme: "default",
				fnUpload: (context) => {
					// Provide your callback function
				},
			};
			/// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "fileChooser" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "fileChooser" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.fileChooser = (props) => new ui.class.FileChooser(props);

customElements.define("mambo-file-chooser", ui.class.FileChooser);
