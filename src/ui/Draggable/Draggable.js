ui.class.Draggable = class Draggable extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		let m_parentTag;
		let m_draggableTag;

		let m_props;
		let m_enable = true;
		let m_active = false;
		let m_axis; //null: no axis, 0: x, 1: y
		let m_initialX;
		let m_initialY;
		let m_xOffset;
		let m_yOffset;
		let m_bounding = null;

		// Configure public methods
		this.destroy = destroyDraggable;
		this.enable = enable;
		this.getParentTag = () => m_draggableTag;
		this.install = installSelf;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setOptionValues();
		}

		function setOptionValues() {
			m_enable = m_props.enable;
			m_axis = m_props.axis === "x" ? 0 : m_props.axis === "y" ? 1 : null;
			setupDOM();
		}

		function setupDOM() {
			const tagConfig = {
				class: m_props.css.parent,
				prop: m_props.prop,
				attr: m_props.attr,
			};
			m_draggableTag = dom.createTag(m_props.tags.parent, tagConfig);
			setEnable(m_enable);
			self.appendChild(m_draggableTag);
			setupEventHandler();
		}

		function setupEventHandler() {
			document.addEventListener("touchstart", dragStart, false);
			document.addEventListener("touchend", dragEnd, false);
			document.addEventListener("touchmove", drag, false);

			document.addEventListener("mousedown", dragStart, false);
			document.addEventListener("mouseup", dragEnd, false);
			document.addEventListener("mousemove", drag, false);
			loadDOM();
		}

		function dragStart(ev) {
			if (m_enable) {
				const boundingTag = m_props.containerTag ? dom.getTag(m_props.containerTag) : null;
				m_bounding = boundingTag ? boundingTag.getBoundingClientRect() : null;
				m_xOffset = m_draggableTag.offsetLeft;
				m_yOffset = m_draggableTag.offsetTop;

				let m_initialCenter = [];

				if (ev.type === "touchstart") {
					m_initialX = ev.touches[0].clientX;
					m_initialY = ev.touches[0].clientY;
				} else {
					m_initialX = ev.clientX;
					m_initialY = ev.clientY;
				}

				if (ev.target === m_draggableTag) {
					m_active = true;
				}

				if (m_active && m_props.fnDragStart) {
					m_props.fnDragStart({ Draggable: self, ev: ev });
				}
			}
		}

		function dragEnd(ev) {
			if (m_enable) {
				if (m_active && m_props.fnDragEnd) {
					m_props.fnDragEnd({ Draggable: self, ev: ev });
				}

				m_active = false;
			}
		}

		function drag(ev) {
			if (m_enable && m_active) {
				ev.preventDefault();

				let mouseEvent = ev.type === "touchmove" ? ev.touches[0] : ev;

				let clientX = mouseEvent.clientX;
				let clientY = mouseEvent.clientY;

				if (m_bounding) {
					clientX = Math.max(m_bounding.left, Math.min(clientX, m_bounding.right));
					clientY = Math.max(m_bounding.top, Math.min(clientY, m_bounding.bottom));
				}

				let currentX = m_axis !== 1 ? clientX - m_initialX : 0;
				let currentY = m_axis !== 0 ? clientY - m_initialY : 0;

				if (Array.isArray(m_props.grid) && m_props.grid.length === 2) {
					if (m_bounding) {
						currentX = getAxisStep(currentX, m_props.grid[0], m_bounding.left - m_initialX, m_bounding.right - m_initialX);
						currentY = getAxisStep(currentY, m_props.grid[1], m_bounding.top - m_initialY, m_bounding.bottom - m_initialY);
					} else {
						currentX = getAxisStep(currentX, m_props.grid[0]);
						currentY = getAxisStep(currentY, m_props.grid[1]);
					}
				}

				setPosition(currentX, currentY);

				if (m_props.fnDrag && (currentX !== 0 || currentY !== 0)) {
					m_props.fnDrag({ Draggable: self, ev: ev });
				}
			}
		}

		function getAxisStep(current, step, min = null, max = null) {
			if (current !== 0) {
				if (step === 0) {
					return 0;
				} else {
					let value = Math.round(current / step);
					if (max !== null && value * step > max) {
						return (value - 1) * step;
					}
					if (min !== null && value * step < min) {
						return (value + 1) * step;
					}
					return value * step;
				}
			}
		}

		function setPosition(xPos, yPos) {
			m_draggableTag.style.left = m_xOffset + xPos + "px";
			m_draggableTag.style.top = m_yOffset + yPos + "px";
		}

		function enable(context = {}) {
			if (typeof context.enable === "undefined") {
				return m_enable;
			} else {
				setEnable(context.enable);
			}
		}

		function setEnable(enable) {
			m_enable = enable;
		}

		function destroyDraggable() {
			dom.remove(m_draggableTag);
		}

		function loadDOM() {
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			if (m_props.fnComplete) m_props.fnComplete({ Draggable: self });
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
				enable: true,
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "draggable" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "draggable" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.draggable = (props) => new ui.class.Draggable(props);
customElements.define("mambo-draggable", ui.class.Draggable);
