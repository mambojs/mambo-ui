/******************************************
 *  Copyright 2022 Alejandro Sebastian Scotti, Scotti Corp.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.

 *  Author : Alejandro Scotti
 *  Created On : Sat Feb 26 2022
 *  File : MamboTreeView.js
 *******************************************/
function MamboTreeView(parentTag, options) {
    "use strict";

    if (!parentTag) {
        console.error(`TreeView: parentTag parameter was not passed in.`);
        return;
    }

    if (!options.data) {
        console.error(`TreeView: Data option was not passed in.`);
        return;
    }

    const self = this;
    const m_utils = g_mamboObjMgr.get("MamboUtilities");

    // HTML tag variables
    let m_parentTag;
    let m_treeViewParentTag;

    let m_config;
    let m_treeViewData = options.data;
    const m_dataMapById = {};

    // Configure public methods
    this.destroy = destroyTreeView;
    this.getItemData = getItemData;
    this.getParentTag = () => m_treeViewParentTag;

    // Config default values
    configure();

    // Begin setup
    setup();

    function setup() {
        m_parentTag = domJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`TreeView: domJS. parent tag ${parentTag} was not found.`);
            return;
        }

        installDOM();
    }

    function installDOM() {
        // Install TreeView parent tag
        m_treeViewParentTag = domJS.createTag(m_config.tag.treeView, { class: m_config.css.treeViewParent });

        m_parentTag.innerHTML = '';
        domJS.append(m_parentTag, m_treeViewParentTag);

        installGroup();
    }

    function installGroup() {
        if (!m_treeViewData || !Array.isArray(m_treeViewData)) {
            console.error('Data TreeView alert: tree view data not found or is not data type Array -->', parentTag);
            finishSetup();
            return;
        }

        installItems(m_treeViewData, m_treeViewParentTag);
        finishSetup();
    }

    function installItems(groupData, groupTag) {
        groupData.forEach((itemData) => {
            processItem(itemData, groupTag);
        });
    }

    function processItem(itemData, parentTag) {
        // Create item tag
        let itemTag = domJS.createTag(m_config.tag.treeViewItem, { class: m_config.css.item });
        domJS.append(parentTag, itemTag);

        let itemId = m_config.idField in itemData ? itemData[m_config.idField] : m_utils.getUniqueId();
        let idAtt = {};
        idAtt[m_config.itemIdAttrName] = itemId;
        m_dataMapById[itemId] = m_utils.clone(itemData);
        delete m_dataMapById[itemId][m_config.itemsField];

        const topTag = domJS.createTag(m_config.tag.treeViewItemTop, { class: m_config.css.top });
        const inTag = domJS.createTag(m_config.tag.treeViewItemIn, { class: m_config.css.in, attr: idAtt, text: itemData[m_config.textField] });
        domJS.append(topTag, inTag).append(itemTag, topTag);

        setupItemEventListeners(inTag, itemData);

        const items = itemData[m_config.itemsField];
        if (items && Array.isArray(items) && items.length > 0) {
            let groupTag = processGroup(items, itemTag);
            installIcon(topTag, groupTag, itemData);
        }
    }

    function processGroup(groupData, parentTag) {
        // Create group tag
        let groupTag = domJS.createTag(m_config.tag.treeViewGroup, { class: m_config.css.group });
        domJS.append(parentTag, groupTag);

        installItems(groupData, groupTag);

        return groupTag;
    }

    function installIcon(parentTag, groupTag, itemData) {
        const expanded = "expanded" in itemData ? itemData.expanded : m_config.expanded;
        const iconTag = domJS.createTag('icon', { class: m_config.css.icon });
        domJS.addClass(iconTag, m_config.css.iconExpand);
        domJS.prepend(parentTag, iconTag);

        setupIconEventListeners(groupTag, iconTag);

        if (expanded) {
            toggleExpand(groupTag, iconTag);
        }
    }

    function clearSelected() {
        let selected = domJS.getTags(`.${m_config.css.selected}`, m_treeViewParentTag);
        if (selected && selected.length > 0) {
            for (let index = 0; index < selected.length; index++) {
                domJS.removeClass(selected[index], m_config.css.selected);
            }
        }
    }

    function setupItemEventListeners(inTag, itemData) {
        inTag.addEventListener('click', (ev) => {
            if (m_config.fnSelect) {
                m_config.fnSelect({ treeView: self, tag: inTag, itemData: itemData, ev: ev });
            }

            if (!ev.defaultPrevented) {
                clearSelected();
                domJS.addClass(inTag, m_config.css.selected);
            }
        });

        inTag.addEventListener('mouseenter', () => {
            if (!domJS.hasClass(inTag, m_config.css.selected)) {
                domJS.addClass(inTag, m_config.css.hover);
            }
        });

        inTag.addEventListener('mouseleave', () => {
            domJS.removeClass(inTag, m_config.css.hover);
        });
    }

    function setupIconEventListeners(groupTag, iconTag) {
        iconTag.addEventListener('click', (ev) => {
            let iconTag = ev.target;
            toggleExpand(groupTag, iconTag);
        });
    }

    function toggleExpand(groupTag, iconTag) {
        domJS.toggleClass(groupTag, m_config.css.expanded);
        domJS.toggleClass(iconTag, m_config.css.iconCollapse).toggleClass(iconTag, m_config.css.iconExpand);
    }

    function getItemData(tag) {
        let itemId = tag.getAttribute(m_config.itemIdAttrName);
        return m_dataMapById[itemId];
    }

    function destroyTreeView() {
        domJS.remove(m_treeViewParentTag);
    }

    function finishSetup() {
        // Execute complete callback function
        if (m_config.fnComplete) {
            m_config.fnComplete({ treeView: self });
        }
    }

    function configure() {
        m_config = {
            idField: "id",
            textField: "text",
            itemsField: "items",
            expanded: false,
            itemIdAttrName: 'data-tree-view-item-id',
            css: {
                treeViewParent: "tree-view-parent",
                group: "tree-view-group",
                item: "tree-view-item",
                top: "tree-view-item-top",
                in: "tree-view-item-in",
                icon: "tree-view-item-icon",
                iconExpand: "tree-view-icon-expand",
                iconCollapse: "tree-view-icon-collapse",
                hover: "hover",
                selected: "selected",
                expanded: "expanded"
            },
            tag: {
                treeView: "sc-tree-view",
                treeViewGroup: "tree-view-group",
                treeViewItem: "tree-view-item",
                treeViewItemTop: "tree-view-item-top",
                treeViewItemIn: "tree-view-item-in"
            },
            fnSelect: (context) => {
                // Nothing executes by default
            },
            events: {}
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }
    }
}