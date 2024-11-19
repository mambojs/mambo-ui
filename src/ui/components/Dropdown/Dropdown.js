ui.class.Dropdown = class Dropdown extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_dropdownContainerTag;

		let m_props;
		let m_open = false;

		// Configure public methods
		this.close = close;
		this.destroy = destroyDropdown;
		this.getContentTag = () => m_dropdownContainerTag;
		this.getParentTag = () => self;
		this.open = open;
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
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				self.classList.add(m_props.css.self);
				setupOpenButton().then(setupContainer).then(setupEventHandler).then(resolve);
			});
		}

		function setupOpenButton() {
			return new Promise((resolve) => {
				if (m_props.disableButton) {
					resolve();
					return;
				}

				let button = ui.utils.extend(true, {}, m_props.button);
				button.css = ui.utils.extend(true, m_props.css.button, button.css);
				button.parentTag = self;
				button.text = button.text || "";
				button.fnComplete = resolve;

				button.fnClick = (context) => {
					if (m_props.button?.fnClick) {
						m_props.button.fnClick(context);
					} else {
						if (m_open) {
							closeAnimation(context.ev);
						} else {
							openAnimation();
						}
					}
				};

				ui.button(button);
			});
		}

		function setupContainer() {
			return new Promise((resolve) => {
				m_dropdownContainerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
				self.appendChild(m_dropdownContainerTag);

				if (m_props.positionTag) {
					ui.d.computeTagHeight(m_props.positionTag).then((tagHeight) => {
						m_dropdownContainerTag.style.top = `${tagHeight}px`;
						resolve();
					});
				} else {
					resolve();
				}
			});
		}

		function setupEventHandler() {
			return new Promise((resolve) => {
				window.addEventListener("click", function (ev) {
					if (m_open && !m_dropdownContainerTag.contains(ev.target)) {
						closeAnimation(ev);
					}
				});
				resolve();
			});
		}

		function open() {
			openAnimation();
		}

		function openAnimation() {
			m_dropdownContainerTag.classList.add(m_props.css.open);
			m_open = true;
			if (m_props.fnOpen) {
				m_props.fnOpen({ dropdown: self });
			}
		}

		function close(context = {}) {
			closeAnimation(context.ev);
		}

		function closeAnimation(ev) {
			if (m_props.fnBeforeClose && !m_props.fnBeforeClose({ ev: ev })) {
				return;
			}

			m_dropdownContainerTag.classList.remove(m_props.css.open);
			m_open = false;

			if (m_props.fnClose) {
				m_props.fnClose({ dropdown: self });
			}
		}

		function destroyDropdown() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Dropdown: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					fnBeforeClose: (context) => {
						return true;
					},
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "dropdown" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "dropdown" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.dropdown = (props) => new ui.class.Dropdown(props);
customElements.define(ui.defaultTags.dropdown.self.name, ui.class.Dropdown);
