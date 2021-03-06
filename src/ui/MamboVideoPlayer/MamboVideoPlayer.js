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
 *  File : MamboVideoPlayer.js
 *******************************************/
 import styles from './MamboVideoPlayer.css';

ui.videoPlayer = class MamboVideoPlayer extends HTMLElement {
    constructor(parentTag, options) {
        super();

        if (!parentTag) {
            console.error(`ScHtml5Video: parentTag parameter was not passed in.`);
            return;
        }

        // Config default values
        const self = this;
        const m_utils = tools.utils;
        const m_theme = new ui.theme(ui.g_mamboDefaultTheme);

        // HTML tag variables
        let m_parentTag;
        let m_wrapperTag;

        let m_player;
        let m_config;

        // Configure public methods
        this.getPlayer = () => m_player;
        this.getPlayerTag = () => m_player.getTag();

        // Config default values
        configure();

        // Begin setup
        setup();

        function setup() {
            installDOM();
        }

        function installDOM() {
            m_parentTag = dom.getTag(parentTag);

            if (!m_parentTag) {
                console.error(`ScHtml5Video: dom. parent tag ${parentTag} was not found.`);
                return;
            }

            //create the wrapper div container for the input
            m_wrapperTag = dom.createTag("video-player", { class: m_config.css.wrapper });
            dom.append(m_parentTag, m_wrapperTag);

            installPlayer();
        }

        function installPlayer() {

            m_player = new ui.player(m_wrapperTag, m_config.player);
        }


        function configure() {
            m_config = {
                player: {
                    css: {},
                    attr: {
                        controls: true
                    }
                },
                css: {},
            };

            // If options provided, override default config
            if (options) {
                m_config = m_utils.extend(true, m_config, options);
            }

            m_config.css = m_utils.extend(true, m_theme.getTheme({
                name: m_config.theme,
                control: "html5video"
            }), m_config.css);
        }
    }
}

customElements.define('mambo-video-player', ui.videoPlayer);