ui.class.Percentage = class Percentage extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);
		const m_tags = ui.tagNames(ui.defaultTagNames);

		// HTML tag variables
		let m_parentTag;
		let m_percentageParentTag;
		let m_percentageBarTag;
		let m_percentageTextTag;

		let m_props;
		let m_value = 0;

		// Configure public methods
		this.destroy = destroyPercentage;
		this.getParentTag = () => m_percentageParentTag;
		this.install = installSelf;
		this.setup = setup;
		this.value = value;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setOptionValues();
			installDOM();
			finishSetup();
		}

		function setOptionValues() {
			m_value = m_props.value;
		}

		function installDOM() {
			m_percentageParentTag = dom.createTag(m_props.tags.percentage, {
				class: m_props.css.parent,
			});

			self.appendChild(m_percentageParentTag);

			m_percentageBarTag = dom.createTag(m_props.tags.bar, {
				class: m_props.css.bar,
			});
			dom.append(m_percentageParentTag, m_percentageBarTag);

			m_percentageTextTag = dom.createTag(m_props.tags.text, {
				class: m_props.css.text,
			});
			dom.append(m_percentageBarTag, m_percentageTextTag);

			setValue(m_value);
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
			setText();
			setRange();
			setBarWidth();
		}

		function setText() {
			m_percentageTextTag.innerText = m_utils.formatPercentage(m_value, m_props.decimals);
		}

		function setBarWidth() {
			m_percentageBarTag.style.width = m_value * 100 + "%";
		}

		function setRange() {
			if (m_utils.isArray(m_props.ranges) && m_props.ranges.length > 0) {
				let range = m_props.ranges.find((range) => {
					return m_value >= range.min && m_value <= range.max;
				});
				if (range && range.css) {
					clearRangeClasses();
					dom.addClass(m_percentageBarTag, range.css);
				}
			}
		}

		function clearRangeClasses() {
			m_props.ranges.forEach((range) => {
				dom.removeClass(m_percentageBarTag, range.css);
			});
		}

		function destroyPercentage() {
			dom.remove(m_percentageParentTag);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ Percentage: self });
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
				min: 0,
				max: 1,
				decimals: 0,
				ranges: [
					{
						min: 0,
						max: 0.5,
						css: "percentage-range-low",
					},
					{
						min: 0.5,
						max: 1,
						css: "percentage-range-high",
					},
				],
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "percentage" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "percentage" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.percentage = (props) => new ui.class.Percentage(props);

customElements.define("mambo-percentage", ui.class.Percentage);
