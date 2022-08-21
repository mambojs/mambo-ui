ui.class.FileChooser = class FileChooser extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_inputTag;

		let m_props;

		// Configure public methods
		this.destroy = destroyFileChooser;
		this.getInputTag = () => m_inputTag;
		this.getParentTag = () => self;
		this.setup = setup;

		if (props) {
			setup(props);
		}

		async function setup(props) {
			await configure(props);
			await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			await setupDOM();
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				self.classList.add(m_props.css.self);

				switch (m_props.buttonOnly) {
					case true:
						installButtonOnly().then(resolve);
						break;
					default:
						installInput().then(resolve);
						break;
				}
			});
		}

		function installButtonOnly() {
			return new Promise((resolve) => {
				installInput(true).then(() => {
					const config = {
						parentTag: self,
						text: m_props.textButton,
						fnClick: () => {
							m_inputTag.getTag().click();
						},
						css: {
							button: m_props.css.button,
						},
					};

					ui.button(config);
					resolve();
				});
			});
		}

		function installInput(hidden) {
			return new Promise((resolve) => {
				let inputConfig = {
					parentTag: self,
					labelText: m_props.textLabel,
					attr: m_props.attr,
					css: {
						self: m_props.css.wrapper,
					},
					events: [
						{
							name: "change",
							fn: (context) => {
								if (m_props.fnUpload) {
									m_props.fnUpload({
										files: context.Input.getTag().files,
										ev: context.ev,
									});
								}
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
				resolve();
			});
		}

		function destroyFileChooser() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ FileChooser: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					textButton: "Button Only - Select File",
					textLabel: "Choose files to upload",
					attr: {
						type: "file",
					},
					tag: "default",
					theme: "default",
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "fileChooser" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "fileChooser" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.fileChooser = (props) => new ui.class.FileChooser(props);
customElements.define("mambo-file-chooser", ui.class.FileChooser);
