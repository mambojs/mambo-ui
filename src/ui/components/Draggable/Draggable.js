ui.class.Draggable = class Draggable extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

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
		this.enable = setEnable;
		this.getParentTag = () => m_draggableTag;
		this.getHandleWidth = () => m_draggableTag.clientWidth;
		this.getHandleHeight = () => m_draggableTag.clientHeight;
		this.setPosition = setPosition;
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
				m_draggableTag = ui.d.createTag({ ...m_props.tags.draggable, class: m_props.css.draggable });
				self.classList.add(m_props.css.self);
				self.appendChild(m_draggableTag);
				setupEventHandler().then(resolve);
			});
		}

		function setupEventHandler() {
			return new Promise((resolve) => {
				document.addEventListener("touchstart", dragStart, false);
				document.addEventListener("mousedown", dragStart, false);
				document.addEventListener("touchmove", drag, false);
				document.addEventListener("mousemove", drag, false);
				document.addEventListener("touchend", dragEnd, false);
				document.addEventListener("mouseup", dragEnd, false);
				resolve();
			});
		}

		function dragStart(ev) {
			if (m_enable) {
				const boundingTag = m_props.containerTag ? ui.d.getTag(m_props.containerTag) : null;
				m_bounding = boundingTag ? boundingTag.getBoundingClientRect() : null;
				m_xOffset = m_draggableTag.offsetLeft;
				m_yOffset = m_draggableTag.offsetTop;

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
			if (xPos) {
				m_draggableTag.style.left = m_xOffset + xPos + "px";
			}

			if (yPos) {
				m_draggableTag.style.top = m_yOffset + yPos + "px";
			}
		}

		function setEnable(enable) {
			m_enable = enable;
		}

		function destroyDraggable() {
			ui.d.remove(m_draggableTag);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Draggable: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					enable: true,
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				m_enable = m_props.enable;
				m_axis = m_props.axis === "x" ? 0 : m_props.axis === "y" ? 1 : null;
				const tags = ui.tags.getTags({ name: m_props.tag, component: "draggable" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "draggable" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.draggable = (props) => new ui.class.Draggable(props);
customElements.define("mambo-draggable", ui.class.Draggable);
