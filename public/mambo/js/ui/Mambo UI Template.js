class MamboButton extends HTMLElement {
    constructor(initOptions) {
        super();
        const self = this;

        let m_config;

        this.configure = configure;

        if (initOptions) configure(initOptions);

        function configure(options) {
            m_config = {
                tag: {

                },

            };

            // If options provided, override default config
            if (options) {

                m_config = m_utils.extend(true, m_config, options);
            }

            m_config.css = m_utils.extend(true, m_themes.getTheme({
                name: m_config.theme,
                control: "button"
            }), m_config.css);
        }
    }

    mOptions(options) { this.configure(options); }

}
// Must ALWAYS define the new element as a Native Web Component
customElements.define('mambo-button', MamboButton);