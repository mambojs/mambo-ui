function demoTab(parentEle) {

    installWithFnCallback();
    installWithContentProp();

    function installWithFnCallback() {
        let tabConfig = {
            parentTag: parentEle,
            tabs: {
                buttons: [
                    {
                        text: "Tab 1",
                        fnClick: (context) => {
                            // You can declare individual event handlers for tab clicks
                        }
                    }, {
                        text: "Tab 2"
                    }, {
                        text: "Tab 3"
                    }
                ],
                fnClick: (buttonContext) => {
                    // You can declare a single event handler for all tab clicks
                }
            },
            fnTabReady: (contentTag, tab) => {
                const content = g_mamboDomJS.createTag("div", {
                    text: `This is content for Tab id: ${tab.id} name: ${tab.text}`
                });
                contentTag.appendChild(content);
            }
        };

        new MamboTab(tabConfig);
    }

    function installWithContentProp() {
        const btnGroupConfig = {
            buttons: [
                {
                    id: 4,
                    text: "Tab 4",
                    fnClick: (context) => {
                        // You can declare individual event handlers for tab clicks
                    }
                }, {
                    id: 5,
                    text: "Tab 5"
                }, {
                    id: 6,
                    text: "Tab 6"
                }
            ],
            fnClick: (buttonContext) => {
                // You can declare a single event handler for all tab clicks
            }
        };

        const contentList = btnGroupConfig.buttons.map((btn) => {
            return g_mamboDomJS.createTag("div", {
                text: `This is content for Tab id: ${btn.id} name: ${btn.text}`
            });
        });

        let tabConfig = {
            parentTag: parentEle,
            tabs: btnGroupConfig,
            contents: contentList
        };

        new MamboTab(tabConfig);
    }
}