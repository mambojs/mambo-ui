ui.class.Card = class Card extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_bodyTag;
		let m_props;

		// Configure public methods
		this.getParentTag = () => m_parentTag;
		this.getBodyTag = () => m_bodyTag;
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
				m_bodyTag = ui.d.createTag({
					...m_props.tags.body,
					class: m_props.css.body,
				});
				m_bodyTag.innerHTML = m_props.content;
				self.appendChild(m_bodyTag);
				resolve();
			});
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Card: self });
			}
		}

		function configure(customProps = {}) {
			m_props = {
				tag: "default",
				theme: "default",
			};

			m_props = ui.utils.extend(true, m_props, customProps);
			m_parentTag = ui.d.getTag(m_props.parentTag);
			const tags = ui.tags.getTags({ name: m_props.tag, component: "card" });
			m_props.tags = ui.utils.extend(true, tags, m_props.tags);
			const css = ui.theme.getTheme({ name: m_props.theme, component: "card" });
			m_props.css = ui.utils.extend(true, css, m_props.css);
		}
	}
};

ui.card = (props) => new ui.class.Card(props);
customElements.define("mambo-card", ui.class.Card);
