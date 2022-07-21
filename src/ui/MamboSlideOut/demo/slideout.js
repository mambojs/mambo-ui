//: Slideout
//@
demoSlideout("demo-slideout")

function demoSlideout(parentTag) {

    let m_slideout;

    installOpenButton();
    installSlideout();

    function installOpenButton() {
        const buttonConfig = {
            parentTag: parentTag,
            id: 1,
            text: "Open Slideout",
            fnClick: () => {
                m_slideout.open();
            }
        };

        ui.button(buttonConfig);
    }

    function installSlideout() {
        const slideoutConfig = {
            fnComplete: installSlideoutContent
        };
        m_slideout = ui.slideout("body", slideoutConfig);
    }

    function installSlideoutContent(context) {

        // Get the slideout content, header and body tags
        // Insert your own HTML content

        // You can replace the entire contents of the slideout area
        const contentTag = context.slideout.getContentTag();

        // Insert Header content
        const headerTag = context.slideout.getHeaderTag();
        dom.append(headerTag, "<h3>My Header Content</h3>");

        // Insert Body content
        const bodyTag = context.slideout.getBodyTag();
        dom.append(bodyTag, "<p style='padding:1em;'>Here goes your content</p>");
    }

}
//!