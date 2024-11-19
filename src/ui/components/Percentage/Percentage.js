ui.class.Percentage = class Percentage extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_percentageBarTag;
		let m_percentageTextTag;

		let m_props;
		let m_value = 0;

		// Configure public methods
		this.destroy = destroyPercentage;
		this.getParentTag = () => self;
		this.setup = setup;
		this.value = value;

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
				m_percentageBarTag = ui.d.createTag({ ...m_props.tags.bar, class: m_props.css.bar });
				m_percentageTextTag = ui.d.createTag({ ...m_props.tags.text, class: m_props.css.text });
				m_percentageBarTag.appendChild(m_percentageTextTag);
				setValue(m_value);
				self.classList.add(m_props.css.self);
				self.appendChild(m_percentageBarTag);
				resolve();
			});
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
			m_percentageTextTag.innerText = ui.utils.formatPercentage(m_value, m_props.decimals);
		}

		function setBarWidth() {
			m_percentageBarTag.style.width = m_value * 100 + "%";
		}

		function setRange() {
			if (ui.utils.isArray(m_props.ranges) && m_props.ranges.length > 0) {
				let range = m_props.ranges.find((range) => {
					return m_value >= range.min && m_value <= range.max;
				});
				if (range && range.css) {
					clearRangeClasses();
					m_percentageBarTag.classList.add(range.css);
				}
			}
		}

		function clearRangeClasses() {
			m_props.ranges.forEach((range) => {
				m_percentageBarTag.classList.remove(range.css);
			});
		}

		function destroyPercentage() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Percentage: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
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
							css: "m-percentage-range-low",
						},
						{
							min: 0.5,
							max: 1,
							css: "m-percentage-range-high",
						},
					],
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				m_value = m_props.value;
				const tags = ui.tags.getTags({ name: m_props.tag, component: "percentage" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "percentage" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.percentage = (props) => new ui.class.Percentage(props);
customElements.define(ui.defaultTags.percentage.self.name, ui.class.Percentage);
