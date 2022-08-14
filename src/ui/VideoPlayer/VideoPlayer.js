ui.class.VideoPlayer = class VideoPlayer extends HTMLElement {
	constructor(props) {
		super();
		const self = this;
		const m_utils = ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);
		const m_tags = ui.tagNames(ui.defaultTagNames);

		// HTML tag variables
		let m_parentTag;
		let m_wrapperTag;

		let m_props;
		let m_player;

		// Configure public methods
		this.getPlayer = () => m_player;
		this.getPlayerTag = () => m_player.getTag();
		this.install = installSelf;
		this.setup = setup;

		if (props) setup(props);

		function setup(props) {
			configure(props);
			installDOM();
			finishSetup();
		}

		function installDOM() {
			//create the wrapper div container for the input
			m_wrapperTag = dom.createTag("video-player", {
				class: m_props.css.wrapper,
			});

			self.appendChild(m_wrapperTag);
			m_props.player.parentTag = m_wrapperTag;
			m_player = ui.player(m_props.player);
		}

		function finishSetup() {
			// Install component into parent
			if (m_props.install) installSelf(m_parentTag, m_props.installPrepend);
			// Execute complete callback function
			if (m_props.fnComplete) m_props.fnComplete({ VideoPlayer: self });
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
				player: {
					attr: {
						controls: true,
					},
				},
			};
			// If options provided, override default config
			if (customProps) m_props = m_utils.extend(true, m_props, customProps);
			// Resolve parent tag
			if (m_props.parentTag) m_parentTag = dom.getTag(m_props.parentTag);
			// Extend tag names
			const tags = m_tags.getTags({ name: m_props.tag, component: "videoPlayer" });
			m_props.tags = m_utils.extend(true, tags, m_props.tags);
			// Extend css class names
			const css = m_theme.getTheme({ name: m_props.theme, component: "videoPlayer" });
			m_props.css = m_utils.extend(true, css, m_props.css);
		}
	}
};

ui.videoPlayer = (props) => new ui.class.VideoPlayer(props);

customElements.define("mambo-video-player", ui.class.VideoPlayer);
