ui.class.FileChooser = class FileChooser extends HTMLElement {
	constructor(initOptions) {
		super();
		const self = this;
		const m_utils = new ui.utils();

		// HTML tag variables
		let m_wrapperTag;
		let m_inputTag;

		let m_config;

		// Configure public methods
		this.destroy = destroyFileChooser;
		this.getInputTag = () => m_inputTag;
		this.getParentTag = () => m_wrapperTag;

		// Configure
		configure();

		setup();

		function setup() {
			installDOMTags();
		}

		function installDOMTags() {
			const parent = dom.getTag(initOptions.parentTag);
			if (!parent) {
				console.error(`File Chooser: dom. parent tag ${parent} was not found.`);
				return;
			}

			m_wrapperTag = dom.createTag(m_config.tag.parent, {
				class: m_config.css.parent,
			});

			dom.append(parent, m_wrapperTag);

			switch (m_config.buttonOnly) {
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
				text: m_config.textButton,
				fnClick: () => {
					m_inputTag.getTag().click();
				},
				css: {
					button: m_config.css.button,
				},
			};

			ui.button(config);
		}

		function installInput(hidden) {
			let inputConfig = {
				parentTag: m_wrapperTag,
				labelText: m_config.textLabel,
				attr: m_config.attr,
				css: {
					inputWrapper: m_config.css.wrapper,
				},
				events: [
					{
						name: "change",
						fn: (context) => {
							m_config.fnUpload({
								files: context.input.getTag().files,
								ev: context.ev,
							});
						},
					},
				],
				fnComplete: () => {
					if (m_config.fnComplete) {
						m_config.fnComplete({ fileChooser: self });
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

		function configure() {
			m_config = {
				buttonOnly: false,
				textButton: "Button Only - Select File",
				textLabel: "Choose files to upload",
				attr: {
					type: "file",
				},
				prop: {},
				tag: "default",
				theme: "default",
				fnUpload: (context) => {
					// Provide your callback function
				},
			};

			// If options provided, override default config
			if (initOptions) {
				m_config = m_utils.extend(true, m_config, initOptions);
			}
		}
	}
};

ui.fileChooser = (props) => new ui.class.FileChooser(props);

customElements.define("mambo-file-chooser", ui.class.FileChooser);
