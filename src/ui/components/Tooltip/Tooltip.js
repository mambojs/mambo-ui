ui.class.Tooltip = class Tooltip extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		let m_anchorTag;
		let m_bodyTag;
		let m_parentTag;
		let m_props;
		let m_open;
		let m_position;

		this.show = show;
		this.hide = hide;
		this.getParentTag = () => self;
		this.getBodyTag = () => m_bodyTag;
		this.getAnchorTag = () => m_anchorTag;
		this.open = () => m_open;
		this.setup = setup;
		this.updatePosition = updatePosition;

		if (props) {
			setup(props);
		}

		async function setup(props) {
			await configure(props);

			if (!self.isConnected) {
				await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			}

			await setupDOM();
			setupEventListeners();
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				m_bodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
				self.appendChild(m_bodyTag);
				self.classList.add(m_props.css.self);

				self.style.visibility = "hidden";

				if (m_props.position) {
					m_position = m_props.position;
					self.classList.add(m_props.position);
				}

				resolve();
			});
		}

		function setupEventListeners() {
			m_anchorTag = ui.d.getTag(m_props.anchorTag);

			if (!m_anchorTag) {
				console.error("Anchor element not found for tooltip");

				return;
			}

			m_anchorTag.addEventListener("mouseover", handleMouseOver);
			m_anchorTag.addEventListener("mouseout", handleMouseOut);
			m_anchorTag.addEventListener("focus", handleFocus);
			m_anchorTag.addEventListener("blur", handleBlur);
		}

		function updatePosition() {
			if (!m_open || !m_anchorTag) return;

			const anchorRect = m_anchorTag.getBoundingClientRect();
			const tooltipRect = self.getBoundingClientRect();
			let top, left;

			switch (m_position) {
				case "top":
					top = anchorRect.top - tooltipRect.height;
					left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;
					break;
				case "bottom":
					top = anchorRect.bottom;
					left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;
					break;
				case "left":
					top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
					left = anchorRect.left - tooltipRect.width;
					break;
				case "right":
					top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
					left = anchorRect.right;
					break;
			}

			const viewport = {
				top: 0,
				left: 0,
				right: window.innerWidth,
				bottom: window.innerHeight,
			};

			if (left < viewport.left) left = viewport.left;
			if (left + tooltipRect.width > viewport.right) left = viewport.right - tooltipRect.width;
			if (top < viewport.top) top = viewport.top;
			if (top + tooltipRect.height > viewport.bottom) top = viewport.bottom - tooltipRect.height;

			self.style.top = `${top}px`;
			self.style.left = `${left}px`;
		}

		function show() {
			if (!m_open) {
				self.style.visibility = "visible";
				self.classList.add(m_props.css.open);
				m_open = true;
				updatePosition();

				if (m_props.onShow) {
					m_props.onShow({ Tooltip: self });
				}
			}
		}

		function hide() {
			if (m_open) {
				self.style.visibility = "hidden";
				self.classList.remove(m_props.css.open);
				m_open = false;

				if (m_props.onHide) {
					m_props.onHide({ Tooltip: self });
				}
			}
		}

		function setupComplete() {
			if (m_props.onComplete) {
				m_props.onComplete({ Tooltip: self });
			}
		}

		function handleMouseOver() {
			if (m_props.onMouseOver) {
				m_props.onMouseOver({ Tooltip: self });
			}
		}

		function handleMouseOut() {
			if (m_props.onMouseOut) {
				m_props.onMouseOut({ Tooltip: self });
			}
		}

		function handleFocus() {
			if (m_props.onFocus) {
				m_props.onFocus({ Tooltip: self });
			}
		}

		function handleBlur() {
			if (m_props.onBlur) {
				m_props.onBlur({ Tooltip: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					parentTag: "body",
					position: "top",
					theme: "default",
					tag: "default",
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "tooltip" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "tooltip" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.tooltip = (props) => new ui.class.Tooltip(props);
customElements.define(ui.defaultTags.tooltip.self.name, ui.class.Tooltip);
