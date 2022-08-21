ui.class.Rating = class Rating extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_ratingEmptyTag;
		let m_ratingSelectedTag;
		let m_ratingHoverTag;

		let m_props;
		let m_value = 0;
		let m_enable = true;

		// Configure public methods
		this.destroy = destroyRating;
		this.enable = enable;
		this.getParentTag = () => self;
		this.setup = setup;
		this.value = value;

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
				self.classList.add(m_props.css.self);
				installLayers().then(setupEventListener).then(resolve);
			});
		}

		function installLayers() {
			return new Promise((resolve) => {
				m_ratingEmptyTag = ui.d.createTag(m_props.tags.empty, {
					class: m_props.css.empty,
				});

				m_ratingSelectedTag = ui.d.createTag(m_props.tags.selected, {
					class: m_props.css.selected,
				});

				m_ratingHoverTag = ui.d.createTag(m_props.tags.hover, {
					class: m_props.css.hover,
				});

				self.appendChild(m_ratingEmptyTag);
				self.appendChild(m_ratingSelectedTag);
				self.appendChild(m_ratingHoverTag);
				installStars().then(resolve);
			});
		}

		function installStars() {
			return new Promise((resolve) => {
				for (let i = 0; i < m_props.max; i++) {
					let emptyStarTag = ui.d.createTag(m_props.tags.emptyStar, {
						class: m_props.css.emptyStar,
					});

					let selectedStarTag = ui.d.createTag(m_props.tags.selectedStar, {
						class: m_props.css.selectedStar,
					});

					let hoverStarTag = ui.d.createTag(m_props.tags.hoverStar, {
						class: m_props.css.hoverStar,
					});

					m_ratingEmptyTag.appendChild(emptyStarTag);
					m_ratingSelectedTag.appendChild(selectedStarTag);
					m_ratingHoverTag.appendChild(hoverStarTag);
				}
				resolve();
			});
		}

		function setupEventListener() {
			return new Promise((resolve) => {
				self.addEventListener("click", selectValue);
				self.addEventListener("mouseenter", setHoverValue);
				self.addEventListener("mousemove", setHoverValue);
				self.addEventListener("mouseleave", hideHoverLayer);
				resolve();
			});
		}

		function selectValue(ev) {
			if (m_enable) {
				setValue(getHoverValue(ev));

				if (m_props.fnSelect) {
					m_props.fnSelect({ Rating: self, ev: ev });
				}
			}
		}

		function setHoverValue(ev) {
			if (m_enable) {
				m_ratingSelectedTag.style.display = "none";
				m_ratingHoverTag.style.display = "block";
				m_ratingHoverTag.style.width = getStarWidth() * getHoverValue(ev) + "px";
			}
		}

		function hideHoverLayer(ev) {
			if (m_enable) {
				m_ratingHoverTag.style.display = "none";
				m_ratingSelectedTag.style.display = "block";
			}
		}

		function getStarWidth() {
			return m_ratingEmptyTag.clientWidth / m_props.max;
		}

		function getLeftPosition(ev) {
			return ev.clientX - self.getBoundingClientRect().left;
		}

		function getHoverValue(ev) {
			return Math.ceil(getLeftPosition(ev) / getStarWidth());
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_value;
			} else {
				setValue(context.value);
			}
		}

		function setValue(value) {
			return new Promise((resolve) => {
				m_value = value;
				m_ratingSelectedTag.style.display = "block";
				m_ratingHoverTag.style.display = "none";
				m_ratingSelectedTag.style.width = getStarWidth() * m_value + "px";
				resolve();
			});
		}

		function enable(enable) {
			m_enable = enable;
			setEnable();
		}

		function setEnable() {
			self.classList.toggle(m_props.css.disabled, !m_enable);
		}

		function destroyRating() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Rating: self });
			}
		}

		function configure(customProps = {}) {
			m_props = {
				tag: "default",
				theme: "default",
				value: 0,
				max: 5,
				enable: true,
			};
			m_props = ui.utils.extend(true, m_props, customProps);
			m_parentTag = ui.d.getTag(m_props.parentTag);
			m_value = m_props.value;
			m_enable = m_props.enable;
			const tags = ui.tags.getTags({ name: m_props.tag, component: "rating" });
			m_props.tags = ui.utils.extend(true, tags, m_props.tags);
			const css = ui.theme.getTheme({ name: m_props.theme, component: "rating" });
			m_props.css = ui.utils.extend(true, css, m_props.css);
		}
	}
};

ui.rating = (props) => new ui.class.Rating(props);
customElements.define("mambo-rating", ui.class.Rating);
