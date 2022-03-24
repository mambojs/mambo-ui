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
 *  File : MamboTheme.js
 *******************************************/
function MamboTheme(initThemes) {
    "use strict";

    const m_utils = g_mamboUtils;
    // If default themes provided, initialize Themes with them
    const m_themes = { default: {} };
    m_themes.default = m_utils.extend(true, {}, initThemes);

    this.addTheme = addTheme;
    this.getTheme = getTheme;

    function getTheme(context) {
        if (context && context.name && context.control) {
            if (context.name in m_themes) {
                return m_themes[context.name][context.control];
            }
        }
    }

    function addTheme(context) {
        if (!context || !context.name || !context.theme) {
            console.error("ScTheme: you invoked addTheme() but failed to define the theme name and/or theme.");
            return;
        }

        if (m_themes[context.name] && !m_themes[context.override]) {
            console.error(`ScTheme: you have attempted to override the theme name ${context.name}. Please add the property 'override:true' to succesfully override the theme.`);
            return;
        }

        m_themes[context.name] = context.theme;
    }
}