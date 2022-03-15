function demoDropdown(parentEle) {

    const m_graphics = g_mamboGraphics;

    let config = {
        button: {
            img: {
                attr: {
                    src: m_graphics.getImage({ name: "star" })
                }
            },
        },
        fnComplete: installDropdownContent
    }
        ;

    new MamboDropdown(parentEle, config);

    function installDropdownContent(context) {
        // Get the dropDown content
        // Insert your own HTML content

        // You can replace the entire contents of the dropdown area
        const contentTag = context.dropdown.getContentTag();

        // Insert content
        g_domJS.append(contentTag, "<p style='padding:1em;'>Here goes your content</p>");
    }
}