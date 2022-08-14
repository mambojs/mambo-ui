ui.class.Slider = class Slider extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme();
		const m_tags = ui.tagNames();

		// HTML tag variables
		let m_parentTag;
		let m_sliderParentTag;
		let m_sliderWrapperTag;
		let m_trackTag;
		let m_selectionTag;
		let m_handleTag;
		let m_stepTags = [];

		let m_props;
		let m_horizontal = true;
		let m_css;
		let m_enable = true;
		let m_value = 0;
		let m_stepLength;

		// Configure public methods
		this.destroy = destroySlider;
		this.enable = enable;
		this.getParentTag = () => m_sliderParentTag;
		this.install = installSelf;
		this.setup = setup;
		this.value = value;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			setOptionValues();
		}

		function setOptionValues() {
			m_enable = m_props.enable;
			m_value = m_props.value;
			m_horizontal = m_props.orientation !== "vertical";
			m_css = m_horizontal ? m_props.css.horizontal : m_props.css.vertical;
			setupDOM();
		}

		function setupDOM() {
			m_sliderParentTag = dom.createTag(m_props.tags.slider, {
				class: m_css.parent,
			});

			self.appendChild(m_sliderParentTag);

			m_sliderWrapperTag = dom.createTag(m_props.tags.wrapper, {
				class: m_css.wrapper,
			});

			if (m_props.showButtons) {
				if (m_horizontal) {
					installButton(m_props.decreaseButton, m_css.decreaseButton, decrease);
				} else {
					installButton(m_props.increaseButton, m_css.increaseButton, increase);
				}
			}

			dom.append(m_sliderParentTag, m_sliderWrapperTag);

			if (m_props.showButtons) {
				if (m_horizontal) {
					installButton(m_props.increaseButton, m_css.increaseButton, increase);
				} else {
					installButton(m_props.decreaseButton, m_css.decreaseButton, decrease);
				}
			}

			loadDOM();
		}

		function installButton(config, css, fnClick) {
			let button = m_utils.extend(true, {}, config);
			button.css = m_utils.extend(true, css, button.css);
			button.parentTag = m_sliderParentTag;

			button.fnClick = (context) => {
				fnClick();

				if (m_props.fnSelect) {
					m_props.fnSelect({ Slider: self, ev: context.ev });
				}

				if (config.fnClick) {
					config.fnClick(context);
				}
			};

			ui.button(button);
		}

		function decrease() {
			setValue(m_value - m_props.step);
		}

		function increase() {
			setValue(m_value + m_props.step);
		}

		function installTrack() {
			m_trackTag = dom.createTag(m_props.tags.track, { class: m_css.track });
			m_sliderWrapperTag.appendChild(m_trackTag);

			m_selectionTag = dom.createTag(m_props.tags.selection, {
				class: m_css.selection,
			});
			dom.append(m_sliderWrapperTag, m_selectionTag);

			installSteps();
		}

		function installSteps() {
			let stepsTag = dom.createTag(m_props.tags.stepsContainer, {
				class: m_css.stepsContainer,
			});
			dom.prepend(m_sliderWrapperTag, stepsTag);
			const trackLength = m_horizontal ? m_trackTag.clientWidth : m_trackTag.clientHeight;
			const steps = Math.floor((m_props.max - m_props.min) / m_props.step);
			m_stepLength = trackLength / steps;

			for (let i = 0; i <= steps; i++) {
				let stepTag = null;
				const value = i * m_props.step + m_props.min;

				if ((i * m_props.step) % m_props.largeStep === 0) {
					stepTag = installLargeStep(stepsTag, value);
				} else {
					stepTag = installSmallStep(stepsTag);
				}

				stepTag.id = value;
				m_stepTags.push(stepTag);
			}
		}

		function installLargeStep(stepsTag, value) {
			let stepTag = dom.createTag(m_props.tags.stepLarge, {
				class: m_css.stepLarge,
			});
			let textTag = dom.createTag("span", {
				class: m_css.stepLargeSpan,
				text: value.toString(),
			});
			dom.append(stepTag, textTag);

			if (m_horizontal) {
				dom.append(stepsTag, stepTag);
				stepTag.style.width = m_stepLength + "px";
			} else {
				dom.prepend(stepsTag, stepTag);
				stepTag.style.height = m_stepLength + "px";
			}

			return stepTag;
		}

		function installSmallStep(stepsTag) {
			let stepTag = dom.createTag(m_props.tags.step, { class: m_css.step });

			if (m_horizontal) {
				dom.append(stepsTag, stepTag);
				stepTag.style.width = m_stepLength + "px";
			} else {
				dom.prepend(stepsTag, stepTag);
				stepTag.style.height = m_stepLength + "px";
			}

			return stepTag;
		}

		function installHandle() {
			const config = {
				parentTag: m_sliderWrapperTag,
				containerTag: m_sliderWrapperTag,
				css: {
					draggable: m_css.handle,
				},
				axis: m_horizontal ? "x" : "y",
				grid: m_horizontal ? [m_stepLength, 0] : [0, m_stepLength],
				attr: {
					title: m_props.handleTitle,
				},
				fnDragStart: (context) => {
					if (m_props.fnSlideStart) {
						m_props.fnSlideStart({ Slider: self, ev: context.ev });
					}
				},
				fnDragEnd: updateValue,
				fnDrag: updateSelection,
			};

			m_handleTag = ui.draggable(config);
		}

		function updateValue(context) {
			m_value = Number(m_stepTags[getSelectedIndex()].id);
			setHandlePosition();

			if (m_props.fnSelect) {
				m_props.fnSelect({ Slider: self, ev: context.ev });
			}
		}

		function updateSelection(context) {
			setSelectionPosition();

			if (m_props.fnSlide) {
				m_props.fnSlide({ Slider: self, ev: context.ev });
			}
		}

		function getSelectedIndex() {
			let handleOffset = m_horizontal
				? m_handleTag.getParentTag().offsetLeft
				: m_sliderWrapperTag.clientHeight - m_handleTag.getParentTag().offsetTop;

			for (let i = 0; i < m_stepTags.length; i++) {
				let stepOffset = m_horizontal ? m_stepTags[i].offsetLeft : m_sliderWrapperTag.clientHeight - m_stepTags[i].offsetTop;
				if (handleOffset <= stepOffset) {
					if (stepOffset - handleOffset > m_stepLength / 2 && i > 0) {
						return i - 1;
					}
					return i;
				}
			}

			return 0;
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
			m_enable ? dom.removeClass(m_sliderParentTag, m_props.css.disabled) : dom.addClass(m_sliderParentTag, m_props.css.disabled);
			m_handleTag.enable({ enable: enable });
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_value;
			} else {
				setValue(context.value);
			}
		}

		function setValue(value) {
			m_value = getValidValue(value);
			setHandlePosition();
		}

		function setHandlePosition() {
			let stepTag = m_stepTags.find((tag) => tag.id === m_value.toString());
			let handleTag = m_handleTag.getParentTag();

			if (m_horizontal) {
				const length =
					stepTag.getBoundingClientRect().left - m_sliderWrapperTag.getBoundingClientRect().left - handleTag.clientWidth / 2;
				handleTag.style.left = length + "px";
			} else {
				const length =
					stepTag.getBoundingClientRect().top - m_sliderWrapperTag.getBoundingClientRect().top - handleTag.clientHeight / 2;
				handleTag.style.top = length + "px";
			}

			setSelectionPosition();
		}

		function setSelectionPosition() {
			let handleTag = m_handleTag.getParentTag();

			if (m_horizontal) {
				m_selectionTag.style.width = handleTag.offsetLeft + "px";
			} else {
				const length = m_sliderWrapperTag.getBoundingClientRect().bottom - handleTag.getBoundingClientRect().bottom;
				m_selectionTag.style.height = length + "px";
			}
		}

		function getValidValue(value) {
			if (value < m_props.min) return m_props.min;
			if (value > m_props.max) return m_props.max;
			if ((value - m_props.min) % m_props.step !== 0) {
				let steps = Math.floor((value - m_props.min) / m_props.step);
				return m_props.min + steps * m_props.step;
			}
			return value;
		}

		function destroySlider() {
			dom.remove(m_sliderParentTag);
		}

		function loadDOM() {
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			installTrack();
			installHandle();
			setEnable(m_enable);
			setValue(m_value);
			if (m_props.fnComplete) m_props.fnComplete({ Slider: self });
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
				min: -10,
				max: 10,
				step: 1,
				largeStep: 5,
				orientation: "horizontal",
				handleTitle: "drag",
				enable: true,
				showButtons: true,
				decreaseButton: {
					attr: {
						title: "Decrease",
					},
				},
				increaseButton: {
					attr: {
						title: "Increase",
					},
				},
				fnSelect: (context) => {
					// Nothing executes by default
				},
				fnSlideStart: (context) => {
					// Nothing executes by default
				},
				fnSlide: (context) => {
					// Nothing executes by default
				},
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "slider" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "slider" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.slider = (props) => new ui.class.Slider(props);

customElements.define("mambo-slider", ui.class.Slider);
