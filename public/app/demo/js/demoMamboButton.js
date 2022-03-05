function demoButton(parentEle) {

    const m_demoGraphics = new DemoGraphics();

    textOnly();
    textImage();
    anchorButtonText();
    anchorButtonImg();
    buttonImgWithHover();
    buttonMultiImgWithHover();
    textSVG();

    function textOnly() {
        const config = {
            id: 1,
            text: "Single button",
            fnClick: (context) => {
                alert(`Button id: ${context.button.getId()} clicked.`);
            }
        };

        new MamboButton(parentEle, config);
    }

    /**
     * Creating a button with an img element inside
     */
    function textImage() {
        const config = {
            img: {
                attr: {
                    src: m_demoGraphics.getImage("home-icon-white"),
                    alt: "home"
                }
            },
            id: 2,
            text: "Image Button",
            fnClick: (context) => {
                alert(`Button id: ${context.button.getId()} clicked.`);
            }
        };

        new MamboButton(parentEle, config);
    }

    /**
     * Creating a button with an <a> element
     */
    function anchorButtonText() {
        const config = {
            id: 3,
            tag: "a",
            text: "Anchor Button",
            attr: {
                href: "#"
            },
            fnClick: (context) => {
                alert(`Button id: ${context.button.getId()} clicked.`);
            }
        };

        new MamboButton(parentEle, config);
    }

    /**
     * Creating a button with an <a> and an <img> element inside
     */
    function anchorButtonImg() {
        const config = {
            id: 4,
            tag: "a",
            text: "Anchor Button",
            attr: {
                href: "#"
            },
            img: {
                attr: {
                    src: m_demoGraphics.getImage("home-icon-white"),
                    alt: "home"
                }
            },
            fnClick: (context) => {
                alert(`Button id: ${context.button.getId()} clicked.`);
            }
        };

        new MamboButton(parentEle, config);
    }

    /**
     * Creating a button that replace the inner image in a hover event.
     */
    function buttonImgWithHover() {
        const config = {
            id: 5,
            text: "Hover Button",
            img: {
                attr: {
                    src: m_demoGraphics.getImage("home-icon-white"),
                    alt: "home"
                },
                hover: m_demoGraphics.getImage("star")
            },
            fnClick: (context) => {
                alert(`Button id: ${context.button.getId()} clicked.`);
            }
        };

        new MamboButton(parentEle, config);
    }

    /**
     * Creating a button that replace the inner image in a hover event.
     */
    function buttonMultiImgWithHover() {
        const config = {
            id: 5,
            text: "Multi Hover Button",
            img: [
                {
                    css: { img: "demo-img" },
                    attr: {
                        src: m_demoGraphics.getImage("home-icon-white"),
                        alt: "home"
                    },
                    hover: m_demoGraphics.getImage("star")
                },
                {
                    attr: {
                        src: m_demoGraphics.getImage("star"),
                        alt: "Star"
                    },
                    hover: m_demoGraphics.getImage("home-icon-white")
                }
            ],
            fnClick: (context) => {
                alert(`Button id: ${context.button.getId()} clicked.`);
            }
        };

        new MamboButton(parentEle, config);
    }

    /**
     * Creating a button with an svg element inside
     */
    function textSVG() {
        const config = {
            svg: {
                element: m_demoGraphics.getSVG("home"),
                attr: {
                }
            },
            id: 6,
            text: "SVG Button",
            fnClick: (context) => {
                alert(`Button id: ${context.button.getId()} clicked.`);
            }
        };

        new MamboButton(parentEle, config);
    }
}
