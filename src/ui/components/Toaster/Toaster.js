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
		let m_timeout;

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
		this.restart = restart;
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

				setupStyles();

				addIcon(m_props.css.icon[m_type]);
				m_message = m_props.message;
				m_bodyTag.innerHTML = m_props.message;
				self.appendChild(m_iconContainer);
				self.appendChild(m_bodyTag);
				self.appendChild(m_buttonContainer);
				resolve();
			});
		}

		async function restart(context = {}) {
			m_iconList.length = 0;
			m_iconContainer.innerHTML = "";
			m_props.open = context.open;

			await configure(context);

			self.classList.remove(m_props.css.position[m_position?.horizontal]);
			self.classList.remove(m_props.css.position[m_position?.vertical]);
			self.classList.remove(m_props.css.position.centerV);

			if (m_type) {
				self.classList.remove(m_props.css.type[m_type]);
			}

			if (m_size) {
				self.classList.remove(m_props.css.size[m_size]);
			}

			m_autoHideDuration = m_props.autoHideDuration;

			setupStyles();

			addIcon(m_props.css.icon[m_type]);
			m_message = m_props.message;
			m_bodyTag.innerHTML = m_props.message;

			setupComplete();

			return self;
		}

		function setupStyles() {
			self.style.setProperty(m_props.distanceXVar, `${m_props.distance.x}`);
			self.style.setProperty(m_props.distanceYVar, `${m_props.distance.y}`);
			self.style.setProperty(m_props.animationDistanceVar, `${m_props.animation.distance}`);
			self.style.setProperty(m_props.animationDurationVar, `${m_props.animation.duration}`);

			if (m_props.animation.name === "top-bottom") {
				self.classList.remove(m_props.css.animation.topBottomOut);
				self.classList.remove(m_props.css.animation.bottomTopOut);
				self.classList.add(m_props.css.animation.topBottomIn);
			}

			if (m_props.animation.name === "bottom-top") {
				self.classList.remove(m_props.css.animation.topBottomOut);
				self.classList.remove(m_props.css.animation.bottomTopOut);
				self.classList.add(m_props.css.animation.bottomTopIn);
			}

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

			m_props.open ? (self.style.display = "flex") : (self.style.display = "none");
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
					onClick: (context) => {
						if (m_props.onClose) {
							m_props.onClose({
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
			if (m_timeout) {
				clearTimeout(m_timeout);
				m_timeout = null;
			}

			if (m_open) {
				if (m_props.animation.name) {
					closeAnimation();
				} else {
					if (m_props.persist) {
						self.style.display = "none";
						m_open = false;
					} else {
						if (self && self.parentNode) ui.d.remove(self);
						m_open = false;
					}
				}
			}

			if (!m_open) {
				if (m_props.persist) {
					if (m_props.animation.name) {
						closeAnimation();
					} else {
						self.style.display = "none";
					}
				}

				if (m_props.animation.name) {
					closeAnimation();
				}
			}

			if (m_props.onClosed) m_props.onClosed({ Toaster: self });
		}

		function closeAnimation() {
			if (m_props.animation.name === "top-bottom") {
				self.classList.remove(m_props.css.animation.topBottomIn);
				self.classList.add(m_props.css.animation.topBottomOut);
			}

			if (m_props.animation.name === "bottom-top") {
				self.classList.remove(m_props.css.animation.bottomTopIn);
				self.classList.add(m_props.css.animation.bottomTopOut);
			}

			const animationName = window.getComputedStyle(self).getPropertyValue("animation-name");

			self.addEventListener("animationend", function handler(event) {
				if (event.animationName === animationName) {
					if (m_props.persist) {
						self.style.display = "none";
						m_open = false;
					} else {
						if (self && self.parentNode) ui.d.remove(self);
						m_open = false;
					}

					self.removeEventListener("animationend", handler);
				}
			});
		}

		function setupComplete() {
			if (m_props.onComplete) {
				if (m_props.autoHideDuration) {
					m_timeout = setTimeout(() => {
						close();
						m_timeout = null;
					}, m_props.autoHideDuration);
				}

				m_props.onComplete({ Toaster: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					open: true,
					parentTag: "body",
					closeButton: true,
					button: { text: "" },
					closeText: "",
					theme: "default",
					tag: "default",
					anchorOrigin: { horizontal: "center", vertical: "top" },
					distanceXVar: "--m-toaster-distance-x",
					distanceYVar: "--m-toaster-distance-y",
					animationDistanceVar: "--m-toaster-animation-distance",
					animationDurationVar: "--m-toaster-animation-duration",
					animation: { distance: "100%", duration: "0.3s" },
					distance: { x: "1.5rem", y: "1.5rem" },
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
