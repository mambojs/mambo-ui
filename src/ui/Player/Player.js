ui.class.Player = class Player extends HTMLElement {
	constructor(parentTag, options) {
		super();
		const m_utils = new ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);
		const m_buttonGroups = [];

		let m_config;
		let m_timeInfo;
		let m_progressBar;

		// dom. Elements
		let m_parentTag;
		let m_playerTag;

		// Declare public methods
		this.getTag = () => m_playerTag;

		/*
		 * Custom controls:
		 * group 1
		 *       button group: play, next, volume
		 *       cur/total time
		 * group 2
		 *       button group: settings, theater mode, full screen
		 * */

		configure();
		setup();

		function setup() {
			m_parentTag = dom.getTag(parentTag);

			if (!m_parentTag) {
				console.error(`HTML5 Player: dom. parent tag ${parentTag} was not found.`);
				return;
			}

			installPlayer();
			//installControls();
			//installProgressBar();
		}

		function installPlayer() {
			const tagConfig = {
				class: m_config.css.player,
				prop: m_config.prop,
				attr: m_config.attr,
			};
			m_playerTag = dom.createTag(m_config.media, tagConfig);
			dom.append(m_parentTag, m_playerTag);
		}

		function setSource(source) {
			dom.setAttr(m_playerTag, { src: source });
		}

		function installControls() {
			if (m_config.controls && Array.isArray(m_config.controls)) {
				const controls = m_config.controls;
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
					alert(`'Button clicked: ' ${context.button.getId()}`);
				},
			};

			m_buttonGroups.push();
			new ui.buttonGroup(parentTag, btnGroupProps);
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

		function configure() {
			m_config = {
				theme: "default",
				media: "video",
				attr: {
					src: "",
				},
				prop: {},
				progressBar: true,
				tag: {
					parent: "html5player",
					controls: "controls",
					time: "time-stats",
				},
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

			// If options provided, override default config
			if (options) {
				m_config = m_utils.extend(true, m_config, options);
			}

			m_config.css = m_utils.extend(
				true,
				m_theme.getTheme({
					name: m_config.theme,
					control: "html5player",
				}),
				m_config.css
			);
		}
	}
};

ui.player = (parentTag, options) => new ui.class.Player(parentTag, options);

customElements.define("mambo-player", ui.class.Player);
