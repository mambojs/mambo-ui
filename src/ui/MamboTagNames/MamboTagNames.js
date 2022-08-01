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
 *  File : MamboTagNames.js
 *******************************************/
 ui.class.MamboTagNames = class MamboTagNames {
  constructor(initTags) {
    const m_utils = new ui.utils;
    // If default themes provided, initialize Themes with them
    this.m_tagNames = {
      default: m_utils.extend(true, {}, initTags),
    };
  }

  getTags(context) {
    if (context && context.name && context.control) {
      if (context.name in this.m_tagNames) {
        return this.m_tagNames[context.name][context.control];
      }
    }
  }

  addTags(context) {
    if (!context || !context.name || !context.tags) {
      return "MamboTagNames: you invoked addTags() but failed to define the tags name.";
    }

    if (this.m_tagNames[context.name] && !this.m_tagNames[context.override]) {
      return `MamboTagNames: you have attempted to override the tags name ${context.name}. Please add the property 'override:true' to succesfully override the tags.`;
    }

    this.m_tagNames[context.name] = context.theme;
  }
};

ui.tagNames = (initTags) => new ui.class.MamboTagNames(initTags);
