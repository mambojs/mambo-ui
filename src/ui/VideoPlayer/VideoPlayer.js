ui.class.VideoPlayer = class VideoPlayer extends HTMLElement {
	constructor(parentTag, options) {
		super();
		const self = this;
		const m_utils = new ui.utils();
		const m_theme = ui.theme(ui.defaultTheme);

		// HTML tag variables
		let m_parentTag;
		let m_wrapperTag;

		let m_player;
		let m_config;

		// Configure public methods
		this.getPlayer = () => m_player;
		this.getPlayerTag = () => m_player.getTag();

		// Config default values
		configure();

		// Begin setup
		setup();

		function setup() {
			installDOM();
		}

		function installDOM() {
			m_parentTag = dom.getTag(parentTag);

			if (!m_parentTag) {
				console.error(`ScHtml5Video: dom. parent tag ${parentTag} was not found.`);
				return;
			}

			//create the wrapper div container for the input
			m_wrapperTag = dom.createTag("video-player", {
				class: m_config.css.wrapper,
			});
			dom.append(m_parentTag, m_wrapperTag);

			installPlayer();
		}

		function installPlayer() {
			m_player = ui.player(m_wrapperTag, m_config.player);
		}

		function configure() {
			m_config = {
				player: {
					css: {},
					attr: {
						controls: true,
					},
				},
				css: {},
			};

			// If options provided, override default config
			if (options) {
				m_config = m_utils.extend(true, m_config, options);
			}

			m_config.css = m_utils.extend(
				true,
				m_theme.getTheme({
					name: m_config.theme,
					control: "html5video",
				}),
				m_config.css
			);
		}
	}
};

ui.videoPlayer = (parentTag, options) => new ui.class.VideoPlayer(parentTag, options);

customElements.define("mambo-video-player", ui.class.VideoPlayer);
