ui.class.Slideout = class Slideout extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		let m_parentTag;
		let m_slideoutContentTag;
		let m_slideoutHeaderTag;
		let m_slideoutBodyTag;
		let m_slideoutOverlayTag;

		let m_props;

		this.close = close;
		this.destroy = destroySlideout;
		this.getContentTag = () => m_slideoutContentTag;
		this.getHeaderTag = () => m_slideoutHeaderTag;
		this.getBodyTag = () => m_slideoutBodyTag;
		this.install = installSelf;
		this.open = openAnimation;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			installDOM();
			installCloseButton();
			installEventHandler();
			finishSetup();
		}

		function installDOM() {
			m_slideoutHeaderTag = dom.createTag(m_props.tags.header, { class: m_props.css.header });
			m_slideoutBodyTag = dom.createTag(m_props.tags.body, { class: m_props.css.body });
			m_slideoutContentTag = dom.createTag(m_props.tags.content, { class: m_props.css.content });
			m_slideoutContentTag.appendChild(m_slideoutHeaderTag);
			m_slideoutContentTag.appendChild(m_slideoutBodyTag);
			m_slideoutOverlayTag = dom.createTag(m_props.tags.overlay, { class: m_props.css.overlay });
			self.appendChild(m_slideoutContentTag);
			self.appendChild(m_slideoutOverlayTag);
		}

		function openAnimation() {
			dom.addClass(m_slideoutContentTag, "open");
			dom.addClass(m_slideoutOverlayTag, "fade-in");
			if (m_props.fnOpen) {
				m_props.fnOpen({ slideout: self });
			}
		}

		function close() {
			closeAnimation();
		}

		function closeAnimation() {
			dom.removeClass(m_slideoutContentTag, "open");
			dom.removeClass(m_slideoutOverlayTag, "fade-in");
			if (m_props.fnClose) {
				m_props.fnClose({ slideout: self });
			}
		}

		function destroySlideout() {
			dom.remove(m_slideoutContentTag).remove(m_slideoutOverlayTag);
		}

		function installCloseButton() {
			if (!m_props.closeButton) {
				return;
			}

			const config = m_props.closeButton;
			config.parentTag = m_slideoutHeaderTag;
			config.fnClick = () => {
				closeAnimation();
			};

			ui.button(config);
		}

		function installEventHandler() {
			m_slideoutOverlayTag.addEventListener("click", (ev) => {
				closeAnimation();
			});
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ Slideout: self });
		}

		function installSelf(parentTag, prepend) {
			m_parentTag = parentTag ? parentTag : m_parentTag;
			m_parentTag = dom.getTag(m_parentTag);
			dom.append(m_parentTag, self, prepend);
		}

		function configure(customProps) {
			m_props = {
				install: true,
				tag: "default",
				theme: "default",
				closeButton: {
					text: "X",
					css: {
						button: "slideout-close-button",
					},
				},
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "slideout" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "slideout" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.slideout = (props) => new ui.class.Slideout(props);

customElements.define("mambo-slideout", ui.class.Slideout);