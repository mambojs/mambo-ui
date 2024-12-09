class Template extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// Define member variables
		let m_props;

		// Define tag member variables
		let m_parentTag;

		// Define public functions
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
			// More logic Promises here
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				// Logic
				resolve();
			});
		}

		function setupComplete() {
			if (m_props.onComplete) {
				m_props.onComplete({ UITemplate: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "template" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "template" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
}

// Must ALWAYS define the new element as a Native Web Component
customElements.define(ui.defaultTags.template.self.name, Template);
