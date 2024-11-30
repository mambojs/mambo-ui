ui.class.Toaster = class Toaster extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_iconList = [];

		// HTML tag variables
		let m_button;
		let m_bodyTag;
		let m_buttonContainer;
		let m_iconContainer;
		let m_parentTag;
		let m_props;
		let m_autoHideDuration;
		let m_open;
		let m_message;
		let m_size;
		let m_type;
		let m_position;

		// Configure public methods
		this.close = close;
		this.button = () => m_button;
		this.getParentTag = () => self;
		this.getBodyTag = () => m_bodyTag;
		this.getMessage = () => m_message;
		this.getButtonContainer = () => m_buttonContainer;
		this.getIconList = () => m_iconList;
		this.autoHideDuration = () => m_autoHideDuration;
		this.open = () => m_open;
		this.setup = setup;

		if (props) {
			setup(props);
		}

		async function setup(props) {
			await configure(props);

			if (!self.isConnected) {
				await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			}

			await setupDOM();
			m_autoHideDuration = m_props.autoHideDuration;
			m_open = m_props.open;
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				m_iconContainer = ui.d.createTag({ ...m_props.tags.iconContainer, class: m_props.css.iconContainer });
				m_bodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
				m_buttonContainer = ui.d.createTag({ ...m_props.tags.buttonContainer, class: m_props.css.buttonContainer });
				installCloseButton();
				self.classList.add(m_props.css.self);

				if (m_props.parentTag !== "body") {
					self.classList.add("m-toaster-static");
				} else {
					m_position = m_props.anchorOrigin;
					m_size = m_props.size;
					m_type = m_props.type;
					self.classList.add(m_props.css.position[m_position.horizontal]);

					if (m_position.vertical === "center") {
						self.classList.add(m_props.css.position.centerV);
					} else {
						self.classList.add(m_props.css.position[m_position.vertical]);
					}

					if (m_size) {
						self.classList.add(m_props.css.size[m_size]);
					}
				}

				if (m_type) {
					self.classList.add(m_props.css.type[m_type]);
				}

				addIcon(m_props.css.icon[m_type]);
				m_message = m_props.message;
				m_bodyTag.innerHTML = m_props.message;
				self.appendChild(m_iconContainer);
				self.appendChild(m_bodyTag);
				self.appendChild(m_buttonContainer);
				resolve();
			});
		}

		function addIcon(icon) {
			const tagConfig = {
				class: icon,
			};

			let iconTag = ui.d.createTag("i", tagConfig);
			m_iconList.push(iconTag);
			m_iconContainer.appendChild(iconTag);
		}

		function installCloseButton() {
			if (m_props.closeButton) {
				const btnConfig = {
					...m_props.button,
					css: m_props.css.button,
					parentTag: m_buttonContainer,
					attr: {
						type: "button",
					},
					fnClick: (context) => {
						close();

						if (m_props.fnClose) {
							m_props.fnClose({
								Toaster: self,
								Button: context.Button,
								ev: context.ev,
							});
						}
					},
				};

				m_button = ui.button(btnConfig);
			}
		}

		function close() {
			if (m_open) {
				ui.d.remove(self);
				m_open = false;
			}
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Toaster: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					parentTag: "body",
					closeButton: true,
					button: { text: "" },
					closeText: "",
					theme: "default",
					tag: "default",
					anchorOrigin: { horizontal: "center", vertical: "top" },
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "toaster" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "toaster" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.toaster = (props) => new ui.class.Toaster(props);
customElements.define(ui.defaultTags.toaster.self.name, ui.class.Toaster);
