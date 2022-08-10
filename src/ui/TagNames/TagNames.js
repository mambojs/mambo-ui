ui.class.TagNames = class TagNames {
	constructor(initTags) {
		const m_utils = new ui.utils();
		// If default themes provided, initialize Themes with them
		this.m_tagNames = {
			default: m_utils.extend(true, {}, initTags),
		};
	}

	getTags(context) {
		if (context && context.name && context.control) {
			if (context.name in this.m_tagNames) {
				return this.m_tagNames[context.name][context.control];
			}
		}
	}

	addTags(context) {
		if (!context || !context.name || !context.tags) {
			throw "TagNames: you invoked addTags() but failed to define the tags name.";
		}

		if (this.m_tagNames[context.name] && !this.m_tagNames[context.override]) {
			throw `TagNames: you have attempted to override the tags name ${context.name}. Please add the property 'override:true' to succesfully override the tags.`;
		}

		this.m_tagNames[context.name] = context.theme;
	}
};

ui.tagNames = (initTags) => new ui.class.TagNames(initTags);
