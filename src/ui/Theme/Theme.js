ui.class.Theme = class Theme {
	constructor(props) {
		const m_utils = new ui.utils();
		// If default themes provided, initialize with them
		this.m_themes = {
			default: m_utils.extend(true, {}, props),
		};
	}

	getTheme(context) {
		if (context && context.name && context.component) {
			if (context.name in this.m_themes) {
				return this.m_themes[context.name][context.component];
			}
		}
	}

	addTheme(context) {
		if (!context || !context.name || !context.theme) {
			throw "Theme: you invoked addTheme() but failed to define the theme name and/or theme.";
		}

		if (this.m_themes[context.name] && !this.m_themes[context.override]) {
			throw `Theme: you have attempted to override the theme name ${context.name}. Please add the property 'override:true' to succesfully override the theme.`;
		}

		this.m_themes[context.name] = context.theme;
	}
};

ui.theme = (props) => new ui.class.Theme(props);
