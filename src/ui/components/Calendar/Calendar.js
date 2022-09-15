ui.class.Calendar = class Calendar extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		// HTML tag variables
		let m_parentTag;
		let m_headerButtonGroup;
		let m_headerButtonsList = [];
		let m_bodyTag;
		let m_bodyHeaderTag;
		let m_bodyContentTag;
		let m_datesHeaderGrid;
		let m_datesButtonGroup;

		let m_props;
		let m_idFormat = "YYYY/M/D";
		let m_value;
		let m_viewDate;
		let m_depths = { month: 0, year: 1, decade: 2, century: 3 };
		let m_depth = 0;
		let m_minDepth = 0;
		let m_minDate;
		let m_maxDate;

		// Configure public methods
		this.destroy = destroyCalendar;
		this.getParentTag = () => self;
		this.navigateToFuture = navigateToFuture;
		this.navigateToPast = navigateToPast;
		this.navigateUp = navigateUp;
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
				setupHeader().then(setupBody).then(setupFooter).then(resolve);
			});
		}

		function setupHeader() {
			return new Promise((resolve) => {
				let buttonGroup = ui.utils.extend(true, {}, m_props.headerButtonGroup);
				buttonGroup.css = ui.utils.extend(true, m_props.css.headerButtonGroup, buttonGroup.css);
				buttonGroup.parentTag = self;
				buttonGroup.fnComplete = resolve;

				buttonGroup.buttons.forEach((button, index) => {
					button.fnComplete = (context) => {
						m_headerButtonsList[index] = context.Button;

						if (m_props.headerButtonGroup.buttons[index].fnComplete) {
							m_props.headerButtonGroup.buttons[index].fnComplete(context);
						}
					};
				});

				m_headerButtonGroup = ui.buttonGroup(buttonGroup);
			});
		}

		function setupBody() {
			return new Promise((resolve) => {
				m_bodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
				m_bodyHeaderTag = ui.d.createTag({ ...m_props.tags.bodyHeader, class: m_props.css.bodyHeader });
				m_bodyContentTag = ui.d.createTag({ ...m_props.tags.bodyContent, class: m_props.css.bodyContent });
				m_bodyTag.appendChild(m_bodyHeaderTag);
				m_bodyTag.appendChild(m_bodyContentTag);
				self.appendChild(m_bodyTag);
				setupBodyContent().then(resolve);
			});
		}

		function setupFooter() {
			return new Promise((resolve) => {
				if (m_props.footer) {
					const button = ui.utils.extend(true, {}, m_props.footerButton);
					button.css = ui.utils.extend(true, m_props.css.footerButton, button.css);
					button.parentTag = self;
					button.fnComplete = resolve;

					let today = ui.date.getToday();
					button.id = ui.date.format(today, m_idFormat);
					button.text = ui.date.format(today, m_props.footer);

					if (ui.date.isBefore(today, m_minDate) || ui.date.isAfter(today, m_maxDate)) {
						button.enable = false;
					}

					button.fnClick = (context) => {
						m_depth = m_minDepth;
						selectValue(context.Button, context.ev);
						if (m_props.footerButton.fnClick) {
							m_props.footerButton.fnClick(context);
						}
					};

					ui.button(button);
				}
			});
		}

		function navigate(number) {
			switch (m_depth) {
				case 0: //month
					ui.date.add(m_viewDate, number, "months");
					break;
				case 1: //year
					ui.date.add(m_viewDate, number, "years");
					break;
				case 2: //decade
					ui.date.add(m_viewDate, number * 10, "years");
					break;
				case 3: //century
					ui.date.add(m_viewDate, number * 100, "years");
					break;
			}
			setupBodyContent();
		}

		function setupBodyContent() {
			return new Promise((resolve) => {
				m_bodyHeaderTag.innerHTML = null;
				m_bodyContentTag.innerHTML = null;

				switch (m_depth) {
					case 0: //month
						installDatesHeader();
						installDates().then(continueSetup);
						break;
					case 1: //year
						installMonths().then(continueSetup);
						break;
					case 2: //decade
						installYears().then(continueSetup);
						break;
					case 3: //century
						installDecades().then(continueSetup);
						break;
				}

				function continueSetup() {
					setHeaderButtonsText();
					setHeaderButtonsEnabled();
					resolve();
				}
			});
		}

		function setHeaderButtonsEnabled() {
			m_headerButtonsList.forEach((button, index) => {
				if (m_props.headerButtonGroup.buttons[index].fnEnabled) {
					button.enable({
						enable: m_props.headerButtonGroup.buttons[index].fnEnabled(),
					});
				}
			});
		}

		function canNavigateUp() {
			return m_depth < 3;
		}

		function canNavigatePast() {
			return !ui.date.isSameOrBefore(m_viewDate, m_minDate);
		}

		function canNavigateFuture() {
			let lastViewDate = ui.date.cloneDate(m_viewDate);
			switch (m_depth) {
				case 0: //month
					ui.date.endOf(lastViewDate, "month");
					break;
				case 1: //year
					ui.date.endOf(lastViewDate, "year");
					break;
				case 2: //decade
					ui.date.endOf(lastViewDate, "decade");
					break;
				case 3: //century
					ui.date.endOf(lastViewDate, "century");
					break;
			}
			return !ui.date.isSameOrAfter(lastViewDate, m_maxDate);
		}

		function setHeaderButtonsText() {
			const i = m_props.headerButtonGroup.buttons.findIndex((button) => button.fnDynamicHeaderText);

			if (i) {
				m_props.headerButtonGroup.buttons[i].fnDynamicHeaderText(m_headerButtonsList[i]);
			}
		}

		function getDepthButtonText(button) {
			let textValue;

			switch (m_depth) {
				case 0: //month
					textValue = ui.date.format(m_viewDate, "MMMM YYYY");
					break;
				case 1: //year
					textValue = ui.date.format(m_viewDate, "YYYY");
					break;
				case 2: //decade
					textValue = `${m_viewDate.getFullYear()}-${m_viewDate.getFullYear() + 9}`;
					break;
				default:
				case 3: //century
					textValue = `${m_viewDate.getFullYear()}-${m_viewDate.getFullYear() + 99}`;
			}

			button.text(textValue);
		}

		function installDatesHeader() {
			let grid = ui.utils.extend(true, {}, m_props.datesHeader);
			grid.css = ui.utils.extend(true, m_props.css.datesHeader, grid.css);
			grid.data = [];

			for (let i = 0; i < 7; i++) {
				let dayName = ui.date.getDayName(i);
				grid.data.push({
					Name: dayName,
					ShortName: dayName.substring(0, 1).toUpperCase(),
				});
			}
			grid.parentTag = m_bodyHeaderTag;
			m_datesHeaderGrid = ui.grid(grid);
		}

		function installDates() {
			return new Promise((resolve) => {
				let buttonGroup = ui.utils.extend(true, {}, m_props.datesButtonGroup);
				buttonGroup.css = ui.utils.extend(true, m_props.css.datesButtonGroup, buttonGroup.css);
				buttonGroup.parentTag = m_bodyContentTag;
				buttonGroup.fnComplete = (context) => {
					if (m_props.datesButtonGroup?.fnComplete) {
						m_props.datesButtonGroup.fnComplete(context);
					}

					m_datesButtonGroup.select({
						id: ui.date.format(m_value, m_idFormat),
						notTrigger: true,
					});

					resolve();
				};

				generateDates(buttonGroup);
				m_datesButtonGroup = ui.buttonGroup(buttonGroup);
			});
		}

		function generateDates(buttonGroup) {
			buttonGroup.buttons = [];
			let today = ui.date.getToday();
			let value = ui.date.cloneDate(m_viewDate);
			ui.date.startOf(value, "week");

			for (let i = 0; i < 42; i++) {
				let button = {
					id: ui.date.format(value, m_idFormat),
					text: value.getDate(),
					attr: { title: ui.date.format(value, "dddd, MMMM DD, YYYY") },
					fnClick: (context) => {
						buttonClick(context, m_props.datesButtonGroup);
					},
				};
				if (!isValidButton(value)) {
					button.enable = false;
				} else if (ui.date.isSame(value, today)) {
					button.css = { button: m_props.css.currentDate };
				} else if (value.getMonth() !== m_viewDate.getMonth()) {
					button.css = { button: m_props.css.otherMonth };
				}
				buttonGroup.buttons.push(button);
				ui.date.add(value, 1, "days");
			}
		}

		function installMonths() {
			return new Promise((resolve) => {
				let buttonGroup = ui.utils.extend(true, {}, m_props.monthsButtonGroup);
				buttonGroup.css = ui.utils.extend(true, m_props.css.monthsButtonGroup, buttonGroup.css);
				buttonGroup.parentTag = m_bodyContentTag;
				buttonGroup.fnComplete = (context) => {
					if (m_props.monthsButtonGroup?.fnComplete) {
						m_props.monthsButtonGroup.fnComplete(context);
					}

					let selectedMonth = ui.date.cloneDate(m_value);
					ui.date.startOf(selectedMonth, "month");
					m_datesButtonGroup.select({
						id: ui.date.format(selectedMonth, m_idFormat),
						notTrigger: true,
					});

					resolve();
				};

				generateMonths(buttonGroup);
				m_datesButtonGroup = ui.buttonGroup(buttonGroup);
			});
		}

		function generateMonths(buttonGroup) {
			buttonGroup.buttons = [];
			let value = ui.date.cloneDate(m_viewDate);

			for (let i = 0; i < 12; i++) {
				let button = {
					id: ui.date.format(value, m_idFormat),
					text: ui.date.format(value, "MMM"),
					attr: { title: ui.date.format(value, "MMMM") },
					fnClick: (context) => {
						buttonClick(context, m_props.monthsButtonGroup);
					},
				};
				if (!isValidButton(value)) {
					button.enable = false;
				}
				buttonGroup.buttons.push(button);
				ui.date.add(value, 1, "months");
			}
		}

		function installYears() {
			return new Promise((resolve) => {
				let buttonGroup = ui.utils.extend(true, {}, m_props.yearsButtonGroup);
				buttonGroup.css = ui.utils.extend(true, m_props.css.yearsButtonGroup, buttonGroup.css);
				buttonGroup.parentTag = m_bodyContentTag;
				buttonGroup.fnComplete = (context) => {
					if (m_props.yearsButtonGroup?.fnComplete) {
						m_props.yearsButtonGroup.fnComplete(context);
					}

					let selectedYear = ui.date.cloneDate(m_value);
					ui.date.startOf(selectedYear, "year");
					m_datesButtonGroup.select({
						id: ui.date.format(selectedYear, m_idFormat),
						notTrigger: true,
					});

					resolve();
				};

				generateYears(buttonGroup);
				m_datesButtonGroup = ui.buttonGroup(buttonGroup);
			});
		}

		function generateYears(buttonGroup) {
			buttonGroup.buttons = [];
			let value = ui.date.cloneDate(m_viewDate);
			ui.date.add(value, -1, "years");

			for (let i = 0; i < 12; i++) {
				let button = {
					id: ui.date.format(value, m_idFormat),
					text: ui.date.format(value, "YYYY"),
					fnClick: (context) => {
						buttonClick(context, m_props.yearsButtonGroup);
					},
				};
				if (!isValidButton(value)) {
					button.enable = false;
				} else if (i === 0 || i === 11) {
					button.css = { button: m_props.css.otherDecade };
				}
				buttonGroup.buttons.push(button);
				ui.date.add(value, 1, "years");
			}
		}

		function installDecades() {
			return new Promise((resolve) => {
				let buttonGroup = ui.utils.extend(true, {}, m_props.decadesButtonGroup);
				buttonGroup.css = ui.utils.extend(true, m_props.css.decadesButtonGroup, buttonGroup.css);
				buttonGroup.parentTag = m_bodyContentTag;
				buttonGroup.fnComplete = (context) => {
					if (m_props.decadesButtonGroup?.fnComplete) {
						m_props.decadesButtonGroup.fnComplete(context);
					}

					let selectedDecade = ui.date.cloneDate(m_value);
					ui.date.startOf(selectedDecade, "decade");
					m_datesButtonGroup.select({
						id: ui.date.format(selectedDecade, m_idFormat),
						notTrigger: true,
					});

					resolve();
				};

				generateDecades(buttonGroup);
				m_datesButtonGroup = ui.buttonGroup(buttonGroup);
			});
		}

		function generateDecades(buttonGroup) {
			buttonGroup.buttons = [];
			let value = ui.date.cloneDate(m_viewDate);
			ui.date.add(value, -10, "years");

			for (let i = 0; i < 12; i++) {
				let button = {
					id: ui.date.format(value, m_idFormat),
					text: `${value.getFullYear()}-${value.getFullYear() + 9}`,
					fnClick: (context) => {
						buttonClick(context, m_props.decadesButtonGroup);
					},
				};
				if (!isValidButton(value)) {
					button.enable = false;
				} else if (i === 0 || i === 11) {
					button.css = { button: m_props.css.otherCentury };
				}
				buttonGroup.buttons.push(button);
				ui.date.add(value, 10, "years");
			}
		}

		function isValidButton(value) {
			return !ui.date.isBefore(value, m_minDate) && !ui.date.isAfter(value, m_maxDate);
		}

		function buttonClick(context, buttonGroup) {
			selectValue(context.Button, context.ev);
			if (buttonGroup?.fnClick) {
				buttonGroup.fnClick(context);
			}
		}

		function selectValue(button, ev) {
			let value = ui.date.createDate(button.getId(), m_idFormat);
			if (m_depth <= m_minDepth) {
				setValue(value);
				if (m_props.fnSelect) {
					m_props.fnSelect({ Calendar: self, ev: ev });
				}
			} else {
				--m_depth;
				setViewDate(value);
				setupBodyContent();
			}
			setHeaderButtonsEnabled();
		}

		function getDefaultValue() {
			let optionValue = m_props.value ? ui.date.getDate(m_props.value, m_props.format) : null;
			optionValue = optionValue ? optionValue : ui.date.getToday();
			return getInRangeDate(optionValue);
		}

		function getInRangeDate(value) {
			if (!ui.date.isDate(value)) {
				return null;
			}

			if (ui.date.isBefore(value, m_minDate)) {
				return ui.date.cloneDate(m_minDate);
			} else if (ui.date.isAfter(value, m_maxDate)) {
				return ui.date.cloneDate(m_maxDate);
			}
			return ui.date.cloneDate(value);
		}

		function setValue(value) {
			m_value = getInRangeDate(value);
			m_depth = m_minDepth;
			setViewDate(m_value);
			setupBodyContent();
		}

		function setViewDate(value) {
			m_viewDate = value ? ui.date.cloneDate(value) : ui.date.getToday();
			switch (m_depth) {
				case 0: //month
					ui.date.startOf(m_viewDate, "month");
					break;
				case 1: //year
					ui.date.startOf(m_viewDate, "year");
					break;
				case 2: //decade
					ui.date.startOf(m_viewDate, "decade");
					break;
				case 3: //century
					ui.date.startOf(m_viewDate, "century");
					break;
			}
		}

		function value(context = {}) {
			if (typeof context.value === "undefined") {
				return m_value;
			} else {
				setValue(ui.date.getDate(context.value, m_props.format));
			}
		}

		function navigateToPast() {
			navigate(-1);
		}

		function navigateToFuture() {
			navigate(1);
		}
		function navigateUp() {
			if (canNavigateUp()) {
				++m_depth;
				setViewDate(m_value);
				setupBodyContent();
			}
		}

		function destroyCalendar() {
			ui.d.remove(self);
		}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Calendar: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					theme: "default",
					tag: "default",
					headerButtonGroup: {
						buttons: [
							{
								css: {
									button: "m-prev-button",
									disabled: "m-calendar-header-button-disabled",
								},
								fnClick: navigateToPast,
								fnEnabled: canNavigatePast,
							},
							{
								css: {
									button: "m-fast-button",
									disabled: "m-calendar-header-button-disabled",
								},
								fnClick: navigateUp,
								fnEnabled: canNavigateUp,
								fnDynamicHeaderText: getDepthButtonText,
							},
							{
								css: {
									button: "m-next-button",
									disabled: "m-calendar-header-button-disabled",
								},
								fnClick: navigateToFuture,
								fnEnabled: canNavigateFuture,
							},
						],
					},
					datesHeader: {
						layout: "tile",
						tileHTML: "<span title='{Name}'>{ShortName}</span>",
					},
					format: "M/D/YYYY",
					footer: "dddd, MMMM D, YYYY",
					start: "month",
					depth: "month",
					min: new Date(1900, 0, 1),
					max: new Date(2099, 11, 31),
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				m_depth = typeof m_depths[m_props.start] !== "undefined" ? m_depths[m_props.start] : 0;
				m_minDepth = typeof m_depths[m_props.depth] !== "undefined" ? m_depths[m_props.depth] : 0;
				m_minDepth = m_minDepth > m_depth ? m_depth : m_minDepth;
				m_minDate = ui.date.getDate(m_props.min, m_props.format);
				m_maxDate = ui.date.getDate(m_props.max, m_props.format);
				m_value = getDefaultValue();
				setViewDate(m_value);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "calendar" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "calendar" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.calendar = (props) => new ui.class.Calendar(props);
customElements.define("mambo-calendar", ui.class.Calendar);
