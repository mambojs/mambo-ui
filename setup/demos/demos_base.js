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
        let div = document.createElement('div');
        div.id = object.id;

        demoui.manager.clearArea(object.area);
        area.appendChild(div);

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
        let area = document.getElementById(custom);
        area.innerHTML = desc;
    },
    applyCode: (code, custom) => {
        if (null !== code) {
            let area = document.getElementById(custom);
            
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