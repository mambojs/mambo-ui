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
function MamboTheme() {
    "use strict";

    const m_default = {
        button: {
            button: "button-button",
            img: "button-img",
            selected: "selected",
            hover: "hover",
            disabled: "button-disabled"
        },
        html5video: {
            player: {
                player: "html5video-player"
            },
            parent: "html5video-parent",
            controls: "html5video-controls",
            play: "html5video-play",
            pause: "html5video-pause",
            volume: "html5video-volume",
            time: "html5video-time",
            progressBar: "html5video-progress-bar",
        },
        html5player: {
            player: "html5player-player",
        }
    };

    const m_themes = {
        default: m_default
    };

    this.getTheme = getTheme;
    this.addTheme = addTheme;

    function getTheme(context = {}) {

        if (!(context.name in m_themes)) {
            if (!context.control) {
                return m_default;
            } else {
                return m_default[context.control];
            }
        }

        if (!context.control) {
            return m_themes[context.name];
        } else {
            return m_themes[context.name][context.control];
        }
    }

    function addTheme(context = {}) {
        if (!context.name || !context.theme) {
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