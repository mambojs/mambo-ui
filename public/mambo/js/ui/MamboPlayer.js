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
 *  File : MamboPlayer.js
 *******************************************/
function MamboPlayer(parentTag, options) {
    'use strict';

    if (!parentTag) {
        console.error(`HTML5 Player: parentEle parameter not passed in.`);
        return;
    }

    const m_utils = g_mamboUtils;
    const m_theme = g_mamboTheme;
    const m_buttonGroups = [];

    let m_config;
    let m_timeInfo;
    let m_progressBar;

    // g_mamboDomJS. Elements
    let m_parentTag;
    let m_playerTag;

    // Declare public methods
    this.getTag = () => m_playerTag;

    /*
    * Custom controls:
    * group 1
    *       button group: play, next, volume
    *       cur/total time
    * group 2
    *       button group: settings, theater mode, full screen
    * */

    configure();
    setup();

    function setup() {
        m_parentTag = g_mamboDomJS.getTag(parentTag);

        if (!m_parentTag) {
            console.error(`HTML5 Player: g_mamboDomJS. parent tag ${parentTag} was not found.`);
            return;
        }

        installPlayer();
        //installControls();
        //installProgressBar();

    }


    function installPlayer() {
        const tagConfig = {
            class: m_config.css.player,
            prop: m_config.prop,
            attr: m_config.attr
        };
        m_playerTag = g_mamboDomJS.createTag(m_config.media, tagConfig);
        g_mamboDomJS.append(m_parentTag, m_playerTag);
    }


    function setSource(source) {
        g_mamboDomJS.setAttr(m_playerTag, { src: source });
    }

    function installControls() {
        if (m_config.controls && Array.isArray((m_config.controls))) {
            const controls = m_config.controls;
            controls.forEach((object) => {
                if (object.buttons) {
                    installButtonGroup(object.buttons);
                } else if (object.time) {
                    installTime();
                }
            });
        }
    }

    function installProgressBar() {

    }

    function installButtonGroup(buttons) {
        let btnGroupProps = {
            buttons: [{
                id: 1,
                text: "Button One",
                fnClick: (context) => {
                    // You can declare individual event handlers for each button
                }
            }, {
                id: 2,
                text: "Button Two"
            }, {
                id: 3,
                text: "Button Three"
            }],
            fnClick: (context) => {
                // You can declare a single event handler for all buttons
                alert(`'Button clicked: ' ${context.button.getId()}`);
            }
        };

        m_buttonGroups.push();
        new MamboButtonGroup(parentEle, btnGroupProps);
    }

    function installTime() {

    }

    function handlePlayPauseClick(context) {
        if (m_playerTag.paused) {
            changePlayBtnState(true);
            m_playerTag.play();
        } else {
            changePlayBtnState(false);
            m_playerTag.pause();
        }
    }

    function changePlayBtnState(play) {
        m_buttonGroups.forEach((btnGroup) => {
            const playBtn = btnGroup.get();
        });
    }

    function handleNextClick() {

    }

    function handlePrevClick() {

    }

    function handleSettingsClick() {

    }

    function handleTheaterClick() {

    }

    function handleFullScreenClick() {

    }

    function configure() {
        m_config = {
            theme: "default",
            media: "video",
            attr: {
                src: ""
            },
            prop: {},
            progressBar: true,
            tag: {
                parent: "html5player",
                controls: "controls",
                time: "time-stats"
            },
            controls: [
                {
                    buttons: [
                        "play", "previous", "next", "volume"
                    ]
                },
                {
                    time: true
                },
                {
                    buttons: [
                        "settings", "theater", "fullScreen"
                    ]
                }
            ]
        };

        // If options provided, override default config
        if (options) {
            m_config = m_utils.extend(true, m_config, options);
        }

        m_config.css = m_utils.extend(true, m_theme.getTheme({
            name: m_config.theme,
            control: "html5player"
        }), m_config.css);

    }

}