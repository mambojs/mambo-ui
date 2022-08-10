ui.class.MamboSlideout = class MamboSlideout extends HTMLElement {
	constructor(parentTag, options) {
		super();
		const self = this;
		const m_utils = new ui.utils();

		// HTML tag variables
		let m_parentTag;
		let m_slideoutContentTag;
		let m_slideoutHeaderTag;
		let m_slideoutBodyTag;
		let m_slideoutOverlayTag;

		let m_config;

		this.close = close;
		this.getContentTag = () => m_slideoutContentTag;
		this.getHeaderTag = () => m_slideoutHeaderTag;
		this.getBodyTag = () => m_slideoutBodyTag;
		this.destroy = destroySlideout;
		this.open = openAnimation;

		configure();

		setup();

		function setup() {
			m_parentTag = dom.getTag(parentTag);

			if (!m_parentTag) {
				console.error(`Slideout: dom. parent tag ${parentTag} was not found.`);
				return;
			}

			installDOM();
			installCloseButton();
			installEventHandler();
		}

		function installDOM() {
			m_slideoutHeaderTag = dom.createTag(m_config.tag.header, {
				class: m_config.css.header,
			});
			m_slideoutBodyTag = dom.createTag(m_config.tag.body, {
				class: m_config.css.body,
			});
			m_slideoutContentTag = dom.createTag(m_config.tag.content, {
				class: m_config.css.content,
			});
			dom.append(m_slideoutContentTag, m_slideoutHeaderTag).append(m_slideoutContentTag, m_slideoutBodyTag);

			m_slideoutOverlayTag = dom.createTag(m_config.tag.overlay, {
				class: m_config.css.overlay,
			});
			dom.append(m_parentTag, m_slideoutContentTag).append(m_parentTag, m_slideoutOverlayTag);

			finishSetup();
		}

		function openAnimation() {
			dom.addClass(m_slideoutContentTag, "open");
			dom.addClass(m_slideoutOverlayTag, "fade-in");
			if (m_config.fnOpen) {
				m_config.fnOpen({ slideout: self });
			}
		}

		function close() {
			closeAnimation();
		}

		function closeAnimation() {
			dom.removeClass(m_slideoutContentTag, "open");
			dom.removeClass(m_slideoutOverlayTag, "fade-in");
			if (m_config.fnClose) {
				m_config.fnClose({ slideout: self });
			}
		}

		function destroySlideout() {
			dom.remove(m_slideoutContentTag).remove(m_slideoutOverlayTag);
		}

		function installCloseButton() {
			if (!m_config.closeButton) {
				return;
			}

			const config = m_config.closeButton;
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
			// Execute complete callback function
			if (m_config.fnComplete) {
				m_config.fnComplete({ slideout: self });
			}
		}

		function configure() {
			m_config = {
				tag:"default",
				theme: "default",
				closeButton: {
					attr: {
						type: "button",
					},
					img: {
						attr: {
							src: ui.graphics.getImage({ name: "x-black" }),
						},
					},
					css: {
						button: "slideout-close-button",
					},
				},
				fnClose: (context) => {
					// Nothing executes by default
				},
				fnOpen: (context) => {
					// Nothing executes by default
				},
			};

			// If options provided, override default config
			if (options) {
				m_config = m_utils.extend(true, m_config, options);
			}

			m_config.css = m_utils.extend(
				true,
				m_theme.getTheme({
					name: m_config.theme,
					control: "slideout",
				}),
				m_config.css
			);
		}
	}
};

ui.slideout = (parentTag, options) => new ui.class.MamboSlideout(parentTag, options);

customElements.define("mambo-slideout", ui.class.MamboSlideout);
