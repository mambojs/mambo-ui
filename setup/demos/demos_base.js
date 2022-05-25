mambo.develop = true

const OUTPUT_PATH = '/demo';
const AREAS = ['area', 'area-desc', 'area-code'];
const TYPES = ['script', 'description', 'code'];

window.demoui.manager = {
    route: {
        name: 'UIHomeDemo',
        path: OUTPUT_PATH,
        action: () => {
            AREAS.forEach(area => {
                demoui.manager.clearArea(area)
            });
        }
    },
    createHTMLbase: function() {
        const html = eval('`' + demoui.html + '`');
        let parser = new DOMParser().parseFromString(html, 'text/html');
        document.body.prepend(parser.body.firstChild);

        demoui.manager.createTabs('#main')
    },
    createTabs: function(id) {
        let tabConfig = {
            parentTag: id,
            tabs: {
                buttons: [
                    {
                        text: "Que es Mambo UI?",
                        area: AREAS[1],
                        fnClick: (context) => {
                            // You can declare individual event handlers for tab clicks
                        }
                    }, {
                        text: "Como lo uso?",
                        area: AREAS[2]
                    }, {
                        text: "Demos",
                        area: AREAS[0]
                    }
                ],
                fnClick: (buttonContext) => {
                    // You can declare a single event handler for all tab clicks
                }
            },
            fnTabReady: (contentTag, tab) => {
                const content = dom.createTag("div", {
                    text: `This is content for Tab id: ${tab.id} name: ${tab.text}`,
                    attr: { id: tab.area }
                });
                contentTag.appendChild(content);
            }
        };

        new ui.tab(tabConfig);
    },
    showComponentsList: (components) => {
        let sidebar = document.getElementById('sidebar');
        let list = document.createElement('ul');

        components.forEach(component => {
            let item = document.createElement('li');
            item.innerText = component.name;
            item.onclick = () => { 
                tools.router.push({ path: `${OUTPUT_PATH}/${component.name.toLowerCase()}` });
            }
            list.appendChild(item);
        })

        sidebar.appendChild(list);
    },
    runComponent: (component) => {

        const options = [
            { area: AREAS[0], component, id: component.custom, type: TYPES[0] },
            { area: AREAS[1], component, id: `${component.custom}-desc`, type: TYPES[1] },
            { area: AREAS[2], component, id: `${component.custom}-code`, type: TYPES[2] }
        ]

        options.forEach(option => {
            demoui.manager.hidrateArea(option);
        })
        
    },
    hidrateArea: (object) => {

        let area = document.getElementById(object.area);
        // let div = document.createElement('div');
        // div.id = object.id;
        let customTag = document.createElement(object.id);

        demoui.manager.clearArea(object.area);
        // area.appendChild(div);
        area.appendChild(customTag);

        switch (object.type) {
            case TYPES[0]:
                demoui.manager.applyScript(object.component[object.type], object.id);
                break;
        
            case TYPES[1]:
                demoui.manager.applyDesc(object.component[object.type], object.id);
                break;
            
            case TYPES[2]:
                demoui.manager.applyCode(object.component[object.type], object.id);
                break;
        }
        
    },
    clearArea: (zone) => {
        let area = document.getElementById(zone);
        area.innerHTML = '';
    },
    applyScript: (script, custom) => {
        eval(script);
    },
    applyDesc: (desc, custom) => {
        // let area = document.getElementById(custom);
        let area = document.getElementsByTagName(custom)[0];
        area.innerHTML = desc;
    },
    applyCode: (code, custom) => {
        if (null !== code) {
            // let area = document.getElementById(custom);
            let area = document.getElementsByTagName(custom)[0];
            
            let printCodes = code.map(code => {
                return `<h4>${code.comment}</h4><pre>${code.script}</pre>`;
            })

            area.innerHTML = printCodes.join('');
        }
    },
    addRoutes: (components) => {
        let routes = components.map(component => {
            return {
                name: component.name,
                path: `${OUTPUT_PATH}/${component.name.toLowerCase()}`,
                action: () => { demoui.manager.runComponent(component); }
            }
        })

        routes.push(demoui.manager.route);
    
        tools.router.routes(routes);
    }
}

demoui.manager.createHTMLbase();

demoui.manager.showComponentsList(demoui.components);

demoui.manager.addRoutes(demoui.components);