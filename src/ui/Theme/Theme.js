ui.class.Theme = class Theme {
	constructor(initThemes) {
		"use strict";

		const m_utils = new ui.utils();
		// If default themes provided, initialize Themes with them
		const m_themes = { default: {} };
		m_themes.default = m_utils.extend(true, {}, initThemes);

		this.addTheme = addTheme;
		this.getTheme = getTheme;

		function getTheme(context) {
			if (context && context.name && context.control) {
				if (context.name in m_themes) {
					return m_themes[context.name][context.control];
				}
			}
		}

		function addTheme(context) {
			if (!context || !context.name || !context.theme) {
				console.error("ScTheme: you invoked addTheme() but failed to define the theme name and/or theme.");
				return;
			}

			if (m_themes[context.name] && !m_themes[context.override]) {
				console.error(
					`ScTheme: you have attempted to override the theme name ${context.name}. Please add the property 'override:true' to succesfully override the theme.`
				);
				return;
			}

			m_themes[context.name] = context.theme;
		}
	}
};

ui.theme = (initThemes) => new ui.class.Theme(initThemes);
