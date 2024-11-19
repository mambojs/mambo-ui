ui.class.Player = class Player extends HTMLElement {
	constructor(props) {
		super();
		const self = this;

		const m_buttonGroups = [];

		let m_props;
		let m_timeInfo;
		let m_progressBar;
		let m_parentTag;
		let m_playerTag;

		// Declare public methods
		this.getTag = () => m_playerTag;
		this.setup = setup;

		if (props) {
			setup(props);
		}

		/*
		 * Custom controls:
		 * group 1
		 *       button group: play, next, volume
		 *       cur/total time
		 * group 2
		 *       button group: settings, theater mode, full screen
		 * */

		async function setup(props) {
			await configure(props);
			if (!self.isConnected) {
				await ui.utils.installUIComponent({ self, m_parentTag, m_props });
			}
			await setupDOM();
			setupComplete();
			//installControls();
			//installProgressBar();
		}

		function setupDOM() {
			return new Promise((resolve) => {
				m_playerTag = ui.d.createTag({ ...m_props.tags.player, class: m_props.css.player });
				self.classList.add(m_props.css.self);
				self.appendChild(m_playerTag);
				resolve();
			});
		}

		function setSource(source) {
			ui.d.setAttr(m_playerTag, { src: source });
		}

		function installControls() {
			if (m_props.controls && Array.isArray(m_props.controls)) {
				const controls = m_props.controls;
				controls.forEach((object) => {
					if (object.buttons) {
						installButtonGroup(object.buttons);
					} else if (object.time) {
						installTime();
					}
				});
			}
		}

		function installProgressBar() {}

		function installButtonGroup(buttons) {
			let btnGroupProps = {
				buttons: [
					{
						id: 1,
						text: "Button One",
						fnClick: (context) => {
							// You can declare individual event handlers for each button
						},
					},
					{
						id: 2,
						text: "Button Two",
					},
					{
						id: 3,
						text: "Button Three",
					},
				],
				fnClick: (context) => {
					// You can declare a single event handler for all buttons
					alert(`'Button clicked: ' ${context.Button.getId()}`);
				},
			};

			m_buttonGroups.push(ui.buttonGroup(m_props.parentTag, btnGroupProps));
		}

		function installTime() {}

		function handlePlayPauseClick(context) {
			if (m_playerTag.paused) {
				changePlayBtnState(true);
				m_playerTag.play();
			} else {
				changePlayBtnState(false);
				m_playerTag.pause();
			}
		}

		function changePlayBtnState(play) {
			m_buttonGroups.forEach((btnGroup) => {
				const playBtn = btnGroup.get();
			});
		}

		function handleNextClick() {}

		function handlePrevClick() {}

		function handleSettingsClick() {}

		function handleTheaterClick() {}

		function handleFullScreenClick() {}

		function setupComplete() {
			if (m_props.fnComplete) {
				m_props.fnComplete({ Player: self });
			}
		}

		function configure(customProps = {}) {
			return new Promise((resolve) => {
				m_props = {
					tag: "default",
					theme: "default",
					progressBar: true,
					controls: [
						{
							buttons: ["play", "previous", "next", "volume"],
						},
						{
							time: true,
						},
						{
							buttons: ["settings", "theater", "fullScreen"],
						},
					],
				};
				m_props = ui.utils.extend(true, m_props, customProps);
				m_parentTag = ui.d.getTag(m_props.parentTag);
				const tags = ui.tags.getTags({ name: m_props.tag, component: "player" });
				m_props.tags = ui.utils.extend(true, tags, m_props.tags);
				const css = ui.theme.getTheme({ name: m_props.theme, component: "player" });
				m_props.css = ui.utils.extend(true, css, m_props.css);
				resolve();
			});
		}
	}
};

ui.player = (props) => new ui.class.Player(props);
customElements.define(ui.defaultTags.player.self.name, ui.class.Player);
