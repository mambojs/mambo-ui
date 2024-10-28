ui.class.Slider = class Slider extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_wrapperTag;
		let m_trackTag;
		let m_selectionTag;
		let m_draggable;
		let m_stepTags = [];

		let m_props;
		let m_horizontal = true;
		let m_css;
		let m_enable = true;
		let m_value = 0;
		let m_stepLength;

		// Configure public methods
		this.destroy = destroySlider;
		this.enable = setEnable;
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
			await continueSetupDOM();
			setupComplete();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				self.classList.add(m_props.css.self, m_props.orientation);

				if (m_props.showButtons) {
					if (m_horizontal) {
						installDecreaseButton().then(appendWrapper).then(installIncreaseButton).then(resolve);
					} else {
						installIncreaseButton().then(appendWrapper).then(installDecreaseButton).then(resolve);
					}
				} else {
					appendWrapper().then(resolve);
				}

				function appendWrapper() {
					return new Promise((resolve) => {
						m_wrapperTag = ui.d.createTag({ ...m_props.tags.wrapper, class: m_css.wrapper });
						self.appendChild(m_wrapperTag);
						resolve();
					});
				}
			});
		}

		function continueSetupDOM() {
			return new Promise((resolve) => {
				installTrack()
					.then(installSteps)
					.then(installHandle)
					.then(() => {
						setValue(m_value);
						resolve();
					});
			});
		}

		function installDecreaseButton() {
			return installButton(m_props.decreaseButton, m_css.decreaseButton, handleDecrease);
		}

		function installIncreaseButton() {
			return installButton(m_props.increaseButton, m_css.increaseButton, handleIncrease);
		}

		function installButton(config, css, fnClick) {
			return new Promise((resolve) => {
				const buttonConfig = ui.utils.extend(true, {}, config);
				buttonConfig.css = ui.utils.extend(true, css, buttonConfig.css);
				buttonConfig.parentTag = self;

				buttonConfig.fnClick = (context) => {
					fnClick();

					if (m_props.fnSelect) {
						m_props.fnSelect({ Slider: self, ev: context.ev });
					}

					if (config?.fnClick) {
						config.fnClick(context);
					}
				};

				ui.button(buttonConfig);
				resolve();
			});
		}

		function installTrack() {
			return new Promise((resolve) => {
				m_trackTag = ui.d.createTag({ ...m_props.tags.track, class: m_css.track });
				m_selectionTag = ui.d.createTag({ ...m_props.tags.selection, class: m_css.selection });
				m_wrapperTag.appendChild(m_trackTag);
				m_wrapperTag.appendChild(m_selectionTag);
				resolve();
			});
		}

		function installSteps() {
			return new Promise((resolve) => {
				let stepsTag = ui.d.createTag({ ...m_props.tags.stepsContainer, class: m_css.stepsContainer });
				ui.d.prepend(m_wrapperTag, stepsTag);
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

				resolve();
			});
		}

		function handleDecrease() {
			setValue(m_value - m_props.step);
		}

		function handleIncrease() {
			setValue(m_value + m_props.step);
		}

		function installLargeStep(stepsTag, value) {
			let stepTag = ui.d.createTag({ ...m_props.tags.stepLarge, class: m_css.stepLarge });

			let textTag = ui.d.createTag({
				name: "span",
				class: m_css.stepLargeSpan,
				text: value.toString(),
			});

			stepTag.appendChild(textTag);

			if (m_horizontal) {
				stepsTag.appendChild(stepTag);
				stepTag.style.width = m_stepLength + "px";
			} else {
				ui.d.prepend(stepsTag, stepTag);
				stepTag.style.height = m_stepLength + "px";
			}

			return stepTag;
		}

		function installSmallStep(stepsTag) {
			let stepTag = ui.d.createTag({ ...m_props.tags.step, class: m_css.step });

			if (m_horizontal) {
				stepsTag.appendChild(stepTag);
				stepTag.style.width = m_stepLength + "px";
			} else {
				ui.d.prepend(stepsTag, stepTag);
				stepTag.style.height = m_stepLength + "px";
			}

			return stepTag;
		}

		function installHandle() {
			return new Promise((resolve) => {
				const config = {
					parentTag: m_wrapperTag,
					containerTag: m_wrapperTag,
					css: {
						draggable: m_css.handle,
					},
					tags: m_props.tags?.draggable?.tags,
					axis: m_horizontal ? "x" : "y",
					grid: m_horizontal ? [m_stepLength, 0] : [0, m_stepLength],
					fnDragStart: (context) => {
						if (m_props.fnSlideStart) {
							m_props.fnSlideStart({ Slider: self, ev: context.ev });
						}
					},
					fnDragEnd: updateValue,
					fnDrag: updateSelection,
					fnComplete: resolve,
				};

				m_draggable = ui.draggable(config);
				setEnable(m_enable);
			});
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
				? m_draggable.getParentTag().offsetLeft
				: m_wrapperTag.clientHeight - m_draggable.getParentTag().offsetTop;

			for (let i = 0; i < m_stepTags.length; i++) {
				let stepOffset = m_horizontal ? m_stepTags[i].offsetLeft : m_wrapperTag.clientHeight - m_stepTags[i].offsetTop;
				if (handleOffset <= stepOffset) {
					if (stepOffset - handleOffset > m_stepLength / 2 && i > 0) {
						return i - 1;
					}
					return i;
				}
			}

			return 0;
		}

		function setEnable(enable) {
			m_enable = enable;
			self.classList.toggle(m_props.css.disabled, !m_enable);
			m_draggable.enable(m_enable);
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
			let handleTag = m_draggable.getParentTag();

			if (m_horizontal) {
				const length = stepTag.getBoundingClientRect().left - m_wrapperTag.getBoundingClientRect().left - handleTag.clientWidth / 2;
				handleTag.style.left = length + "px";
			} else {
				const length = stepTag.getBoundingClientRect().top - m_wrapperTag.getBoundingClientRect().top - handleTag.clientHeight / 2;
				handleTag.style.top = length + "px";
			}

			setSelectionPosition();
		}

		function setSelectionPosition() {
			const handleTag = m_draggable.getParentTag();

			if (m_horizontal) {
				m_selectionTag.style.width = handleTag.offsetLeft + "px";
			} else {
				const length = m_wrapperTag.getBoundingClientRect().bottom - handleTag.getBoundingClientRect().bottom;
				m_selectionTag.style.height = length + "px";
			}
		}

		function getValidValue(value) {
			if (value < m_props.min) {
				return m_props.min;
			}

			if (value > m_props.max) {
				return m_props.max;
			}

			if ((value - m_props.min) % m_props.step !== 0) {
				let steps = Math.floor((value - m_props.min) / m_props.step);
				return m_props.min + steps * m_props.step;
			}

			return value;
		}

		function destroySlider() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Slider: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					value: 0,
					min: -10,
					max: 10,
					step: 1,
					largeStep: 5,
					orientation: "horizontal",
					enable: true,
					showButtons: true,
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "slider" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "slider" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				m_enable = m_props.enable;
				m_value = m_props.value;
				m_horizontal = m_props.orientation !== "vertical";
				m_css = m_horizontal ? m_props.css.horizontal : m_props.css.vertical;
				resolve();
			});
		}
	}
};

ui.slider = (props) => new ui.class.Slider(props);
customElements.define("mambo-slider", ui.class.Slider);
