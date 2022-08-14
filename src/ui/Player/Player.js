ui.class.Player = class Player extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);
		const m_tags = ui.tagNames(ui.defaultTagNames);

		const m_buttonGroups = [];

		let m_props;
		let m_timeInfo;
		let m_progressBar;

		// dom. Elements
		let m_parentTag;
		let m_playerTag;

		// Declare public methods
		this.getTag = () => m_playerTag;
		this.install = installSelf;
		this.setup = setup;

		if (props) setup(props);

		/*
		 * Custom controls:
		 * group 1
		 *       button group: play, next, volume
		 *       cur/total time
		 * group 2
		 *       button group: settings, theater mode, full screen
		 * */

		function setup(props) {
			configure(props);
			installDOM();
			finishSetup();
			//installControls();
			//installProgressBar();
		}

		function installDOM() {
			const tagConfig = {
				class: m_props.css.player,
				prop: m_props.prop,
				attr: m_props.attr,
			};

			m_playerTag = dom.createTag(m_props.media, tagConfig);
			self.appendChild(m_playerTag);
		}

		function setSource(source) {
			dom.setAttr(m_playerTag, { src: source });
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

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ Player: self });
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
				media: "video",
				attr: {
					src: "",
				},
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
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "player" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "player" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.player = (props) => new ui.class.Player(props);

customElements.define("mambo-player", ui.class.Player);
