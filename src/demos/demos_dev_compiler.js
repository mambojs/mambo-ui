
const cevt = new CustomEvent('compiler-ready', {
    bubbles: true,
    cancelable: true,
    detail: {
        compiler: 'demos_compiler.js'
    }
});

window.demoui = {};
window.demoui.html = "&nbsp;";
window.demoui.components = [];
const demoFiles = [
    { alias:"button", name:"MamboButton" },
    { alias:"button-group", name:"MamboButtonGroup" },
    { alias:"calendar", name:"MamboCalendar" },
    { alias:"checkbox-radio", name:"MamboCheckboxRadio" },
    { alias:"checkbox-radio-group", name:"MamboCheckboxRadioGroup" },
    { alias:"combobox", name:"MamboCombobox" },
    { alias:"date-picker", name:"MamboDatePicker" },
    { alias:"dialog", name:"MamboDialog" },
    { alias:"drag-drop", name:"MamboDragDrop" },
    { alias:"draggable", name:"MamboDraggable" },
    { alias:"dropdown", name:"MamboDropdown" },
    { alias:"file-chooser", name:"MamboFileChooser" },
    { alias:"grid", name:"MamboGrid" },
    { alias:"input", name:"MamboInput" },
    { alias:"percentage", name:"MamboPercentage" },
    { alias:"player", name:"MamboPlayer" },
    { alias:"rating", name:"MamboRating" },
    { alias:"slideout", name:"MamboSlideout" },
    { alias:"slider", name:"MamboSlider" },
    { alias:"switch", name:"MamboSwitch" },
    { alias:"tab", name:"MamboTab" },
    { alias:"time-picker", name:"MamboTimePicker" },
    { alias:"tree-view", name:"MamboTreeView" }
];
let totalComponents = demoFiles.length;

demoFiles.forEach(async ({ alias, name }, index) => {
    const demoContent = await getScript(`src/ui/${name}/demo/${alias}.js`);
    const mdContent = await getScript(`src/ui/${name}/demo/description.md`);
    
    demoui.components.push({
        alias,
        code: demoContent.code,
        component: `${name}.js`,
        custom: `demo-${alias}`,
        description: mdContent.fullcontent,
        name,
        script: demoContent.fullcontent
    });
    
    if (index === totalComponents - 1) {
        window.dispatchEvent(cevt);
    }
});

async function getScript(path) {

    const file = await (await fetch(path)).text();

    const htmlEntities = (html) => {
        return html.replace(/[\u00A0-\u9999<>\&]/g, function(i) {
            return '&#'+i.charCodeAt(0)+';';
        });
    }

    const object = {
        content: '',
        fullcontent: file,
        code: null
    }

    if (path.endsWith(".js")) {
        object.content = object.fullcontent.replace(/\/\*[\s\S]*?\*\/|([^:]|^)\/\/.*$/gm, '$1');
        
        const codeList = object.fullcontent.match(/\/\/\:([\s\S]*?)\/\/\!/gm);

        if (null !== codeList) {
            object.code = codeList.map(code => {
                return {
                    comment: htmlEntities(code.match(/(?<=\/\/\:)(.*)/gm)[0].trim()),
                    script: code.match(/(?<=\/\/\@)([\s\S]*?)(?=\/\/\!)/gm)[0]
                }
            });
        }

    }
    
    return object;
}
   