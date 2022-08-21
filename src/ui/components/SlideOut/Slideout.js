ui.class.Slideout = class Slideout extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_slideoutHeaderTag;
		let m_slideoutBodyTag;
		let m_slideoutOverlayTag;

		let m_props;

		this.close = close;
		this.destroy = destroySlideout;
		this.getContentTag = () => self;
		this.getHeaderTag = () => m_slideoutHeaderTag;
		this.getBodyTag = () => m_slideoutBodyTag;
		this.open = openAnimation;
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
				m_slideoutHeaderTag = ui.d.createTag(m_props.tags.header, { class: m_props.css.header });
				m_slideoutBodyTag = ui.d.createTag(m_props.tags.body, { class: m_props.css.body });

				m_slideoutOverlayTag = ui.d.createTag(m_props.tags.overlay, {
					class: m_props.css.overlay,
					event: {
						click: closeAnimation,
					},
				});

				self.classList.add(m_props.css.self);
				self.appendChild(m_slideoutHeaderTag);
				self.appendChild(m_slideoutBodyTag);
				self.appendChild(m_slideoutOverlayTag);
				installCloseButton().then(resolve);
			});
		}

		function installCloseButton() {
			return new Promise((resolve) => {
				if (m_props.closeButton) {
					const config = m_props.closeButton;
					config.parentTag = m_slideoutHeaderTag;
					config.fnClick = closeAnimation;
					ui.button(config);
				}
				resolve();
			});
		}

		function openAnimation() {
			self.classList.add("open");
			m_slideoutOverlayTag.classList.add("fade-in");
			if (m_props.fnOpen) {
				m_props.fnOpen({ slideout: self });
			}
		}

		function close() {
			closeAnimation();
		}

		function closeAnimation() {
			self.classList.remove("open");
			m_slideoutOverlayTag.classList.remove("fade-in");

			if (m_props.fnClose) {
				m_props.fnClose({ slideout: self });
			}
		}

		function destroySlideout() {
			ui.d.remove(self).remove(m_slideoutOverlayTag);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Slideout: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					closeButton: {
						text: "X",
						css: {
							button: "slideout-close-button",
						},
					},
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "slideout" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "slideout" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.slideout = (props) => new ui.class.Slideout(props);
customElements.define("mambo-slideout", ui.class.Slideout);
