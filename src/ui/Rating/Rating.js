ui.class.Rating = class Rating extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);
		const m_tags = ui.tagNames(ui.defaultTagNames);

		// HTML tag variables
		let m_parentTag;
		let m_ratingParentTag;
		let m_ratingEmptyTag;
		let m_ratingSelectedTag;
		let m_ratingHoverTag;

		let m_props;
		let m_value = 0;
		let m_enable = true;

		// Configure public methods
		this.destroy = destroyRating;
		this.enable = enable;
		this.getParentTag = () => m_ratingParentTag;
		this.install = installSelf;
		this.setup = setup;
		this.value = value;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setOptionValues();
			installDOM();
			setupEventHandler();
			finishSetup();
			// Must set value after installation
			setValue(m_value);
		}

		function setOptionValues() {
			m_value = m_props.value;
			m_enable = m_props.enable;
		}

		function installDOM() {
			m_ratingParentTag = dom.createTag(m_props.tags.rating, {
				class: m_props.css.parent,
			});
			self.appendChild(m_ratingParentTag);
			installLayers();
			setEnable(m_enable);
		}

		function installLayers() {
			m_ratingEmptyTag = dom.createTag(m_props.tags.empty, {
				class: m_props.css.empty,
			});
			dom.append(m_ratingParentTag, m_ratingEmptyTag);

			m_ratingSelectedTag = dom.createTag(m_props.tags.selected, {
				class: m_props.css.selected,
			});
			dom.append(m_ratingParentTag, m_ratingSelectedTag);

			m_ratingHoverTag = dom.createTag(m_props.tags.hover, {
				class: m_props.css.hover,
			});
			dom.append(m_ratingParentTag, m_ratingHoverTag);

			installStars();
		}

		function installStars() {
			for (let i = 0; i < m_props.max; i++) {
				let emptyStarTag = dom.createTag(m_props.tags.emptyStar, {
					class: m_props.css.emptyStar,
				});
				dom.append(m_ratingEmptyTag, emptyStarTag);

				let selectedStarTag = dom.createTag(m_props.tags.selectedStar, {
					class: m_props.css.selectedStar,
				});
				dom.append(m_ratingSelectedTag, selectedStarTag);

				let hoverStarTag = dom.createTag(m_props.tags.hoverStar, {
					class: m_props.css.hoverStar,
				});
				dom.append(m_ratingHoverTag, hoverStarTag);
			}
		}

		function setupEventHandler() {
			m_ratingParentTag.addEventListener("click", selectValue);
			m_ratingParentTag.addEventListener("mouseenter", setHoverValue);
			m_ratingParentTag.addEventListener("mousemove", setHoverValue);
			m_ratingParentTag.addEventListener("mouseleave", hideHoverLayer);
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
			return ev.clientX - m_ratingParentTag.getBoundingClientRect().left;
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
			m_value = value;
			m_ratingSelectedTag.style.display = "block";
			m_ratingHoverTag.style.display = "none";
			m_ratingSelectedTag.style.width = getStarWidth() * m_value + "px";
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
			m_enable ? dom.removeClass(m_ratingParentTag, m_props.css.disabled) : dom.addClass(m_ratingParentTag, m_props.css.disabled);
		}

		function destroyRating() {
			dom.remove(m_ratingParentTag);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ Rating: self });
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
				value: 0,
				max: 5,
				enable: true,
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "rating" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "rating" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.rating = (props) => new ui.class.Rating(props);

customElements.define("mambo-rating", ui.class.Rating);
