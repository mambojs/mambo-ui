function demoBrowserRouter(parentEle) {

    const m_browserRouter = g_mamboObjMgr.get("MamboHistoryManager");

    installBtnGroup();

    function installBtnGroup() {
        let btnGroupProps = {
            buttons: [{
                id: 1,
                text: "View 1"
            }, {
                id: 2,
                text: "View 2"
            }, {
                id: 3,
                text: "View 3"
            }, {
                id: 4,
                text: "Clear State"
            }, {
                id: 5,
                text: "Replace State"
            }],
            fnClick: (context) => {
                const buttonConfig = context.button.getConfig();
                switch (context.button.getId()) {
                    case 4:
                        m_browserRouter.clearState(null, "Cleared Title");
                        break;
                    case 5:
                        m_browserRouter.replaceState(buttonConfig.text, `Title: ${buttonConfig.text}`, `/view${buttonConfig.id}`);
                        break;
                    default:
                        m_browserRouter.pushState(buttonConfig.text, `Title: ${buttonConfig.text}`, `/view${buttonConfig.id}`);
                        break;
                }
            }
        };

        new MamboButtonGroup(parentEle, btnGroupProps);
    }
}