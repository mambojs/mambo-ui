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

			if (!self.isConnected) {
				await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			}

			await setupDOM();
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				m_slideoutHeaderTag = ui.d.createTag({ ...m_props.tags.header, class: m_props.css.header });
				m_slideoutBodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });

				m_slideoutOverlayTag = ui.d.createTag({
					...m_props.tags.overlay,
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
				if (m_props.enableCloseButton) {
					const configButton = { css: m_props.css.button, ...m_props.closeButton };
					configButton.parentTag = m_slideoutHeaderTag;
					configButton.onClick = closeAnimation;
					ui.button(configButton);
				}

				resolve();
			});
		}

		function openAnimation() {
			self.classList.add(m_props.css.open);
			m_slideoutOverlayTag.classList.add(m_props.css.openAnimation);

			if (m_props.onOpen) {
				m_props.onOpen({ slideout: self });
			}
		}

		function close() {
			closeAnimation();
		}

		function closeAnimation() {
			self.classList.remove(m_props.css.open);
			m_slideoutOverlayTag.classList.remove(m_props.css.openAnimation);

			if (m_props.onClose) {
				m_props.onClose({ slideout: self });
			}
		}

		function destroySlideout() {
			ui.d.remove(self).remove(m_slideoutOverlayTag);
		}

		function setupComplete() {
			if (m_props.onComplete) {
				m_props.onComplete({ Slideout: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					enableCloseButton: true,
					tag: "default",
					theme: "default",
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
customElements.define(ui.defaultTags.slideout.self.name, ui.class.Slideout);
