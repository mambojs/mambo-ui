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

*  @author Alejandro Sebastian Scotti
*  @version v09-14-22-23-00
*******************************************/
function mamboUI(domJS) {
		if (!domJS) {
			throw 'mamboUI must be invoked with required argument domJS: mamboUI(domJS)';
		}
		const ui = { class: {}, d: domJS() };
ui.class.DateManager = function DateManager() {
  const self = this;
  const m_formatTokens = /(\[[^[]*\])|(\\)?([Hh]mm(ss)?|Mo|MM?M?M?|Do|DDDo|DD?D?D?|ddd?d?|do?|w[o|w]?|W[o|W]?|Qo?|YYYYYY|YYYYY|YYYY|YY|gg(ggg?)?|GG(GGG?)?|e|E|a|A|hh?|HH?|kk?|mm?|ss?|S{1,9}|x|X|zz?|ZZ?|.)/g;
  const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  this.add = add;
  this.cloneDate = cloneDate;
  this.createDate = createDate;
  this.createInterval = createInterval;
  this.endOf = endOf;
  this.format = format;
  this.getDate = getDate;
  this.getDayName = getDayName;
  this.getToday = getToday;
  this.isAfter = isAfter;
  this.isSameOrAfter = isSameOrAfter;
  this.isBefore = isBefore;
  this.isSame = isSame;
  this.isSameOrBefore = isSameOrBefore;
  this.isDate = isDate;
  this.startOf = startOf;
  function getToday() {
    let today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  }
  function format(date, formatText) {
    if (!isDate(date) || !isString(formatText)) {
      return "";
    }
    let tokens = formatText.match(m_formatTokens);
    let returnValue = "";
    tokens.forEach((token) => {
      let text = "";
      switch (token) {
        case "H":
          text = getHours(date, false);
          break;
        case "HH":
          text = addZero(getHours(date, false), 2);
          break;
        case "h":
          text = getHours(date, true);
          break;
        case "hh":
          text = addZero(getHours(date, true), 2);
          break;
        case "m":
          text = date.getMinutes();
          break;
        case "mm":
          text = addZero(date.getMinutes(), 2);
          break;
        case "a":
          text = getAMPM(date);
          break;
        case "A":
          text = getAMPM(date).toUpperCase();
          break;
        case "D":
          text = date.getDate();
          break;
        case "DD":
          text = addZero(date.getDate(), 2);
          break;
        case "ddd":
          text = getDayName(date.getDay()).substring(0, 3);
          break;
        case "dddd":
          text = getDayName(date.getDay());
          break;
        case "M":
          text = date.getMonth() + 1;
          break;
        case "MM":
          text = addZero(date.getMonth() + 1, 2);
          break;
        case "MMM":
          text = getMonthName(date.getMonth()).substring(0, 3);
          break;
        case "MMMM":
          text = getMonthName(date.getMonth());
          break;
        case "YY":
          text = date.getFullYear().toString().slice(-2);
          break;
        case "YYYY":
          text = date.getFullYear();
          break;
        default:
          text = token;
      }
      returnValue += text;
    });
    return returnValue;
  }
  function createDate(text, formatText) {
    if (!isString(text) || !isString(formatText)) {
      return null;
    }
    let index = 0;
    let values = { y: 0, M: 0, d: 1, h: 0, m: 0, s: 0, ms: 0 };
    let tokens = formatText.match(m_formatTokens);
    let toSlice = 0;
    let value = text;
    for (let i = 0, len = tokens.length; i < len; i++) {
      let token = tokens[i];
      switch (token) {
        case "H":
          if (/^(1\d|2[0-3])$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else if (/^(\d)$/g.test(value.substring(0, 1))) {
            toSlice = 1;
          } else {
            return null;
          }
          values["h"] = parseInt(value.substring(0, toSlice));
          break;
        case "HH":
          if (/^([0-1]\d|2[0-3])$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else {
            return null;
          }
          values["h"] = parseInt(value.substring(0, toSlice));
          break;
        case "h":
          if (/^(1[0-2])$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else if (/^(\d)$/g.test(value.substring(0, 1))) {
            toSlice = 1;
          } else {
            return null;
          }
          values["h"] = parseInt(value.substring(0, toSlice));
          break;
        case "hh":
          if (/^([0]\d|1[0-2])$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else {
            return null;
          }
          values["h"] = parseInt(value.substring(0, toSlice));
          break;
        case "m":
          if (/^([1-5]\d)$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else if (/^(\d)$/g.test(value.substring(0, 1))) {
            toSlice = 1;
          } else {
            return null;
          }
          values["m"] = parseInt(value.substring(0, toSlice));
          break;
        case "mm":
          if (/^([0-5]\d)$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else {
            return null;
          }
          values["m"] = parseInt(value.substring(0, toSlice));
          break;
        case "a":
        case "A":
          if (/^(am)$/gi.test(value.substring(0, 2))) {
            toSlice = 2;
            values["h"] = values["h"] === 12 ? 0 : values["h"];
          } else if (/^(pm)$/gi.test(value.substring(0, 2))) {
            toSlice = 2;
            values["h"] = values["h"] < 12 ? values["h"] + 12 : values["h"];
          } else {
            toSlice = 0;
          }
          break;
        case "D":
          if (/^([1-2]\d|3[0-1])$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else if (/^([1-9])$/g.test(value.substring(0, 1))) {
            toSlice = 1;
          } else {
            return null;
          }
          values["d"] = parseInt(value.substring(0, toSlice));
          break;
        case "DD":
          if (/^(0[1-9]|[1-2]\d|3[0-1])$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else {
            return null;
          }
          values["d"] = parseInt(value.substring(0, toSlice));
          break;
        case "M":
          if (/^(1[0-2])$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else if (/^([1-9])$/g.test(value.substring(0, 1))) {
            toSlice = 1;
          } else {
            return null;
          }
          values["M"] = parseInt(value.substring(0, toSlice)) - 1;
          break;
        case "MM":
          if (/^(0[1-9]|1[0-2])$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else {
            return null;
          }
          values["M"] = parseInt(value.substring(0, toSlice)) - 1;
          break;
        case "MMM":
          index = monthNames.findIndex((name) => name.toUpperCase() === value.substring(0, 3).toUpperCase());
          if (index < 0) {
            return null;
          }
          toSlice = 3;
          values["M"] = index;
          break;
        case "MMMM":
          index = monthNames.findIndex((name) => name.toUpperCase() === value.substring(0, name.length).toUpperCase());
          if (index < 0) {
            return null;
          }
          toSlice = monthNames[index].length;
          values["M"] = index;
          break;
        case "YY":
          if (/^(\d{2})$/g.test(value.substring(0, 2))) {
            toSlice = 2;
          } else {
            return null;
          }
          values["y"] = parseInt(value.substring(0, toSlice));
          break;
        case "YYYY":
          if (/^(\d{4})$/g.test(value.substring(0, 4))) {
            toSlice = 4;
          } else {
            return null;
          }
          values["y"] = parseInt(value.substring(0, toSlice));
          break;
        default:
          toSlice = token.length;
          break;
      }
      value = value.slice(toSlice);
    }
    return new Date(values["y"], values["M"], values["d"], values["h"], values["m"], values["s"], values["ms"]);
  }
  function getHours(date, is12Format) {
    let hours = date.getHours();
    if (is12Format) {
      hours = hours % 12;
      hours = hours ? hours : 12;
    }
    return hours;
  }
  function getAMPM(date) {
    return date.getHours() >= 12 ? "pm" : "am";
  }
  function getDayName(day) {
    return weekdays[day];
  }
  function getMonthName(month) {
    return monthNames[month];
  }
  function add(date, number, token) {
    if (!isDate(date) || !isNumber(number) || !isString(token)) {
      return date;
    }
    switch (token) {
      case "minutes":
      case "m":
        date.setMinutes(date.getMinutes() + number);
        break;
      case "hours":
      case "h":
        date.setHours(date.getHours() + number);
        break;
      case "days":
      case "d":
        date.setDate(date.getDate() + number);
        break;
      case "months":
      case "M":
        date.setMonth(date.getMonth() + number);
        break;
      case "years":
      case "Y":
        date.setFullYear(date.getFullYear() + number);
        break;
    }
    return self;
  }
  function createInterval(interval, token, min, max, formatText) {
    if (!isNumber(interval) || !isString(token) || !isDate(min) || !isDate(max)) {
      return [];
    }
    const formatFunc = formatText ? (value) => format(value, formatText) : (value) => value;
    let array = [];
    let currentDate = min;
    while (isBefore(currentDate, max)) {
      array.push(formatFunc(currentDate));
      add(currentDate, interval, token);
    }
    return array;
  }
  function getDate(value, formatText) {
    let text = isDate(value) ? format(value, formatText) : value;
    return createDate(text, formatText);
  }
  function isBefore(date1, date2) {
    return date1 < date2;
  }
  function isSameOrBefore(date1, date2) {
    return date1 <= date2;
  }
  function isAfter(date1, date2) {
    return date1 > date2;
  }
  function isSameOrAfter(date1, date2) {
    return date1 >= date2;
  }
  function isSame(date1, date2) {
    return date1.getTime() === date2.getTime();
  }
  function startOf(date, token) {
    if (!isDate(date) || !isString(token)) {
      return date;
    }
    switch (token) {
      case "week":
      case "w":
        add(date, -date.getDay(), "d");
        break;
      case "month":
      case "M":
        add(date, -date.getDate() + 1, "d");
        break;
      case "year":
      case "Y":
        startOf(date, "M").add(date, -date.getMonth(), "M");
        break;
      case "decade":
        startOf(date, "Y").add(date, -(date.getFullYear() % 10), "Y");
        break;
      case "century":
        startOf(date, "decade").add(date, -(date.getFullYear() % 100), "Y");
        break;
    }
    return self;
  }
  function endOf(date, token) {
    if (!isDate(date) || !isString(token)) {
      return date;
    }
    switch (token) {
      case "month":
      case "M":
        startOf(date, "M").add(date, 1, "M").add(date, -1, "d");
        break;
      case "year":
      case "Y":
        startOf(date, "Y").add(date, 1, "Y").add(date, -1, "d");
        break;
      case "decade":
        startOf(date, "decade").add(date, 10, "Y").add(date, -1, "d");
        break;
      case "century":
        startOf(date, "century").add(date, 100, "Y").add(date, -1, "d");
        break;
    }
    return self;
  }
  function cloneDate(date) {
    if (!isDate(date)) {
      return null;
    }
    return new Date(date.getTime());
  }
  function addZero(value, n) {
    return ("0" + value).slice(-n);
  }
  function isDate(value) {
    return value instanceof Date || Object.prototype.toString.call(value) === "[object Date]";
  }
  function isString(value) {
    return typeof value === "string" || value instanceof String || Object.prototype.toString.call(value) === "[object String]";
  }
  function isNumber(value) {
    return typeof value === "number" || Object.prototype.toString.call(value) === "[object Number]";
  }
};
ui.date = new ui.class.DateManager();
ui.class.String = function String2() {
  const self = this;
  this.filterArray = filterArray;
  this.findInArray = findInArray;
  this.getSearchFunction = getSearchFunction;
  function filterArray(array, searchText, getItemTextFunc, filter) {
    let searchFunc = getSearchFunction(filter);
    return array.filter((item) => searchFunc(getItemTextFunc(item), searchText));
  }
  function findInArray(array, searchText, getItemTextFunc, filter) {
    let searchFunc = getSearchFunction(filter);
    return array.find((item) => searchFunc(getItemTextFunc(item), searchText));
  }
  function getSearchFunction(filter) {
    switch (filter) {
      case "contains":
        return contains;
      case "equals":
        return equals;
      default:
        return () => {
          return true;
        };
    }
  }
  function contains(itemText, searchText) {
    return itemText.toLowerCase().includes(searchText.toLowerCase());
  }
  function equals(itemText, searchText) {
    return itemText.toLowerCase() === searchText.toLowerCase();
  }
};
ui.string = new ui.class.String();
ui.class.Utilities = function Utilities() {
  this.clone = clone;
  this.extend = extend;
  this.formatPercentage = formatPercentage;
  this.getUniqueId = getUniqueId;
  this.installUIComponent = installUIComponent;
  this.isArray = isArray;
  this.isNumber = isNumber;
  this.isObject = isObject;
  this.isString = isString;
  function extend() {
    let extended = {};
    let deep = false;
    let i = 0;
    let length = arguments.length;
    if (Object.prototype.toString.call(arguments[0]) === "[object Boolean]") {
      deep = arguments[0];
      i++;
    }
    function merge(obj2) {
      for (var prop in obj2) {
        if (Object.prototype.hasOwnProperty.call(obj2, prop)) {
          if (deep && isObject(obj2[prop])) {
            extended[prop] = extend(true, extended[prop], obj2[prop]);
          } else if (deep && isArray(obj2[prop])) {
            mergeArray(obj2[prop], extended, prop);
          } else {
            extended[prop] = obj2[prop];
          }
        }
      }
    }
    function mergeArray(array, extended2, prop) {
      extended2[prop] = [];
      array.forEach((item, index) => {
        if (deep && isObject(item)) {
          extended2[prop][index] = extend(true, extended2[prop][index], item);
        } else if (deep && isArray(item)) {
          mergeArray(item, extended2[prop], index);
        } else {
          extended2[prop][index] = item;
        }
      });
    }
    for (; i < length; i++) {
      var obj = arguments[i];
      merge(obj);
    }
    return extended;
  }
  function getUniqueId(num) {
    num = num && !isNaN(num) ? num : 1e5;
    return Math.floor(Math.random() * num);
  }
  function clone(object) {
    return extend(true, {}, object);
  }
  function isObject(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function isArray(value) {
    return Object.prototype.toString.call(value) === "[object Array]";
  }
  function isString(value) {
    return typeof value === "string" || value instanceof String || Object.prototype.toString.call(value) === "[object String]";
  }
  function isNumber(value) {
    return typeof value === "number" && value === value && value !== Infinity && value !== -Infinity;
  }
  function formatPercentage(number, decimals = 0) {
    if (!isNumber(number)) {
      return "";
    }
    return (number * 100).toFixed(decimals) + "%";
  }
  function installUIComponent({ self, m_parentTag, m_props }) {
    return new Promise((resolve, reject) => {
      if (!m_parentTag) {
        console.error(`${self.constructor.name}() prop parentTag not passed in.`, m_props);
        reject();
      } else {
        ui.d.append(m_parentTag, self, m_props.installPrepend);
        resolve();
      }
    });
  }
};
ui.utils = new ui.class.Utilities();
ui.class.Button = class Button extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_imageList = [];
    let m_parentTag;
    let m_props;
    let m_buttonTag;
    let m_text = "";
    let m_enable = true;
    this.deselect = deselectBtn;
    this.enable = enable;
    this.getConfig = () => m_props;
    this.getId = () => m_props.id;
    this.getImageTagById = getImageTagById;
    this.getParentTag = () => m_parentTag;
    this.getTag = () => m_buttonTag;
    this.text = text;
    this.select = handleExternalSelect;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        const tagConfig = { ...m_props.tags.button };
        tagConfig.class = m_props.css.button;
        tagConfig.text = m_props.text;
        tagConfig.event = {
          click: handleClick,
          mouseenter: () => {
            mouseEnterOverButton();
            mouseEnterOverImage();
          },
          mouseleave: () => {
            mouseLeaveOverButton();
            mouseLeaveOverImage();
          }
        };
        m_buttonTag = ui.d.createTag(tagConfig);
        if (m_props.img) {
          insertGraphic(m_props.img);
        }
        self.classList.add(m_props.css.self);
        self.appendChild(m_buttonTag);
        setEnable();
        resolve();
      });
    }
    function insertGraphic() {
      if (Array.isArray(m_props.img)) {
        m_props.img.forEach((img) => {
          addImg(img);
        });
      } else {
        addImg(m_props.img);
      }
      function addImg(img) {
        img.css = img.css ? img.css : m_props.css.img;
        const tagConfig = {
          class: img.css,
          prop: img.prop,
          attr: img.attr
        };
        let imgTag = ui.d.createTag("img", tagConfig);
        m_imageList.push(imgTag);
        m_buttonTag.appendChild(imgTag);
      }
    }
    function getImageTagById(id) {
      return m_imageList.find((img) => img.id === id);
    }
    function handleClick(ev) {
      if (m_enable) {
        selectBtn();
        if (m_props.preventDefault) {
          ev.preventDefault();
        }
        if (m_props.stopPropagation) {
          ev.stopPropagation();
        }
        if (m_props.fnClick) {
          m_props.fnClick({
            Button: self,
            ev
          });
        }
        if (m_props.fnGroupClick) {
          m_props.fnGroupClick({
            Button: self,
            ev
          });
        }
      }
    }
    function mouseEnterOverImage() {
      if (m_props.img && Array.isArray(m_props.img)) {
        m_props.img.forEach((img, i) => {
          if (img.hover) {
            setSrcAttr(m_imageList[i], img.hover);
          }
        });
      } else if (m_props.img && m_props.img.hover) {
        ui.d.setAttr(m_imageList[0], { src: m_props.img.hover });
      }
    }
    function mouseLeaveOverImage() {
      if (m_props.img && Array.isArray(m_props.img)) {
        m_props.img.forEach((img, i) => {
          if (img.hover) {
            setSrcAttr(m_imageList[i], img.attr.src);
          }
        });
      } else if (m_props.img && m_props.img.hover) {
        ui.d.setAttr(m_imageList[0], { src: m_props.img.attr.src });
      }
    }
    function mouseEnterOverButton() {
      if (!ui.d.hasClass(m_buttonTag, m_props.css.selected)) {
        m_buttonTag.classList.add(m_props.css.hover);
      }
    }
    function mouseLeaveOverButton() {
      m_buttonTag.classList.remove(m_props.css.hover);
    }
    function setSrcAttr(tag, src) {
      ui.d.setAttr(tag, { src });
    }
    function handleExternalSelect(context) {
      if (m_enable) {
        if (context.notTrigger) {
          selectBtn();
        } else {
          m_buttonTag.click();
        }
      }
    }
    function selectBtn() {
      m_buttonTag.classList.add(m_props.css.selected);
    }
    function deselectBtn() {
      m_buttonTag.classList.remove(m_props.css.selected);
    }
    function text(text2) {
      if (!text2) {
        return m_text;
      } else {
        m_buttonTag.innerText = text2;
        m_text = text2;
      }
    }
    function enable(enable2) {
      m_enable = enable2;
      setEnable();
    }
    function setEnable() {
      m_buttonTag.classList.toggle(m_props.css.disabled, !m_enable);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Button: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          enable: true,
          preventDefault: true,
          stopPropagation: true,
          tag: "default",
          theme: "default"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "button" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "button" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        m_text = m_props.text;
        m_enable = m_props.enable;
        resolve();
      });
    }
  }
};
ui.button = (props) => new ui.class.Button(props);
customElements.define("mambo-button", ui.class.Button);
ui.class.ButtonGroup = class ButtonGroup extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_buttonsList = [];
    let m_parentTag;
    let m_props;
    let m_selectedButtonTag;
    this.deselect = deselect;
    this.destroy = destroyButtonGroup;
    this.getConfigById = getConfigById;
    this.getParentTag = () => self;
    this.getSelected = getSelected;
    this.getTag = getButtonTagById;
    this.select = selectBtn;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        const buttonPromises = [];
        m_props.buttons.forEach((button) => {
          buttonPromises.push(installButton(button));
        });
        Promise.all(buttonPromises).then(resolve);
      });
    }
    function deselect() {
      deselectBtns();
    }
    function deselectBtns() {
      m_buttonsList.forEach((button) => {
        button.deselect();
      });
      m_selectedButtonTag = null;
    }
    function installButton(button) {
      return new Promise((resolve) => {
        button.css = ui.utils.extend(true, m_props.css.button, button.css);
        button.fnGroupClick = m_props.fnGroupClick;
        button.parentTag = self;
        m_buttonsList.push(ui.button(button));
        resolve();
      });
    }
    function handleGroupBtnClick(context) {
      deselectBtns();
      if (m_props.fnClick) {
        m_props.fnClick(context);
      }
      context.Button.select({ notTrigger: true });
      m_selectedButtonTag = context.Button;
    }
    function selectBtn(context = {}) {
      let buttonTag = getTag(context.id);
      if (buttonTag) {
        buttonTag.select(context);
        m_selectedButtonTag = buttonTag;
      }
    }
    function getButtonTagById(context = {}) {
      return getTag(context.id);
    }
    function getTag(id) {
      return m_buttonsList.find((btn) => btn.getId() === id);
    }
    function getConfigById(context = {}) {
      return m_buttonsList.find((btn) => btn.getConfig().id === context.id);
    }
    function getSelected() {
      return m_selectedButtonTag;
    }
    function destroyButtonGroup() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ ButtonGroup: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          buttons: [],
          tag: "default",
          theme: "default",
          fnGroupClick: handleGroupBtnClick
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "buttonGroup" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "buttonGroup" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.buttonGroup = (props) => new ui.class.ButtonGroup(props);
customElements.define("mambo-button-group", ui.class.ButtonGroup);
ui.class.ButtonSVG = class ButtonSVG extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_imageList = [];
    let m_parentTag;
    let m_props;
    let m_buttonTag;
    let m_text = "";
    let m_enable = true;
    this.deselect = deselectBtn;
    this.enable = enable;
    this.getConfig = () => m_props;
    this.getId = () => m_props.id;
    this.getImageTagById = getImageTagById;
    this.getParentTag = () => m_parentTag;
    this.getTag = () => m_buttonTag;
    this.text = text;
    this.select = handleExternalSelect;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        const tagConfig = { ...m_props.tags.button };
        tagConfig.class = m_props.css.button;
        tagConfig.text = m_props.text;
        tagConfig.event = {
          click: handleClick,
          mouseenter: () => {
            mouseEnterOverButton();
            mouseEnterOverImage();
          },
          mouseleave: () => {
            mouseLeaveOverButton();
            mouseLeaveOverImage();
          }
        };
        m_buttonTag = ui.d.createTag(tagConfig);
        if (m_props.img) {
          insertGraphic(m_props.img, addImg);
        }
        if (m_props.svg) {
          insertGraphic(m_props.svg, addSVG);
        }
        self.classList.add(m_props.css.self);
        self.appendChild(m_buttonTag);
        resolve();
      });
    }
    function insertGraphic(graphic, func) {
      if (Array.isArray(graphic)) {
        graphic.forEach((graphic2) => {
          func(graphic2);
        });
      } else {
        func(graphic);
      }
    }
    function addImg(img) {
      img.css = img.css ? img.css : m_props.css.img;
      const tagConfig = {
        class: img.css.img,
        prop: img.prop,
        attr: img.attr
      };
      let imgTag = ui.d.createTag("img", tagConfig);
      m_imageList.push(imgTag);
      m_buttonTag.appendChild(imgTag);
    }
    function addSVG(svg) {
      svg.attr = ui.utils.extend(true, svg.element.attr, svg.attr);
      let children = [];
      svg.element.paths.forEach((path) => {
        children.push({
          name: "path",
          attrs: { d: path }
        });
      });
      const tagConfig = {
        prop: svg.prop,
        attr: svg.attr,
        children
      };
      let svgTag = ui.d.createSVGTag("svg", tagConfig);
      m_buttonTag.appendChild(svgTag);
    }
    function getImageTagById(id) {
      return m_imageList.find((img) => img.id === id);
    }
    function handleClick(ev) {
      if (m_enable) {
        selectBtn();
        if (m_props.preventDefault) {
          ev.preventDefault();
        }
        if (m_props.stopPropagation) {
          ev.stopPropagation();
        }
        if (m_props.fnClick) {
          m_props.fnClick({
            Button: self,
            ev
          });
        }
        if (m_props.fnGroupClick) {
          m_props.fnGroupClick({
            Button: self,
            ev
          });
        }
      }
    }
    function mouseEnterOverImage() {
      if (m_props.img && Array.isArray(m_props.img)) {
        m_props.img.forEach((img, i) => {
          if (img.hover) {
            setSrcAttr(m_imageList[i], img.hover);
          }
        });
      } else if (m_props.img && m_props.img.hover) {
        ui.d.setAttr(m_imageList[0], { src: m_props.img.hover });
      }
    }
    function mouseLeaveOverImage() {
      if (m_props.img && Array.isArray(m_props.img)) {
        m_props.img.forEach((img, i) => {
          if (img.hover) {
            setSrcAttr(m_imageList[i], img.attr.src);
          }
        });
      } else if (m_props.img && m_props.img.hover) {
        ui.d.setAttr(m_imageList[0], { src: m_props.img.attr.src });
      }
    }
    function mouseEnterOverButton() {
      if (!ui.d.hasClass(m_buttonTag, m_props.css.selected)) {
        m_buttonTag.classList.add(m_props.css.hover);
      }
    }
    function mouseLeaveOverButton() {
      m_buttonTag.classList.remove(m_props.css.hover);
    }
    function setSrcAttr(tag, src) {
      ui.d.setAttr(tag, { src });
    }
    function handleExternalSelect(context) {
      if (m_enable) {
        if (context.notTrigger) {
          selectBtn();
        } else {
          m_buttonTag.click();
        }
      }
    }
    function selectBtn() {
      m_buttonTag.classList.add(m_props.css.selected);
    }
    function deselectBtn() {
      m_buttonTag.classList.remove(m_props.css.selected);
    }
    function text(context) {
      if (!context) {
        return m_text;
      } else {
        m_buttonTag.innerText = context.text;
        m_text = context.text;
      }
    }
    function enable(enable2) {
      m_enable = enable2;
      setEnable();
    }
    function setEnable() {
      m_buttonTag.classList.toggle(m_props.css.disabled, !m_enable);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Button: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          enable: true,
          preventDefault: true,
          stopPropagation: true,
          tag: "default",
          theme: "default"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        m_text = m_props.text;
        m_enable = m_props.enable;
        const tags = ui.tags.getTags({ name: m_props.tag, component: "button" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "button" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.buttonSVG = (props) => new ui.class.ButtonSVG(props);
customElements.define("mambo-button-svg", ui.class.ButtonSVG);
ui.class.Calendar = class Calendar extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_headerButtonGroup;
    let m_headerButtonsList = [];
    let m_bodyTag;
    let m_bodyHeaderTag;
    let m_bodyContentTag;
    let m_datesHeaderGrid;
    let m_datesButtonGroup;
    let m_props;
    let m_idFormat = "YYYY/M/D";
    let m_value;
    let m_viewDate;
    let m_depths = { month: 0, year: 1, decade: 2, century: 3 };
    let m_depth = 0;
    let m_minDepth = 0;
    let m_minDate;
    let m_maxDate;
    this.destroy = destroyCalendar;
    this.getParentTag = () => self;
    this.navigateToFuture = navigateToFuture;
    this.navigateToPast = navigateToPast;
    this.navigateUp = navigateUp;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        setupHeader().then(setupBody).then(setupFooter).then(resolve);
      });
    }
    function setupHeader() {
      return new Promise((resolve) => {
        let buttonGroup = ui.utils.extend(true, {}, m_props.headerButtonGroup);
        buttonGroup.css = ui.utils.extend(true, m_props.css.headerButtonGroup, buttonGroup.css);
        buttonGroup.parentTag = self;
        buttonGroup.fnComplete = resolve;
        buttonGroup.buttons.forEach((button, index) => {
          button.fnComplete = (context) => {
            m_headerButtonsList[index] = context.Button;
            if (m_props.headerButtonGroup.buttons[index].fnComplete) {
              m_props.headerButtonGroup.buttons[index].fnComplete(context);
            }
          };
        });
        m_headerButtonGroup = ui.buttonGroup(buttonGroup);
      });
    }
    function setupBody() {
      return new Promise((resolve) => {
        m_bodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
        m_bodyHeaderTag = ui.d.createTag({ ...m_props.tags.bodyHeader, class: m_props.css.bodyHeader });
        m_bodyContentTag = ui.d.createTag({ ...m_props.tags.bodyContent, class: m_props.css.bodyContent });
        m_bodyTag.appendChild(m_bodyHeaderTag);
        m_bodyTag.appendChild(m_bodyContentTag);
        self.appendChild(m_bodyTag);
        setupBodyContent().then(resolve);
      });
    }
    function setupFooter() {
      return new Promise((resolve) => {
        if (m_props.footer) {
          const button = ui.utils.extend(true, {}, m_props.footerButton);
          button.css = ui.utils.extend(true, m_props.css.footerButton, button.css);
          button.parentTag = self;
          button.fnComplete = resolve;
          let today = ui.date.getToday();
          button.id = ui.date.format(today, m_idFormat);
          button.text = ui.date.format(today, m_props.footer);
          if (ui.date.isBefore(today, m_minDate) || ui.date.isAfter(today, m_maxDate)) {
            button.enable = false;
          }
          button.fnClick = (context) => {
            m_depth = m_minDepth;
            selectValue(context.Button, context.ev);
            if (m_props.footerButton.fnClick) {
              m_props.footerButton.fnClick(context);
            }
          };
          ui.button(button);
        }
      });
    }
    function navigate(number) {
      switch (m_depth) {
        case 0:
          ui.date.add(m_viewDate, number, "months");
          break;
        case 1:
          ui.date.add(m_viewDate, number, "years");
          break;
        case 2:
          ui.date.add(m_viewDate, number * 10, "years");
          break;
        case 3:
          ui.date.add(m_viewDate, number * 100, "years");
          break;
      }
      setupBodyContent();
    }
    function setupBodyContent() {
      return new Promise((resolve) => {
        m_bodyHeaderTag.innerHTML = null;
        m_bodyContentTag.innerHTML = null;
        switch (m_depth) {
          case 0:
            installDatesHeader();
            installDates().then(continueSetup);
            break;
          case 1:
            installMonths().then(continueSetup);
            break;
          case 2:
            installYears().then(continueSetup);
            break;
          case 3:
            installDecades().then(continueSetup);
            break;
        }
        function continueSetup() {
          setHeaderButtonsText();
          setHeaderButtonsEnabled();
          resolve();
        }
      });
    }
    function setHeaderButtonsEnabled() {
      m_headerButtonsList.forEach((button, index) => {
        if (m_props.headerButtonGroup.buttons[index].fnEnabled) {
          button.enable({
            enable: m_props.headerButtonGroup.buttons[index].fnEnabled()
          });
        }
      });
    }
    function canNavigateUp() {
      return m_depth < 3;
    }
    function canNavigatePast() {
      return !ui.date.isSameOrBefore(m_viewDate, m_minDate);
    }
    function canNavigateFuture() {
      let lastViewDate = ui.date.cloneDate(m_viewDate);
      switch (m_depth) {
        case 0:
          ui.date.endOf(lastViewDate, "month");
          break;
        case 1:
          ui.date.endOf(lastViewDate, "year");
          break;
        case 2:
          ui.date.endOf(lastViewDate, "decade");
          break;
        case 3:
          ui.date.endOf(lastViewDate, "century");
          break;
      }
      return !ui.date.isSameOrAfter(lastViewDate, m_maxDate);
    }
    function setHeaderButtonsText() {
      const i = m_props.headerButtonGroup.buttons.findIndex((button) => button.fnDynamicHeaderText);
      if (i) {
        m_props.headerButtonGroup.buttons[i].fnDynamicHeaderText(m_headerButtonsList[i]);
      }
    }
    function getDepthButtonText(button) {
      let textValue;
      switch (m_depth) {
        case 0:
          textValue = ui.date.format(m_viewDate, "MMMM YYYY");
          break;
        case 1:
          textValue = ui.date.format(m_viewDate, "YYYY");
          break;
        case 2:
          textValue = `${m_viewDate.getFullYear()}-${m_viewDate.getFullYear() + 9}`;
          break;
        default:
        case 3:
          textValue = `${m_viewDate.getFullYear()}-${m_viewDate.getFullYear() + 99}`;
      }
      button.text(textValue);
    }
    function installDatesHeader() {
      let grid = ui.utils.extend(true, {}, m_props.datesHeader);
      grid.css = ui.utils.extend(true, m_props.css.datesHeader, grid.css);
      grid.data = [];
      for (let i = 0; i < 7; i++) {
        let dayName = ui.date.getDayName(i);
        grid.data.push({
          Name: dayName,
          ShortName: dayName.substring(0, 1).toUpperCase()
        });
      }
      grid.parentTag = m_bodyHeaderTag;
      m_datesHeaderGrid = ui.grid(grid);
    }
    function installDates() {
      return new Promise((resolve) => {
        let buttonGroup = ui.utils.extend(true, {}, m_props.datesButtonGroup);
        buttonGroup.css = ui.utils.extend(true, m_props.css.datesButtonGroup, buttonGroup.css);
        buttonGroup.parentTag = m_bodyContentTag;
        buttonGroup.fnComplete = (context) => {
          if (m_props.datesButtonGroup?.fnComplete) {
            m_props.datesButtonGroup.fnComplete(context);
          }
          m_datesButtonGroup.select({
            id: ui.date.format(m_value, m_idFormat),
            notTrigger: true
          });
          resolve();
        };
        generateDates(buttonGroup);
        m_datesButtonGroup = ui.buttonGroup(buttonGroup);
      });
    }
    function generateDates(buttonGroup) {
      buttonGroup.buttons = [];
      let today = ui.date.getToday();
      let value2 = ui.date.cloneDate(m_viewDate);
      ui.date.startOf(value2, "week");
      for (let i = 0; i < 42; i++) {
        let button = {
          id: ui.date.format(value2, m_idFormat),
          text: value2.getDate(),
          attr: { title: ui.date.format(value2, "dddd, MMMM DD, YYYY") },
          fnClick: (context) => {
            buttonClick(context, m_props.datesButtonGroup);
          }
        };
        if (!isValidButton(value2)) {
          button.enable = false;
        } else if (ui.date.isSame(value2, today)) {
          button.css = { button: m_props.css.currentDate };
        } else if (value2.getMonth() !== m_viewDate.getMonth()) {
          button.css = { button: m_props.css.otherMonth };
        }
        buttonGroup.buttons.push(button);
        ui.date.add(value2, 1, "days");
      }
    }
    function installMonths() {
      return new Promise((resolve) => {
        let buttonGroup = ui.utils.extend(true, {}, m_props.monthsButtonGroup);
        buttonGroup.css = ui.utils.extend(true, m_props.css.monthsButtonGroup, buttonGroup.css);
        buttonGroup.parentTag = m_bodyContentTag;
        buttonGroup.fnComplete = (context) => {
          if (m_props.monthsButtonGroup?.fnComplete) {
            m_props.monthsButtonGroup.fnComplete(context);
          }
          let selectedMonth = ui.date.cloneDate(m_value);
          ui.date.startOf(selectedMonth, "month");
          m_datesButtonGroup.select({
            id: ui.date.format(selectedMonth, m_idFormat),
            notTrigger: true
          });
          resolve();
        };
        generateMonths(buttonGroup);
        m_datesButtonGroup = ui.buttonGroup(buttonGroup);
      });
    }
    function generateMonths(buttonGroup) {
      buttonGroup.buttons = [];
      let value2 = ui.date.cloneDate(m_viewDate);
      for (let i = 0; i < 12; i++) {
        let button = {
          id: ui.date.format(value2, m_idFormat),
          text: ui.date.format(value2, "MMM"),
          attr: { title: ui.date.format(value2, "MMMM") },
          fnClick: (context) => {
            buttonClick(context, m_props.monthsButtonGroup);
          }
        };
        if (!isValidButton(value2)) {
          button.enable = false;
        }
        buttonGroup.buttons.push(button);
        ui.date.add(value2, 1, "months");
      }
    }
    function installYears() {
      return new Promise((resolve) => {
        let buttonGroup = ui.utils.extend(true, {}, m_props.yearsButtonGroup);
        buttonGroup.css = ui.utils.extend(true, m_props.css.yearsButtonGroup, buttonGroup.css);
        buttonGroup.parentTag = m_bodyContentTag;
        buttonGroup.fnComplete = (context) => {
          if (m_props.yearsButtonGroup?.fnComplete) {
            m_props.yearsButtonGroup.fnComplete(context);
          }
          let selectedYear = ui.date.cloneDate(m_value);
          ui.date.startOf(selectedYear, "year");
          m_datesButtonGroup.select({
            id: ui.date.format(selectedYear, m_idFormat),
            notTrigger: true
          });
          resolve();
        };
        generateYears(buttonGroup);
        m_datesButtonGroup = ui.buttonGroup(buttonGroup);
      });
    }
    function generateYears(buttonGroup) {
      buttonGroup.buttons = [];
      let value2 = ui.date.cloneDate(m_viewDate);
      ui.date.add(value2, -1, "years");
      for (let i = 0; i < 12; i++) {
        let button = {
          id: ui.date.format(value2, m_idFormat),
          text: ui.date.format(value2, "YYYY"),
          fnClick: (context) => {
            buttonClick(context, m_props.yearsButtonGroup);
          }
        };
        if (!isValidButton(value2)) {
          button.enable = false;
        } else if (i === 0 || i === 11) {
          button.css = { button: m_props.css.otherDecade };
        }
        buttonGroup.buttons.push(button);
        ui.date.add(value2, 1, "years");
      }
    }
    function installDecades() {
      return new Promise((resolve) => {
        let buttonGroup = ui.utils.extend(true, {}, m_props.decadesButtonGroup);
        buttonGroup.css = ui.utils.extend(true, m_props.css.decadesButtonGroup, buttonGroup.css);
        buttonGroup.parentTag = m_bodyContentTag;
        buttonGroup.fnComplete = (context) => {
          if (m_props.decadesButtonGroup?.fnComplete) {
            m_props.decadesButtonGroup.fnComplete(context);
          }
          let selectedDecade = ui.date.cloneDate(m_value);
          ui.date.startOf(selectedDecade, "decade");
          m_datesButtonGroup.select({
            id: ui.date.format(selectedDecade, m_idFormat),
            notTrigger: true
          });
          resolve();
        };
        generateDecades(buttonGroup);
        m_datesButtonGroup = ui.buttonGroup(buttonGroup);
      });
    }
    function generateDecades(buttonGroup) {
      buttonGroup.buttons = [];
      let value2 = ui.date.cloneDate(m_viewDate);
      ui.date.add(value2, -10, "years");
      for (let i = 0; i < 12; i++) {
        let button = {
          id: ui.date.format(value2, m_idFormat),
          text: `${value2.getFullYear()}-${value2.getFullYear() + 9}`,
          fnClick: (context) => {
            buttonClick(context, m_props.decadesButtonGroup);
          }
        };
        if (!isValidButton(value2)) {
          button.enable = false;
        } else if (i === 0 || i === 11) {
          button.css = { button: m_props.css.otherCentury };
        }
        buttonGroup.buttons.push(button);
        ui.date.add(value2, 10, "years");
      }
    }
    function isValidButton(value2) {
      return !ui.date.isBefore(value2, m_minDate) && !ui.date.isAfter(value2, m_maxDate);
    }
    function buttonClick(context, buttonGroup) {
      selectValue(context.Button, context.ev);
      if (buttonGroup?.fnClick) {
        buttonGroup.fnClick(context);
      }
    }
    function selectValue(button, ev) {
      let value2 = ui.date.createDate(button.getId(), m_idFormat);
      if (m_depth <= m_minDepth) {
        setValue(value2);
        if (m_props.fnSelect) {
          m_props.fnSelect({ Calendar: self, ev });
        }
      } else {
        --m_depth;
        setViewDate(value2);
        setupBodyContent();
      }
      setHeaderButtonsEnabled();
    }
    function getDefaultValue() {
      let optionValue = m_props.value ? ui.date.getDate(m_props.value, m_props.format) : null;
      optionValue = optionValue ? optionValue : ui.date.getToday();
      return getInRangeDate(optionValue);
    }
    function getInRangeDate(value2) {
      if (!ui.date.isDate(value2)) {
        return null;
      }
      if (ui.date.isBefore(value2, m_minDate)) {
        return ui.date.cloneDate(m_minDate);
      } else if (ui.date.isAfter(value2, m_maxDate)) {
        return ui.date.cloneDate(m_maxDate);
      }
      return ui.date.cloneDate(value2);
    }
    function setValue(value2) {
      m_value = getInRangeDate(value2);
      m_depth = m_minDepth;
      setViewDate(m_value);
      setupBodyContent();
    }
    function setViewDate(value2) {
      m_viewDate = value2 ? ui.date.cloneDate(value2) : ui.date.getToday();
      switch (m_depth) {
        case 0:
          ui.date.startOf(m_viewDate, "month");
          break;
        case 1:
          ui.date.startOf(m_viewDate, "year");
          break;
        case 2:
          ui.date.startOf(m_viewDate, "decade");
          break;
        case 3:
          ui.date.startOf(m_viewDate, "century");
          break;
      }
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_value;
      } else {
        setValue(ui.date.getDate(context.value, m_props.format));
      }
    }
    function navigateToPast() {
      navigate(-1);
    }
    function navigateToFuture() {
      navigate(1);
    }
    function navigateUp() {
      if (canNavigateUp()) {
        ++m_depth;
        setViewDate(m_value);
        setupBodyContent();
      }
    }
    function destroyCalendar() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Calendar: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          theme: "default",
          tag: "default",
          headerButtonGroup: {
            buttons: [
              {
                css: {
                  button: "m-prev-button",
                  disabled: "m-calendar-header-button-disabled"
                },
                fnClick: navigateToPast,
                fnEnabled: canNavigatePast
              },
              {
                css: {
                  button: "m-fast-button",
                  disabled: "m-calendar-header-button-disabled"
                },
                fnClick: navigateUp,
                fnEnabled: canNavigateUp,
                fnDynamicHeaderText: getDepthButtonText
              },
              {
                css: {
                  button: "m-next-button",
                  disabled: "m-calendar-header-button-disabled"
                },
                fnClick: navigateToFuture,
                fnEnabled: canNavigateFuture
              }
            ]
          },
          datesHeader: {
            layout: "tile",
            tileHTML: "<span title='{Name}'>{ShortName}</span>"
          },
          format: "M/D/YYYY",
          footer: "dddd, MMMM D, YYYY",
          start: "month",
          depth: "month",
          min: new Date(1900, 0, 1),
          max: new Date(2099, 11, 31)
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        m_depth = typeof m_depths[m_props.start] !== "undefined" ? m_depths[m_props.start] : 0;
        m_minDepth = typeof m_depths[m_props.depth] !== "undefined" ? m_depths[m_props.depth] : 0;
        m_minDepth = m_minDepth > m_depth ? m_depth : m_minDepth;
        m_minDate = ui.date.getDate(m_props.min, m_props.format);
        m_maxDate = ui.date.getDate(m_props.max, m_props.format);
        m_value = getDefaultValue();
        setViewDate(m_value);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "calendar" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "calendar" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.calendar = (props) => new ui.class.Calendar(props);
customElements.define("mambo-calendar", ui.class.Calendar);
ui.class.CheckboxRadio = class CheckboxRadio extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_checkboxLabelParentTag;
    let m_checkboxInputTag;
    let m_checkboxRadioSpanTag;
    let m_props;
    let m_type = 1;
    let m_enable = true;
    let m_checked = false;
    this.destroy = destroyCheckboxRadio;
    this.enable = enable;
    this.getId = () => m_props.id;
    this.getParentTag = () => m_checkboxLabelParentTag;
    this.isCheckbox = isCheckbox;
    this.isRadio = isRadio;
    this.select = select;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_checkboxLabelParentTag = ui.d.createTag({ ...m_props.tags.label, class: m_props.css.radioParent });
        let textTag = ui.d.createTag({
          ...m_props.tags.radioText,
          class: m_props.css.radioText,
          text: m_props.text
        });
        m_type = m_props.attr.type === "checkbox" ? 1 : 2;
        let css = m_type === 1 ? m_props.css.checkbox : m_props.css.radio;
        const tagConfig = {
          ...m_props.tags.inputTag,
          class: css.input,
          text: m_props.value,
          event: {
            click: handleClick
          }
        };
        tagConfig.attr.name = Math.random().toString(36).slice(2);
        m_checkboxInputTag = ui.d.createTag(tagConfig);
        m_checkboxRadioSpanTag = ui.d.createTag({ ...m_props.tags.radioSpanTag, class: css.span });
        m_checkboxLabelParentTag.appendChild(textTag);
        m_checkboxLabelParentTag.appendChild(m_checkboxInputTag);
        m_checkboxLabelParentTag.appendChild(m_checkboxRadioSpanTag);
        m_checked = m_props.prop?.checked;
        setEnable();
        self.classList.add(m_props.css.self);
        self.appendChild(m_checkboxLabelParentTag);
        resolve();
      });
    }
    function handleClick(ev) {
      if (m_enable) {
        switch (m_type) {
          case 1:
            m_checked = !m_checked;
            break;
          case 2:
            m_checked = true;
            break;
        }
        if (m_props.fnClick) {
          m_props.fnClick({ CheckboxRadio: self, ev });
        }
        if (m_props.fnGroupClick) {
          m_props.fnGroupClick({ CheckboxRadio: self, ev });
        }
      } else {
        ev.preventDefault();
      }
    }
    function select(context = {}) {
      if (typeof context.value === "undefined") {
        return m_checked;
      } else {
        checkInput(context.value, context.notTrigger);
      }
    }
    function checkInput(value2, notTrigger) {
      if (m_enable) {
        if (notTrigger || m_type === 2) {
          m_checked = value2;
          ui.d.setProps(m_checkboxInputTag, { checked: m_checked });
        } else {
          m_checkboxInputTag.click();
        }
      }
    }
    function enable({ enable: enable2 }) {
      if (!enable2) {
        return m_enable;
      } else {
        m_enable = enable2;
        setEnable();
      }
    }
    function setEnable() {
      m_checkboxLabelParentTag.classList.toggle(m_props.css.disabled, !m_enable);
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_checkboxInputTag.value;
      } else {
        m_checkboxInputTag.value = context.value;
      }
    }
    function isCheckbox() {
      return m_type === 1;
    }
    function isRadio() {
      return m_type === 2;
    }
    function destroyCheckboxRadio() {
      ui.d.remove(m_checkboxLabelParentTag);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ CheckboxRadio: self });
      }
    }
    function configure(customProps = {}) {
      m_props = {
        tag: "default",
        theme: "default",
        enable: true
      };
      m_props = ui.utils.extend(true, m_props, customProps);
      m_parentTag = ui.d.getTag(m_props.parentTag);
      m_enable = m_props.enable;
      const tags = ui.tags.getTags({ name: m_props.tag, component: "checkboxRadio" });
      m_props.tags = ui.utils.extend(true, tags, m_props.tags);
      const css = ui.theme.getTheme({ name: m_props.theme, component: "checkboxRadio" });
      m_props.css = ui.utils.extend(true, css, m_props.css);
    }
  }
};
ui.checkboxRadio = (props) => new ui.class.CheckboxRadio(props);
customElements.define("mambo-checkbox-radio", ui.class.CheckboxRadio);
ui.class.CheckboxRadioGroup = class CheckboxRadioGroup extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_checkboxRadiosList = [];
    let m_parentTag;
    let m_props;
    this.clear = clear;
    this.destroy = destroyCheckboxRadioGroup;
    this.getParentTag = () => self;
    this.getTag = getTagById;
    this.select = select;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        if (m_props.checkboxes) {
          m_props.checkboxes.forEach(setupCheckbox);
        }
        if (m_props.radios) {
          m_props.radios.forEach(setupRadio);
        }
        resolve();
      });
    }
    function setupCheckbox(checkbox) {
      setupTag(checkbox, "checkbox");
    }
    function setupRadio(radio) {
      setupTag(radio, "radio");
    }
    function setupTag(tag, type) {
      const attr = {
        type,
        name: m_props.name
      };
      tag.css = ui.utils.extend(true, m_props.css[type], tag.css);
      tag.attr = ui.utils.extend(true, attr, tag.attr);
      tag.fnGroupClick = handleGroupClick;
      tag.parentTag = self;
      m_checkboxRadiosList.push(ui.checkboxRadio(tag));
    }
    function handleGroupClick(context) {
      if (context.CheckboxRadio.isRadio()) {
        selectTag(context.CheckboxRadio, true);
      }
      if (m_props.fnClick) {
        m_props.fnClick(context);
      }
      if (m_props.fnGroupClick) {
        m_props.fnGroupClick({
          CheckboxRadioGroup: self,
          CheckboxRadio: context.CheckboxRadio,
          ev: context.ev
        });
      }
    }
    function getTag(id) {
      return m_checkboxRadiosList.find((tag) => tag.getId() === id);
    }
    function getSelected() {
      return m_checkboxRadiosList.filter((tag) => tag.select());
    }
    function selectTag(tag, notTrigger) {
      if (tag) {
        if (tag.isCheckbox()) {
          tag.select({ value: true, notTrigger });
        }
        if (tag.isRadio()) {
          deselectRadios();
          tag.select({ value: true, notTrigger });
        }
      }
    }
    function deselectRadios() {
      m_checkboxRadiosList.forEach((tag) => {
        if (tag.isRadio()) {
          tag.select({ value: false, notTrigger: true });
        }
      });
    }
    function getTagById(context = {}) {
      return getTag(context.id);
    }
    function clear() {
      m_checkboxRadiosList.forEach((tag) => {
        tag.select({ value: false, notTrigger: true });
      });
    }
    function select(context = {}) {
      if (!context.id) {
        return getSelected();
      } else {
        if (Array.isArray(context.id)) {
          context.id.forEach((id) => {
            selectTag(getTag(id), context.notTrigger);
          });
        } else {
          selectTag(getTag(context.id), context.notTrigger);
        }
      }
    }
    function destroyCheckboxRadioGroup() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ CheckboxRadioGroup: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          name: Math.random().toString(36).slice(2),
          checkboxes: [],
          radios: []
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "checkboxRadioGroup" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "checkboxRadioGroup" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.checkboxRadioGroup = (props) => new ui.class.CheckboxRadioGroup(props);
customElements.define("mambo-checkbox-radio-group", ui.class.CheckboxRadioGroup);
ui.class.Combobox = class Combobox extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_input;
    let m_dropdownWrapperTag;
    let m_dropdown;
    let m_buttonGroup;
    let m_props;
    let m_comboBoxData;
    let m_value = "";
    let m_previous_text = "";
    this.destroy = destroyComboBox;
    this.getParentTag = () => self;
    this.getSelected = () => m_buttonGroup.getSelected();
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      await setupInput();
      await setupDropdown();
      setupComplete();
    }
    async function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        resolve();
      });
    }
    function setupInput() {
      return new Promise((resolve) => {
        let input = ui.utils.extend(true, {}, m_props.input);
        input.css = ui.utils.extend(true, m_props.css.input, input.css);
        input.parentTag = self;
        m_input = ui.input(input);
        resolve();
      });
    }
    function setupDropdown() {
      return new Promise((resolve) => {
        m_dropdownWrapperTag = ui.d.createTag({ ...m_props.tags.wrapper, class: m_props.css.wrapper });
        self.appendChild(m_dropdownWrapperTag);
        let dropdown = ui.utils.extend(true, {}, m_props.dropdown);
        dropdown.css = ui.utils.extend(true, m_props.css.dropdown, dropdown.css);
        dropdown.fnBeforeClose = (context) => {
          const result = m_props.dropdown.fnBeforeClose ? m_props.dropdown.fnBeforeClose(context) : true;
          return (!context.ev || !m_input.getTag().contains(context.ev.target)) && result;
        };
        dropdown.fnComplete = (context) => {
          installButtonGroup(context.Dropdown, m_comboBoxData);
          if (m_props.dropdown.fnComplete) {
            m_props.dropdown.fnComplete(context);
          }
        };
        dropdown.parentTag = m_dropdownWrapperTag;
        m_dropdown = ui.dropdown(dropdown);
        resolve();
      });
    }
    function installButtonGroup(dropdown, data) {
      const contentTag = dropdown.getContentTag();
      contentTag.innerHTML = null;
      let buttonGroup = ui.utils.extend(true, {}, m_props.buttonGroup);
      buttonGroup.parentTag = contentTag;
      buttonGroup.css = ui.utils.extend(true, m_props.css.buttonGroup, buttonGroup.css);
      buttonGroup.buttons = data.map(processItemData);
      buttonGroup.fnClick = (context) => {
        let text = context.Button.text();
        m_input.value({ value: text });
        m_previous_text = text;
        m_value = context.Button.getId();
        dropdown.close();
        if (m_props.fnSelect) {
          m_props.fnSelect({
            Combobox: self,
            button: context.Button,
            ev: context.ev
          });
        }
        if (m_props.buttonGroup.fnClick) {
          m_props.buttonGroup.fnClick(context);
        }
      };
      m_buttonGroup = ui.buttonGroup(buttonGroup);
      if (m_props.value) {
        setValue(m_props.value);
      }
    }
    function processItemData(itemData) {
      return {
        id: getItemDataId(itemData),
        text: getItemDataText(itemData)
      };
    }
    function filterItems() {
      if (m_props.filter) {
        const data = ui.string.filterArray(m_comboBoxData, m_input.value(), getItemDataText, "contains");
        installButtonGroup(m_dropdown, data);
      }
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_value;
      } else {
        setValue(context.value, context.ev);
      }
    }
    function setValue(value2, ev) {
      m_input.value({ value: value2 });
      const item = ui.string.findInArray(m_comboBoxData, value2, getItemDataText, "equals");
      if (item) {
        m_buttonGroup.getTag({ id: getItemDataId(item) }).select();
      } else {
        m_previous_text = value2;
        m_value = value2;
        if (m_props.fnSelect) {
          m_props.fnSelect({ Combobox: self, ev });
        }
      }
    }
    function getItemDataId(itemData) {
      return typeof itemData === "string" ? itemData : itemData[m_props.idField];
    }
    function getItemDataText(itemData) {
      return typeof itemData === "string" ? itemData : itemData[m_props.textField];
    }
    function handleKeyUp() {
      filterItems();
      m_buttonGroup.deselect();
      m_dropdown.open();
    }
    function handleBlur(ev) {
      if (!m_buttonGroup.getSelected() && m_previous_text !== m_input.value()) {
        setValue(m_input.value(), ev);
      }
    }
    function destroyComboBox() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Combobox: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          input: {
            events: [
              {
                name: "keyup",
                fn: () => {
                  handleKeyUp();
                }
              },
              {
                name: "blur",
                fn: (context) => {
                  handleBlur(context.ev);
                }
              }
            ]
          },
          dropdown: {
            button: {
              text: ""
            }
          },
          buttonGroup: {},
          idField: "id",
          textField: "text",
          filter: true,
          value: ""
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        m_comboBoxData = props.data;
        const tags = ui.tags.getTags({ name: m_props.tag, component: "combobox" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "combobox" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.combobox = (props) => new ui.class.Combobox(props);
customElements.define("mambo-combobox", ui.class.Combobox);
ui.class.DatePicker = class DatePicker extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_input;
    let m_dropdownWrapperTag;
    let m_dropdown;
    let m_calendar;
    let m_props;
    let m_value = null;
    let m_previous_text = "";
    this.destroy = destroyDatePicker;
    this.getParentTag = () => self;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        setupInput().then(setupDropdown).then(resolve);
      });
    }
    function setupInput() {
      return new Promise((resolve) => {
        let input = ui.utils.extend(true, {}, m_props.input);
        input.css = ui.utils.extend(true, m_props.css.input, input.css);
        input.parentTag = self;
        m_input = ui.input(input);
        resolve();
      });
    }
    function setupDropdown() {
      return new Promise((resolve) => {
        m_dropdownWrapperTag = ui.d.createTag({ ...m_props.tags.wrapper, class: m_props.css.dropdownWrapper });
        self.appendChild(m_dropdownWrapperTag);
        let dropdown = ui.utils.extend(true, {}, m_props.dropdown);
        dropdown.css = ui.utils.extend(true, m_props.css.dropdown, dropdown.css);
        dropdown.fnBeforeClose = (context) => {
          const result = m_props.dropdown?.fnBeforeClose ? m_props.dropdown.fnBeforeClose(context) : true;
          return (!context.ev || !m_input.getTag().contains(context.ev.target)) && result;
        };
        dropdown.fnComplete = (context) => {
          installCalendar(context.Dropdown);
          if (m_props.dropdown?.fnComplete) {
            m_props.dropdown.fnComplete(context);
          }
        };
        dropdown.parentTag = m_dropdownWrapperTag;
        m_dropdown = ui.dropdown(dropdown);
        resolve();
      });
    }
    function installCalendar(dropdown) {
      const contentTag = dropdown.getContentTag();
      contentTag.innerHTML = null;
      let calendar = ui.utils.extend(true, {}, m_props.calendar);
      calendar.css = ui.utils.extend(true, m_props.css.calendar, calendar.css);
      calendar.format = m_props.format;
      calendar.footer = m_props.footer;
      calendar.start = m_props.start;
      calendar.depth = m_props.depth;
      calendar.min = m_props.min;
      calendar.max = m_props.max;
      calendar.fnSelect = (context) => {
        m_value = context.Calendar.value();
        let text = ui.date.format(m_value, m_props.format);
        m_input.value({ value: text });
        m_previous_text = text;
        dropdown.close();
        if (m_props.calendar.fnSelect) {
          m_props.calendar.fnSelect(context);
        }
        if (m_props.fnSelect) {
          m_props.fnSelect({ DatePicker: self, ev: context.ev });
        }
      };
      calendar.parentTag = contentTag;
      m_calendar = ui.calendar(calendar);
      if (m_props.value) {
        setValue(m_props.value);
      }
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_value;
      } else {
        setValue(context.value);
      }
    }
    function setValue(value2) {
      let date = ui.date.getDate(value2, m_props.format);
      m_calendar.value({ value: date });
      m_value = m_calendar.value();
      let text = ui.date.format(m_value, m_props.format);
      m_input.value({ value: text });
      m_previous_text = text;
    }
    function handleBlur(ev) {
      let text = m_input.value();
      if (m_previous_text !== text) {
        setValue(text);
        if (m_props.fnSelect) {
          m_props.fnSelect({ DatePicker: self, ev });
        }
      }
    }
    function destroyDatePicker() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ DatePicker: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          theme: "default",
          tag: "default",
          input: {
            events: [
              {
                name: "blur",
                fn: (context) => {
                  handleBlur(context.ev);
                }
              }
            ]
          },
          calendar: {},
          format: "M/D/YYYY",
          value: null,
          footer: "dddd, MMMM D, YYYY",
          start: "month",
          depth: "month",
          min: new Date(1900, 0, 1),
          max: new Date(2099, 11, 31)
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "datePicker" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "datePicker" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.datePicker = (props) => new ui.class.DatePicker(props);
customElements.define("mambo-date-picker", ui.class.DatePicker);
ui.class.Dialog = class Dialog extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_props;
    let m_parentTag;
    let m_dialogHdrTag;
    let m_dialogBodyTag;
    this.close = closeDialog;
    this.getParentTag = () => self;
    this.getBodyTag = () => m_dialogBodyTag;
    this.getHeaderTag = () => m_dialogHdrTag;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_dialogBodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
        const dialogHdrLeft = ui.d.createTag({ ...m_props.tags.headerLeft, class: m_props.css.headerLeft });
        if (m_props.closeButton) {
          installCloseButton(dialogHdrLeft);
        }
        const overlayHdrCenter = ui.d.createTag({ ...m_props.tags.headerCenter, class: m_props.css.headerCenter });
        if (m_props.title) {
          const h3Tag = ui.d.createTag({
            ...m_props.tags.headerTitle,
            class: m_props.css.headerTitle,
            text: m_props.title
          });
          overlayHdrCenter.appendChild(h3Tag);
        } else {
          overlayHdrCenter.appendChild(m_props.hdrHtml);
        }
        const overlayHdrRight = ui.d.createTag({ ...m_props.tags.headerRight, class: m_props.css.headerRight });
        m_dialogHdrTag = ui.d.createTag({ ...m_props.tags.header, class: m_props.css.header });
        m_dialogHdrTag.appendChild(dialogHdrLeft);
        m_dialogHdrTag.appendChild(overlayHdrCenter);
        m_dialogHdrTag.appendChild(overlayHdrRight);
        self.classList.add(m_props.css.self);
        self.appendChild(m_dialogHdrTag);
        self.appendChild(m_dialogBodyTag);
        resolve();
      });
    }
    function installCloseButton(headerLeftTag) {
      const btnConfig = {
        parentTag: headerLeftTag,
        text: m_props.closeText,
        css: {
          button: m_props.css.headerCloseButton
        },
        attr: {
          type: "button"
        },
        fnClick: () => {
          if (m_props.fnClose) {
            m_props.fnClose({ dialog: self });
          } else {
            close();
          }
        }
      };
      ui.button(btnConfig);
    }
    function closeDialog() {
      close();
    }
    function close() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Dialog: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          parentTag: "body",
          closeButton: true,
          closeText: "close",
          theme: "default",
          tag: "default"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "dialog" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "dialog" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.dialog = (props) => new ui.class.Dialog(props);
customElements.define("mambo-dialog", ui.class.Dialog);
ui.class.DragDrop = class DragDrop extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_props;
    this.destroy = destroyDragDrop;
    this.getParentTag = () => self;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        let imgTag = ui.d.createTag({ name: "i", class: m_props.css.dropIcon });
        let textTag = ui.d.createTag({
          ...m_props.tags.dropText,
          class: m_props.css.dropText,
          text: m_props.dropText
        });
        self.classList.add(m_props.css.self);
        self.appendChild(imgTag);
        self.appendChild(textTag);
        setupEventListener().then(resolve);
      });
    }
    function setupEventListener() {
      return new Promise((resolve) => {
        self.addEventListener("drop", handleDrop);
        self.addEventListener("dragover", handleDragover);
        self.addEventListener("mouseenter", handleMouseEnterLeave);
        self.addEventListener("mouseleave", handleMouseEnterLeave);
        resolve();
      });
    }
    function handleMouseEnterLeave(ev) {
      if (m_props.fnMouseenterMouseleave) {
        m_props.fnMouseenterMouseleave({ ev });
      }
    }
    function handleDragover(ev) {
      ev.preventDefault();
      if (m_props.fnDragover) {
        m_props.fnDragover({ ev });
      }
    }
    function handleDrop(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (!m_props.fnDrop) {
        return;
      }
      let items = ev.dataTransfer.items;
      if (!items || items.length === 0) {
        m_props.fnDrop({ error: "No items dropped", dataTransfer: {} });
        return;
      }
      if (m_props.maxFileCount && items.length > m_props.maxFileCount) {
        m_props.fnDrop({ error: "maxFileCount", dataTransfer: {} });
        return;
      }
      for (let i = 0; i < items.length; i++) {
        if (!checkFileKindAllowed(items[i].type)) {
          console.error("DragDrop: one or more file formats are not allowed.");
          return;
        }
      }
      m_props.fnDrop({ dataTransfer: ev.dataTransfer, ev });
    }
    function checkFileKindAllowed(type) {
      let valid = true;
      if (m_props.allowKind && Array.isArray(m_props.allowKind)) {
        m_props.allowKind.some((allowedKind) => {
          if (allowedKind !== type) {
            valid = false;
            return true;
          }
        });
      }
      return valid;
    }
    function destroyDragDrop() {
      m_parentTag.removeChild(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Button: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          dropText: "Drop Here",
          hidden: false,
          maxFileCount: null,
          tag: "default",
          theme: "default"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "dragDrop" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "dragDrop" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.dragDrop = (props) => new ui.class.DragDrop(props);
customElements.define("mambo-dragdrop", ui.class.DragDrop);
ui.class.Draggable = class Draggable extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_draggableTag;
    let m_props;
    let m_enable = true;
    let m_active = false;
    let m_axis;
    let m_initialX;
    let m_initialY;
    let m_xOffset;
    let m_yOffset;
    let m_bounding = null;
    this.destroy = destroyDraggable;
    this.enable = enable;
    this.getParentTag = () => m_draggableTag;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_draggableTag = ui.d.createTag({ ...m_props.tags.draggable, class: m_props.css.draggable });
        setEnable(m_enable);
        self.classList.add(m_props.css.self);
        self.appendChild(m_draggableTag);
        setupEventHandler().then(resolve);
      });
    }
    function setupEventHandler() {
      return new Promise((resolve) => {
        document.addEventListener("touchstart", dragStart, false);
        document.addEventListener("mousedown", dragStart, false);
        document.addEventListener("touchmove", drag, false);
        document.addEventListener("mousemove", drag, false);
        document.addEventListener("touchend", dragEnd, false);
        document.addEventListener("mouseup", dragEnd, false);
        resolve();
      });
    }
    function dragStart(ev) {
      if (m_enable) {
        const boundingTag = m_props.containerTag ? ui.d.getTag(m_props.containerTag) : null;
        m_bounding = boundingTag ? boundingTag.getBoundingClientRect() : null;
        m_xOffset = m_draggableTag.offsetLeft;
        m_yOffset = m_draggableTag.offsetTop;
        let m_initialCenter = [];
        if (ev.type === "touchstart") {
          m_initialX = ev.touches[0].clientX;
          m_initialY = ev.touches[0].clientY;
        } else {
          m_initialX = ev.clientX;
          m_initialY = ev.clientY;
        }
        if (ev.target === m_draggableTag) {
          m_active = true;
        }
        if (m_active && m_props.fnDragStart) {
          m_props.fnDragStart({ Draggable: self, ev });
        }
      }
    }
    function dragEnd(ev) {
      if (m_enable) {
        if (m_active && m_props.fnDragEnd) {
          m_props.fnDragEnd({ Draggable: self, ev });
        }
        m_active = false;
      }
    }
    function drag(ev) {
      if (m_enable && m_active) {
        ev.preventDefault();
        let mouseEvent = ev.type === "touchmove" ? ev.touches[0] : ev;
        let clientX = mouseEvent.clientX;
        let clientY = mouseEvent.clientY;
        if (m_bounding) {
          clientX = Math.max(m_bounding.left, Math.min(clientX, m_bounding.right));
          clientY = Math.max(m_bounding.top, Math.min(clientY, m_bounding.bottom));
        }
        let currentX = m_axis !== 1 ? clientX - m_initialX : 0;
        let currentY = m_axis !== 0 ? clientY - m_initialY : 0;
        if (Array.isArray(m_props.grid) && m_props.grid.length === 2) {
          if (m_bounding) {
            currentX = getAxisStep(currentX, m_props.grid[0], m_bounding.left - m_initialX, m_bounding.right - m_initialX);
            currentY = getAxisStep(currentY, m_props.grid[1], m_bounding.top - m_initialY, m_bounding.bottom - m_initialY);
          } else {
            currentX = getAxisStep(currentX, m_props.grid[0]);
            currentY = getAxisStep(currentY, m_props.grid[1]);
          }
        }
        setPosition(currentX, currentY);
        if (m_props.fnDrag && (currentX !== 0 || currentY !== 0)) {
          m_props.fnDrag({ Draggable: self, ev });
        }
      }
    }
    function getAxisStep(current, step, min = null, max = null) {
      if (current !== 0) {
        if (step === 0) {
          return 0;
        } else {
          let value = Math.round(current / step);
          if (max !== null && value * step > max) {
            return (value - 1) * step;
          }
          if (min !== null && value * step < min) {
            return (value + 1) * step;
          }
          return value * step;
        }
      }
    }
    function setPosition(xPos, yPos) {
      m_draggableTag.style.left = m_xOffset + xPos + "px";
      m_draggableTag.style.top = m_yOffset + yPos + "px";
    }
    function enable(enable2) {
      m_enable = enable2;
      setEnable();
    }
    function setEnable(enable2) {
      m_enable = enable2;
    }
    function destroyDraggable() {
      ui.d.remove(m_draggableTag);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Draggable: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          enable: true
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        m_enable = m_props.enable;
        m_axis = m_props.axis === "x" ? 0 : m_props.axis === "y" ? 1 : null;
        const tags = ui.tags.getTags({ name: m_props.tag, component: "draggable" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "draggable" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.draggable = (props) => new ui.class.Draggable(props);
customElements.define("mambo-draggable", ui.class.Draggable);
ui.class.Dropdown = class Dropdown extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_dropdownContainerTag;
    let m_props;
    let m_open = false;
    this.close = close;
    this.destroy = destroyDropdown;
    this.getContentTag = () => m_dropdownContainerTag;
    this.getParentTag = () => self;
    this.open = open;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        setupOpenButton().then(setupContainer).then(setupEventHandler).then(resolve);
      });
    }
    function setupOpenButton() {
      return new Promise((resolve) => {
        if (m_props.disableButton) {
          resolve();
          return;
        }
        let button = ui.utils.extend(true, {}, m_props.button);
        button.css = ui.utils.extend(true, m_props.css.button, button.css);
        button.parentTag = self;
        button.fnComplete = resolve;
        button.fnClick = (context) => {
          if (m_props.button?.fnClick) {
            m_props.button.fnClick(context);
          } else {
            if (m_open) {
              closeAnimation(context.ev);
            } else {
              openAnimation();
            }
          }
        };
        ui.button(button);
      });
    }
    function setupContainer() {
      return new Promise((resolve) => {
        m_dropdownContainerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        self.appendChild(m_dropdownContainerTag);
        resolve();
      });
    }
    function setupEventHandler() {
      return new Promise((resolve) => {
        window.addEventListener("click", function(ev) {
          if (m_open && !m_dropdownContainerTag.contains(ev.target)) {
            closeAnimation(ev);
          }
        });
        resolve();
      });
    }
    function open() {
      openAnimation();
    }
    function openAnimation() {
      m_dropdownContainerTag.classList.add(m_props.css.open);
      m_open = true;
      if (m_props.fnOpen) {
        m_props.fnOpen({ dropdown: self });
      }
    }
    function close(context = {}) {
      closeAnimation(context.ev);
    }
    function closeAnimation(ev) {
      if (m_props.fnBeforeClose && !m_props.fnBeforeClose({ ev })) {
        return;
      }
      m_dropdownContainerTag.classList.remove(m_props.css.open);
      m_open = false;
      if (m_props.fnClose) {
        m_props.fnClose({ dropdown: self });
      }
    }
    function destroyDropdown() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Dropdown: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          fnBeforeClose: (context) => {
            return true;
          }
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "dropdown" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "dropdown" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.dropdown = (props) => new ui.class.Dropdown(props);
customElements.define("dropdown-combobox", ui.class.Dropdown);
ui.class.FileChooser = class FileChooser extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_inputTag;
    let m_props;
    this.destroy = destroyFileChooser;
    this.getInputTag = () => m_inputTag;
    this.getParentTag = () => self;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        switch (m_props.buttonOnly) {
          case true:
            installButtonOnly().then(resolve);
            break;
          default:
            installInput().then(resolve);
            break;
        }
      });
    }
    function installButtonOnly() {
      return new Promise((resolve) => {
        installInput(true).then(() => {
          const config = {
            parentTag: self,
            text: m_props.textButton,
            fnClick: () => {
              m_inputTag.getTag().click();
            },
            css: {
              button: m_props.css.button
            }
          };
          ui.button(config);
          resolve();
        });
      });
    }
    function installInput(hidden) {
      return new Promise((resolve) => {
        let inputConfig = {
          parentTag: self,
          labelText: m_props.textLabel,
          attr: m_props.attr,
          css: {
            self: m_props.css.wrapper
          },
          events: [
            {
              name: "change",
              fn: (context) => {
                if (m_props.fnUpload) {
                  m_props.fnUpload({
                    files: context.Input.getTag().files,
                    ev: context.ev
                  });
                }
              }
            }
          ],
          fnComplete: () => {
            if (m_props.fnComplete) {
              m_props.fnComplete({ FileChooser: self });
            }
          }
        };
        if (hidden) {
          inputConfig.hidden = true;
        }
        m_inputTag = ui.input(inputConfig);
        resolve();
      });
    }
    function destroyFileChooser() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ FileChooser: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          textButton: "Button Only - Select File",
          textLabel: "Choose files to upload",
          attr: {
            type: "file"
          },
          tag: "default",
          theme: "default"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "fileChooser" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "fileChooser" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.fileChooser = (props) => new ui.class.FileChooser(props);
customElements.define("mambo-file-chooser", ui.class.FileChooser);
ui.class.Grid = class Grid extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_colsMaxPxWidth = [];
    const m_componentsMapById = {};
    const m_componentsMapByColNbr = [];
    let m_gridWrapperTag;
    let m_gridHdrTag;
    let m_gridBodyTag;
    let m_gridBodyRowTagName;
    let m_rowIndexAttrName;
    let m_parentTag;
    let m_tileParentTag;
    let m_tileParentTags = [];
    let m_props;
    let m_gridData = props.data;
    let m_gridDataChanged;
    let m_colStylesId;
    let m_tileIndexAttrName;
    this.commitDataChange = commitDataChange;
    this.dataChanged = () => m_gridDataChanged;
    this.getCellComponentByIdByRow = getCellComponentByIdByRow;
    this.getCellComponentsById = () => m_componentsMapById;
    this.getCellComponentByColNbrByRow = getCellComponentByColNbrByRow;
    this.getCellComponentsByColNbr = () => m_componentsMapByColNbr;
    this.getGridData = getGridData;
    this.getId = () => m_props.id;
    this.getRowIndex = getRowIndex;
    this.removeColsStyles = removeColsStyles;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        switch (m_props.layout) {
          case "tile":
            setupTilesDOM().then(resolve);
            break;
          default:
            setupGridDOM().then(resolve);
            break;
        }
      });
    }
    function setupTilesDOM() {
      return new Promise((resolve) => {
        m_tileParentTag = ui.d.createTag({ ...m_props.tags.tiles, class: m_props.css.tiles });
        m_tileIndexAttrName = "data-grid-tile-index";
        self.appendChild(m_tileParentTag);
        if (!validateGridData()) {
          resolve();
          return;
        }
        const tilePromises = m_gridData.map((tileData, tileIndex) => {
          return installTile(tileData, tileIndex);
        });
        Promise.all(tilePromises).then(resolve);
      });
    }
    function installTile(tileData, tileIndex) {
      return new Promise((resolve) => {
        const tileTagConfig = { ...m_props.tags.tileItem, class: m_props.css.tileItem };
        tileTagConfig.attr[m_tileIndexAttrName] = tileIndex;
        const tileTag = ui.d.createTag(tileTagConfig);
        m_tileParentTag.appendChild(tileTag);
        m_tileParentTags[tileIndex] = tileTag;
        processTile(tileData, tileIndex, tileTag).then(resolve);
      });
    }
    function processTile(tileData, tileIndex, tileTag) {
      return new Promise((resolve) => {
        if (m_props.tileHTML) {
          let content = ui.d.supplantHTML(m_props.tileHTML, tileData);
          ui.d.append(tileTag, content);
        }
        if (m_props.fnPostTile) {
          m_props.fnPostTile({
            tileIndex,
            tileTag,
            tileData
          });
        }
        resolve();
      });
    }
    function setupGridDOM() {
      return new Promise((resolve) => {
        m_gridWrapperTag = ui.d.createTag({ ...m_props.tags.grid, class: m_props.css.grid });
        m_gridHdrTag = ui.d.createTag({ ...m_props.tags.header, class: m_props.css.header });
        m_gridBodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
        m_gridBodyRowTagName = "data-grid-row";
        m_rowIndexAttrName = "data-grid-row-index";
        m_gridWrapperTag.appendChild(m_gridHdrTag);
        m_gridWrapperTag.appendChild(m_gridBodyTag);
        self.appendChild(m_gridWrapperTag);
        installHdr().then(resolve);
      });
    }
    function installHdr() {
      return new Promise((resolve) => {
        const colPromises = m_props.columns.map((column) => {
          return new Promise((resolve2) => {
            let parentTag = ui.d.createTag({ ...m_props.tags.colCell, class: m_props.css.colCell });
            applyColCellElStyles(column, parentTag).then(() => {
              const txtEl = ui.d.createTag({
                ...m_props.tags.headerTitle,
                text: column.title ? column.title : column.name,
                css: m_props.css.headerTitle
              });
              parentTag.appendChild(txtEl);
              m_gridHdrTag.appendChild(parentTag);
              ui.d.computeTagWidth(txtEl).then((value) => m_colsMaxPxWidth.push(value));
            });
            resolve2();
          });
        });
        Promise.all(colPromises).then(installRows).then(resolve);
      });
    }
    async function installRows() {
      return new Promise((resolve, reject) => {
        if (!validateGridData()) {
          reject();
          return;
        }
        const rowPromises = m_gridData.map((rowData, rowIndex) => {
          return processRow(rowData, rowIndex);
        });
        Promise.all(rowPromises).then(() => {
          if (m_props.maxColWidth) {
            setColsWidth().then(resolve);
          } else {
            resolve();
          }
        });
      });
      function processRow(rowData, rowIndex) {
        return new Promise((resolve) => {
          const rowTagConfig = { ...m_props.tags.row, class: m_props.css.row };
          rowTagConfig.attr[m_rowIndexAttrName] = rowIndex;
          let rowTag = ui.d.createTag(rowTagConfig);
          m_gridBodyTag.appendChild(rowTag);
          const rowPromises = m_props.columns.map((column, colIndex) => {
            return new Promise((resolve2) => {
              const parentTag = ui.d.createTag({ ...m_props.tags.colCell, class: m_props.css.colCell });
              applyColCellElStyles(column, parentTag).then(installCell);
              function installCell() {
                rowTag.appendChild(parentTag);
                const context = {
                  column,
                  parentTag,
                  colIndex,
                  rowIndex,
                  rowData
                };
                switch (column.type) {
                  case "button":
                    installButtonCell(context);
                    break;
                  case "button-group":
                    installButtonGroupCell(context);
                    break;
                  case "text":
                    installTextCell(context);
                    break;
                  case "input":
                    installInputCell(context);
                    break;
                  case "file-chooser":
                    installFileChooserCell(context);
                    break;
                  case "dialog":
                    installDialogCell(context);
                    break;
                  case "slideout":
                    installSlideoutCell(context);
                    break;
                  case "drag-drop":
                    installDragDropCell(context);
                    break;
                  case "tree-view":
                    installTreeViewCell(context);
                    break;
                  case "dropdown":
                    installDropdownCell(context);
                    break;
                  case "combobox":
                    installComboboxCell(context);
                    break;
                  case "time-picker":
                    installTimePickerCell(context);
                    break;
                  case "calendar":
                    installCalendarCell(context);
                    break;
                  case "date-picker":
                    installDatePickerCell(context);
                    break;
                }
                resolve2();
              }
              resolve2();
            });
          });
          Promise.all(rowPromises).then(() => {
            if (m_props.fnPostRow) {
              m_props.fnPostRow({
                rowIndex,
                rowTag,
                rowData
              });
            }
            resolve();
          });
        });
      }
    }
    function installTextCell(context) {
      const text = context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text;
      const tagConfig = {
        ...m_props.tags.text,
        class: m_props.css.text,
        text
      };
      const textTag = ui.d.createTag(tagConfig);
      context.parentTag.appendChild(textTag);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: textTag
      });
      saveCellTagWidth({
        colIndex: context.colIndex,
        tag: textTag,
        parentTag: context.parentTag
      });
    }
    function installButtonCell(context) {
      let buttonConfig = {
        id: context.rowIndex,
        css: {
          button: m_props.css.button
        }
      };
      buttonConfig = ui.utils.extend(true, buttonConfig, context.column);
      buttonConfig.fnClick = (contextClick) => {
        if (context.column.fnClick) {
          context.column.fnClick({
            rowIndex: context.rowIndex,
            rowData: context.rowData,
            parentTag: context.parentTag,
            ev: contextClick.ev
          });
        }
      };
      buttonConfig.fnComplete = (contextComplete) => {
        saveCellTagWidth({
          colIndex: context.colIndex,
          tag: contextComplete.Button.getTag(),
          parentTag: context.parentTag
        });
      };
      buttonConfig.parentTag = context.parentTag;
      const buttonTag = ui.button(buttonConfig);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: buttonTag
      });
    }
    function installInputCell(context) {
      let inputConfig = {
        css: {
          input: m_props.css.input,
          button: m_props.css.button
        },
        value: context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text
      };
      inputConfig = ui.utils.extend(true, inputConfig, context.column);
      inputConfig.events = [
        {
          name: "change",
          fn: (contextEvent) => {
            inputElChangeEvent({
              input: contextEvent.input,
              column: context.column,
              rowIndex: context.rowIndex,
              rowData: context.rowData,
              ev: contextEvent.ev
            });
          }
        }
      ];
      inputConfig.fnDataValidationChange = (contextValidation) => {
        inputElChangeEvent({
          input: contextValidation.input,
          column: context.column,
          rowIndex: context.rowIndex,
          rowData: context.rowData,
          ev: contextValidation.ev
        });
      };
      inputConfig.fnComplete = (contextComplete) => {
        saveCellTagWidth({
          colIndex: context.colIndex,
          tag: contextComplete.Input.getTag(),
          parentTag: context.parentTag
        });
      };
      inputConfig.fnClick = (contextClick) => {
        if (context.column.fnClick) {
          context.column.fnClick(contextClick);
        }
      };
      inputConfig.parentTag = context.parentTag;
      const inputTag = ui.input(inputConfig);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: inputTag
      });
    }
    function installFileChooserCell(context) {
      let chooserConfig = {
        buttonOnly: true,
        textButton: "Upload File",
        attr: {
          multiple: true
        },
        fnComplete: (contextComplete) => {
          saveCellTagWidth({
            colIndex: context.colIndex,
            tag: contextComplete.FileChooser.getParentTag(),
            parentTag: context.parentTag
          });
        }
      };
      chooserConfig = ui.utils.extend(true, chooserConfig, context.column);
      chooserConfig.parentTag = context.parentTag;
      const fileChooserTag = ui.fileChooser(chooserConfig);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: fileChooserTag
      });
    }
    function installDialogCell(context) {
      const dialogDefaultConfig = {
        title: "Dialog Title",
        css: {
          button: m_props.css.button
        }
      };
      const dialogConfig = ui.utils.extend(true, dialogDefaultConfig, context.column);
      dialogConfig.fnClick = () => {
        ui.dialog(dialogConfig.parentTag, dialogConfig, (contextReady) => {
          if (dialogConfig.fnOpen) {
            dialogConfig.fnOpen({
              dialog: contextReady.dialog,
              dialogContentTag: contextReady.dialogContentTag,
              column: context.column,
              parentTag: context.parentTag,
              colIndex: context.colIndex,
              rowIndex: context.rowIndex
            });
          }
        });
      };
      dialogConfig.fnClose = (contextClose) => {
        contextClose.dialog.close();
        if (context.column.fnClose) {
          context.column.fnClose({
            column: context.column,
            parentTag: context.parentTag,
            colIndex: context.colIndex,
            rowIndex: context.rowIndex
          });
        }
      };
      const buttonConfig = ui.utils.extend(true, {}, dialogConfig);
      buttonConfig.fnComplete = (contextComplete) => {
        saveCellTagWidth({
          colIndex: context.colIndex,
          tag: contextComplete.Button.getTag(),
          parentTag: context.parentTag
        });
      };
      buttonConfig.parentTag = context.parentTag;
      const buttonTag = ui.button(buttonConfig);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: buttonTag
      });
    }
    function installButtonGroupCell(context) {
      let buttonGroupConfig = ui.utils.extend(true, { css: { button: { button: m_props.css.button } } }, context.column);
      buttonGroupConfig.id = context.rowIndex;
      buttonGroupConfig.parentTag = context.parentTag;
      const buttonGroupTag = ui.buttonGroup(buttonGroupConfig);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: buttonGroupTag
      });
    }
    function installSlideoutCell(context) {
      let slideoutTag;
      const defaultConfig = {
        slideoutParentTag: "body",
        text: "Open",
        css: {
          button: m_props.css.button
        }
      };
      const config = ui.utils.extend(true, defaultConfig, context.column);
      config.fnClick = () => {
        slideoutTag.open();
      };
      config.parentTag = context.parentTag;
      const buttonTag = ui.button(config);
      const slideoutConfig = ui.utils.extend(true, {}, config);
      slideoutConfig.fnComplete = config.fnInstallContent;
      slideoutConfig.parentTag = config.slideoutParentTag;
      slideoutTag = ui.slideout(slideoutConfig);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: { button: buttonTag, slideout: slideoutTag }
      });
    }
    function installDragDropCell(context) {
      const defaultConfig = {
        parentTag: context.parentTag,
        dropText: "Drop Files",
        fnDrop: handleDropEvent,
        css: {
          parent: m_props.css.dropParent,
          imgDropIcon: m_props.css.dropImgDropIcon,
          dropText: m_props.css.dropText
        }
      };
      const config = ui.utils.extend(true, defaultConfig, context.column);
      const dragDropTag = ui.dragDrop(config);
      function handleDropEvent(contextDragDrop) {
        console.table(contextDragDrop.dataTransfer.files);
      }
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: dragDropTag
      });
    }
    function installTreeViewCell(context) {
      const defaultConfig = {
        parentTag: context.parentTag,
        css: {
          treeViewParent: m_props.css.treeViewParent
        }
      };
      const config = ui.utils.extend(true, defaultConfig, context.column);
      const treeViewTag = ui.treeView(config);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: treeViewTag
      });
    }
    function installDropdownCell(context) {
      const defaultConfig = {
        css: {
          parent: m_props.css.dropDownParent,
          container: m_props.css.dropDownContainer,
          open: "open",
          button: {
            button: m_props.css.button
          }
        },
        button: {
          text: "Open Dropdown"
        }
      };
      const config = ui.utils.extend(true, defaultConfig, context.column);
      config.parentTag = context.parentTag;
      const dropdownTag = ui.dropdown(config);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: dropdownTag
      });
    }
    function installComboboxCell(context) {
      const defaultConfig = {
        css: {
          parent: m_props.css.comboboxParent,
          dropdown: {
            container: m_props.css.comboboxDropDownContainer
          }
        }
      };
      const config = ui.utils.extend(true, defaultConfig, context.column);
      config.parentTag = context.parentTag;
      const comboboxTag = ui.combobox(config);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: comboboxTag
      });
    }
    function installTimePickerCell(context) {
      const defaultConfig = {
        css: {
          combobox: {
            parent: m_props.css.timePickerParent,
            dropdown: {
              container: m_props.css.timePickerDropDownContainer
            }
          }
        }
      };
      const config = ui.utils.extend(true, defaultConfig, context.column);
      config.parentTag = context.parentTag;
      const timePickerTag = ui.timePicker(config);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: timePickerTag
      });
    }
    function installCalendarCell(context) {
      const defaultConfig = {
        css: {
          parent: m_props.css.calendarParent
        }
      };
      const config = ui.utils.extend(true, defaultConfig, context.column);
      config.parentTag = context.parentTag;
      const calendarTag = ui.calendar(config);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: calendarTag
      });
    }
    function installDatePickerCell(context) {
      const defaultConfig = {
        css: {
          parent: m_props.css.datePickerParent
        }
      };
      const config = ui.utils.extend(true, defaultConfig, context.column);
      config.parentTag = context.parentTag;
      const datePickerTag = ui.datePicker(config);
      addComponentToMap({
        column: context.column,
        colIndex: context.colIndex,
        component: datePickerTag
      });
    }
    function inputElChangeEvent(context) {
      updateGridData({
        value: context.Input.value(),
        column: context.column,
        rowIndex: context.rowIndex
      });
    }
    function updateGridData(context) {
      m_gridDataChanged = true;
      m_gridData[context.rowIndex][context.column.dataKey] = context.value;
    }
    function getGridData() {
      return m_gridData;
    }
    function saveCellTagWidth(context) {
      if (!m_props.maxColWidth) {
        return;
      }
      const tagWidth = ui.d.computeTagWidth(context.tag, context.parentTag);
      m_colsMaxPxWidth[context.colIndex] = tagWidth > m_colsMaxPxWidth[context.colIndex] ? tagWidth : m_colsMaxPxWidth[context.colIndex];
    }
    function setColsWidth() {
      return new Promise((resolve) => {
        m_colStylesId = ui.utils.getUniqueId();
        const styleTagConfig = { name: "style", attr: { id: m_colStylesId } };
        let styleEl = ui.d.createTag(styleTagConfig);
        const colsPromises = m_colsMaxPxWidth.map((width, index) => {
          return new Promise((resolve2) => {
            const adjWidth = width + m_props.colWidthAdj;
            let hdrSelector = m_parentTag.tagName.toLowerCase() + " " + m_gridHdrTag.tagName.toLowerCase() + " > *:nth-child(" + (index + 1) + ")";
            let bodySelector = m_parentTag.tagName.toLowerCase() + " " + m_gridBodyTag.tagName.toLowerCase() + " " + m_gridBodyRowTagName + " > *:nth-child(" + (index + 1) + ")";
            let style = `{ min-width:${adjWidth}px; width:${adjWidth}px; max-width:${adjWidth}px; }`;
            styleEl.appendChild(document.createTextNode(`${hdrSelector},${bodySelector}${style}`));
            resolve2();
          });
        });
        Promise.all(colsPromises).then(() => ui.d.append("head", styleEl)).then(resolve);
      });
    }
    function getRowIndex(context = {}) {
      return context.rowTag.getAttribute(m_rowIndexAttrName);
    }
    function applyColCellElStyles(columnConfig, tag) {
      return new Promise((resolve) => {
        tag.style.display = columnConfig.hide ? "none" : "";
        if (columnConfig.style && ui.utils.isObject(columnConfig.style)) {
          for (let key in columnConfig.style) {
            tag.style[key] = columnConfig.style[key];
          }
        }
        resolve();
      });
    }
    function commitDataChange() {
      m_gridDataChanged = null;
      m_componentsMapById.forEach((input) => {
        input.commitDataChange();
      });
    }
    function removeColsStyles() {
      let tag = document.getElementById(m_colStylesId);
      if (tag) {
        tag.parentNode.removeChild(tag);
      }
    }
    function getCellComponentByIdByRow(context = {}) {
      return m_componentsMapById[context.columnId][context.rowIndex];
    }
    function getCellComponentByColNbrByRow(context = {}) {
      return m_componentsMapByColNbr[context.colNbr][context.rowIndex];
    }
    function addComponentToMap(context) {
      if (context.column.id) {
        if (!(context.column.id in m_componentsMapById)) {
          m_componentsMapById[context.column.id] = [];
        }
        m_componentsMapById[context.column.id].push(context.component);
      }
      if (!(context.colIndex in m_componentsMapByColNbr)) {
        m_componentsMapByColNbr[context.colIndex] = [];
      }
      m_componentsMapByColNbr[context.colIndex].push(context.component);
    }
    function validateGridData() {
      if (!m_gridData || !Array.isArray(m_gridData)) {
        console.error("Data Grid alert: grid data not found or is not data type Array -->", m_parentTag);
        return false;
      }
      return true;
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Grid: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          colWidthAdj: 5,
          layout: "grid",
          tilesWidth: "300px",
          tilesFillUp: true,
          tilesConfig: []
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "grid" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "grid" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.grid = (props) => new ui.class.Grid(props);
customElements.define("mambo-grid", ui.class.Grid);
ui.class.Input = class Input extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_inputTag;
    let m_labelTag;
    let m_props;
    let m_dataChanged;
    this.clear = clearInput;
    this.commitDataChange = () => m_dataChanged = null;
    this.dataChanged = () => m_dataChanged;
    this.getTag = () => m_inputTag;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        const tagConfig = {
          ...m_props.tags.input,
          class: m_props.css.input,
          text: m_props.value,
          event: {
            blur: handleOnBlur
          }
        };
        tagConfig.attr.name = m_props.name;
        m_inputTag = ui.d.createTag(tagConfig);
        if (m_props.hidden) {
          self.style.display = "none";
        } else if (typeof m_props.labelText === "string") {
          const labelTagConfig = {
            name: "label",
            class: m_props.css.label,
            prop: m_props.prop,
            attr: { for: m_props.name },
            text: m_props.labelText
          };
          m_labelTag = ui.d.createTag(labelTagConfig);
          self.appendChild(m_labelTag);
        }
        if (!m_props.leftSide && !m_props.rightSide) {
          appendInputElement(self);
        } else {
          if (m_props.leftSide) {
            if (Array.isArray(m_props.leftSide)) {
              m_props.leftSide.forEach(installComponentInsideWrapper);
            } else {
              installComponentInsideWrapper(m_props.leftSide);
            }
          }
          appendInputElement(self);
          if (m_props.rightSide) {
            if (Array.isArray(m_props.rightSide)) {
              m_props.rightSide.forEach(installComponentInsideWrapper);
            } else {
              installComponentInsideWrapper(m_props.rightSide);
            }
          }
        }
        if (m_props.validate.onStart) {
          validate();
        }
        resolve();
      });
    }
    function appendInputElement(parent) {
      parent.appendChild(m_inputTag);
      if (m_props.maxLenWidth && !m_props.leftSide && !m_props.rightSide) {
        const width = `${m_props.attr.maxLength + m_props.maxLenWidthAdj}${m_props.maxLenWidthUnit}`;
        m_inputTag.style.width = width;
        m_inputTag.style.minWidth = width;
        m_inputTag.style.maxWidth = width;
      } else if (m_props.maxLenWidth) {
        const width = `${m_props.attr.maxLength + m_props.maxLenWidthAdj}${m_props.maxLenWidthUnit}`;
        self.style.width = width;
        self.style.minWidth = width;
        self.style.maxWidth = width;
      }
    }
    function installComponentInsideWrapper(item) {
      let componentConfig;
      if ("button" in item) {
        componentConfig = item.button;
        componentConfig.parentTag = self;
        if (!componentConfig.css) {
          componentConfig.css = m_props.css;
        }
        componentConfig.fnClick = (context) => {
          if (m_props.fnClick) {
            m_props.fnClick({
              Input: self,
              Button: context.Button,
              ev: context.ev
            });
          }
        };
        ui.button(componentConfig);
      } else {
        componentConfig = item.img;
        if (!componentConfig.css) {
          componentConfig.css = m_props.css.img;
        }
        const tagConfig = {
          name: "img",
          class: componentConfig.css,
          prop: componentConfig.prop,
          attr: componentConfig.attr
        };
        let component = ui.d.createTag(tagConfig);
        self.appendChild(component);
      }
    }
    function handleOnBlur(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      validate(ev);
    }
    function validate(ev) {
      if (!Array.isArray(m_props.validate.types)) {
        return;
      }
      m_props.validate.types.forEach((validate2) => {
        const keys = Object.keys(validate2);
        keys.forEach((key) => {
          switch (key) {
            case "minLength":
              validateMinLength(validate2.minLength, ev);
              break;
          }
        });
      });
    }
    function validateMinLength(config, ev) {
      const curLen = m_inputTag.value.length;
      if (typeof config.value === "string") {
        const length = config.len - curLen;
        if (length > 0) {
          const padding = config.value.repeat(length);
          m_dataChanged = true;
          m_inputTag.value = config.dir === "right" ? m_inputTag.value + padding : padding + m_inputTag.value;
          if (m_props.fnDataValidationChange) {
            m_props.fnDataValidationChange({
              Input: self,
              ev
            });
          }
        }
      }
    }
    function clearInput() {
      m_inputTag.value = "";
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_inputTag.value;
      } else {
        m_inputTag.value = context.value;
      }
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Input: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          value: "",
          validate: [
            {}
          ],
          maxLenWidthAdj: 1,
          maxLenWidthUnit: "ch",
          name: Math.random().toString(36).slice(2)
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "input" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "input" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.input = (props) => new ui.class.Input(props);
customElements.define("mambo-input", ui.class.Input);
ui.class.Listbox = class Listbox extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_listboxContainerTag;
    let m_props;
    let m_listboxData;
    this.addToList = addToList;
    this.destroy = destroyListbox;
    this.replaceList = replaceList;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_listboxContainerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        self.classList.add(m_props.css.self);
        installItems(m_listboxData).then(() => {
          self.appendChild(m_listboxContainerTag);
          resolve();
        });
      });
    }
    function installItems(data) {
      return new Promise((resolve) => {
        const itemPromises = data.map((itemData) => {
          return processItem(itemData);
        });
        Promise.all(itemPromises).then(resolve);
      });
    }
    function processItem(itemData) {
      return new Promise((resolve) => {
        const itemConfig = {
          ...m_props.tags.item,
          class: m_props.css.item,
          text: itemData[m_props.displayKey]
        };
        let itemTag = ui.d.createTag(itemConfig);
        m_listboxContainerTag.appendChild(itemTag);
        setupItemEventListeners(itemTag, itemData).then(resolve);
      });
    }
    function setupItemEventListeners(item, data) {
      return new Promise((resolve) => {
        item.addEventListener("click", (ev) => {
          if (m_props.fnSelect) {
            m_props.fnSelect({
              ev,
              data,
              item,
              Listbox: self
            });
          }
        });
        resolve();
      });
    }
    function addToList(data) {
      m_listboxData = data;
      installItems(m_listboxData).then();
    }
    function replaceList(data) {
      clearData();
      m_listboxData = data;
      installItems(m_listboxData).then();
    }
    function clearData() {
      m_listboxContainerTag.innerHTML = "";
    }
    function destroyListbox() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Listbox: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          displayKey: "displayName",
          tag: "default",
          theme: "default"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        m_listboxData = customProps.data;
        const tags = ui.tags.getTags({ name: m_props.tag, component: "listbox" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "listbox" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.listbox = (props) => new ui.class.Listbox(props);
customElements.define("mambo-listbox", ui.class.Listbox);
ui.class.Mapbox = class Mapbox extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_containerTag;
    let m_props;
    let m_map;
    this.addPoints = addPoints;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      checkMapboxLibraries();
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      await renderMap();
      await getUserLocation();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        self.classList.add(m_props.css.self);
        ui.d.append(self, m_containerTag);
        resolve();
      });
    }
    function getUserLocation() {
      return new Promise((resolve) => {
        navigator.geolocation.getCurrentPosition((s) => {
          const lng = s.coords.longitude;
          const lat = s.coords.latitude;
          onMoveEnd(removeWait);
          jumpTo(lng, lat);
          addCurrentPositionMarked(lng, lat);
          resolve();
        }, () => {
          geolocationError();
          resolve();
        });
      });
    }
    function jumpTo(lng, lat) {
      m_map.jumpTo({
        center: [lng, lat],
        zoom: m_props.zoom
      });
    }
    function geolocationError(e) {
      removeWait();
    }
    function renderMap() {
      return new Promise((resolve) => {
        m_map = new mapboxgl.Map({
          container: m_props.prop.id,
          style: m_props.mapStyle,
          zoom: 0.01
        });
        if (m_props.controls) {
          if (m_props.controls.fullscreen) {
            m_map.addControl(new mapboxgl.FullscreenControl(), m_props.controls.fullscreen.position || "top-right");
          }
          if (m_props.controls.navigation) {
            m_map.addControl(new mapboxgl.NavigationControl(), m_props.controls.navigation.position || "top-right");
          }
          if (m_props.controls.search) {
            m_map.addControl(new MapboxGeocoder({
              accessToken: mapboxgl.accessToken,
              mapboxgl
            }), m_props.controls.search.position || "top-left");
          }
        }
        m_map.on("load", resolve);
      });
    }
    function addCurrentPositionMarked(lng, lat) {
      const point = ui.d.createTag({ ...m_props.tags.currentPoint, class: m_props.css.currentPoint });
      setMarker([{ lng, lat }], point);
    }
    function setMarker(arrCoords, marker) {
      arrCoords.forEach(({ lat, lng }) => {
        let config = marker || m_props.marker;
        new mapboxgl.Marker(config).setLngLat([lng, lat]).addTo(m_map);
      });
    }
    function onMoveEnd(done) {
      m_map.once("moveend", done);
    }
    function removeWait() {
      m_containerTag.classList.add(m_props.css.hidewait);
    }
    function addPoints(points) {
      setMarker(points);
    }
    function checkMapboxLibraries() {
      if (!window.mapboxgl) {
        throw "Please, add Mapbox GL JS library to document";
      }
      if (!window.MapboxGeocoder) {
        throw "Please, add Mapbox GL Geocoder library to document. See: 'https://github.com/mapbox/mapbox-gl-geocoder'";
      }
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Mapbox: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          marker: { color: "orange" },
          mapStyle: "mapbox://styles/mapbox/streets-v11",
          tag: "default",
          theme: "default",
          zoom: 16
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        mapboxgl.accessToken = m_props.accessToken;
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "mapbox" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "mapbox" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.mapbox = (props) => new ui.class.Mapbox(props);
customElements.define("mambo-mapbox", ui.class.Mapbox);
ui.class.Percentage = class Percentage extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_percentageBarTag;
    let m_percentageTextTag;
    let m_props;
    let m_value = 0;
    this.destroy = destroyPercentage;
    this.getParentTag = () => self;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_percentageBarTag = ui.d.createTag({ ...m_props.tags.bar, class: m_props.css.bar });
        m_percentageTextTag = ui.d.createTag({ ...m_props.tags.text, class: m_props.css.text });
        m_percentageBarTag.appendChild(m_percentageTextTag);
        setValue(m_value);
        self.classList.add(m_props.css.self);
        self.appendChild(m_percentageBarTag);
        resolve();
      });
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_value;
      } else {
        setValue(context.value);
      }
    }
    function setValue(value2) {
      m_value = value2;
      setText();
      setRange();
      setBarWidth();
    }
    function setText() {
      m_percentageTextTag.innerText = ui.utils.formatPercentage(m_value, m_props.decimals);
    }
    function setBarWidth() {
      m_percentageBarTag.style.width = m_value * 100 + "%";
    }
    function setRange() {
      if (ui.utils.isArray(m_props.ranges) && m_props.ranges.length > 0) {
        let range = m_props.ranges.find((range2) => {
          return m_value >= range2.min && m_value <= range2.max;
        });
        if (range && range.css) {
          clearRangeClasses();
          m_percentageBarTag.classList.add(range.css);
        }
      }
    }
    function clearRangeClasses() {
      m_props.ranges.forEach((range) => {
        m_percentageBarTag.classList.remove(range.css);
      });
    }
    function destroyPercentage() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Percentage: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          value: 0,
          min: 0,
          max: 1,
          decimals: 0,
          ranges: [
            {
              min: 0,
              max: 0.5,
              css: "m-percentage-range-low"
            },
            {
              min: 0.5,
              max: 1,
              css: "m-percentage-range-high"
            }
          ]
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        m_value = m_props.value;
        const tags = ui.tags.getTags({ name: m_props.tag, component: "percentage" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "percentage" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.percentage = (props) => new ui.class.Percentage(props);
customElements.define("mambo-percentage", ui.class.Percentage);
ui.class.Player = class Player extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_buttonGroups = [];
    let m_props;
    let m_timeInfo;
    let m_progressBar;
    let m_parentTag;
    let m_playerTag;
    this.getTag = () => m_playerTag;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_playerTag = ui.d.createTag({ ...m_props.tags.player, class: m_props.css.player });
        self.classList.add(m_props.css.self);
        self.appendChild(m_playerTag);
        resolve();
      });
    }
    function setSource(source) {
      ui.d.setAttr(m_playerTag, { src: source });
    }
    function installControls() {
      if (m_props.controls && Array.isArray(m_props.controls)) {
        const controls = m_props.controls;
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
        buttons: [
          {
            id: 1,
            text: "Button One",
            fnClick: (context) => {
            }
          },
          {
            id: 2,
            text: "Button Two"
          },
          {
            id: 3,
            text: "Button Three"
          }
        ],
        fnClick: (context) => {
          alert(`'Button clicked: ' ${context.Button.getId()}`);
        }
      };
      m_buttonGroups.push(ui.buttonGroup(m_props.parentTag, btnGroupProps));
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
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Player: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          progressBar: true,
          controls: [
            {
              buttons: ["play", "previous", "next", "volume"]
            },
            {
              time: true
            },
            {
              buttons: ["settings", "theater", "fullScreen"]
            }
          ]
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "player" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "player" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.player = (props) => new ui.class.Player(props);
customElements.define("mambo-player", ui.class.Player);
ui.class.Rating = class Rating extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_ratingEmptyTag;
    let m_ratingSelectedTag;
    let m_ratingHoverTag;
    let m_props;
    let m_value = 0;
    let m_enable = true;
    this.destroy = destroyRating;
    this.enable = enable;
    this.getParentTag = () => self;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        installLayers().then(setupEventListener).then(resolve);
      });
    }
    function installLayers() {
      return new Promise((resolve) => {
        m_ratingEmptyTag = ui.d.createTag({ ...m_props.tags.empty, class: m_props.css.empty });
        m_ratingSelectedTag = ui.d.createTag({ ...m_props.tags.selected, class: m_props.css.selected });
        m_ratingHoverTag = ui.d.createTag({ ...m_props.tags.hover, class: m_props.css.hover });
        self.appendChild(m_ratingEmptyTag);
        self.appendChild(m_ratingSelectedTag);
        self.appendChild(m_ratingHoverTag);
        installStars().then(resolve);
      });
    }
    function installStars() {
      return new Promise((resolve) => {
        for (let i = 0; i < m_props.max; i++) {
          let emptyStarTag = ui.d.createTag({ ...m_props.tags.emptyStar, class: m_props.css.emptyStar });
          let selectedStarTag = ui.d.createTag({ ...m_props.tags.selectedStar, class: m_props.css.selectedStar });
          let hoverStarTag = ui.d.createTag({ ...m_props.tags.hoverStar, class: m_props.css.hoverStar });
          m_ratingEmptyTag.appendChild(emptyStarTag);
          m_ratingSelectedTag.appendChild(selectedStarTag);
          m_ratingHoverTag.appendChild(hoverStarTag);
        }
        resolve();
      });
    }
    function setupEventListener() {
      return new Promise((resolve) => {
        self.addEventListener("click", selectValue);
        self.addEventListener("mouseenter", setHoverValue);
        self.addEventListener("mousemove", setHoverValue);
        self.addEventListener("mouseleave", hideHoverLayer);
        resolve();
      });
    }
    function selectValue(ev) {
      if (m_enable) {
        setValue(getHoverValue(ev));
        if (m_props.fnSelect) {
          m_props.fnSelect({ Rating: self, ev });
        }
      }
    }
    function setHoverValue(ev) {
      if (m_enable) {
        m_ratingSelectedTag.style.display = "none";
        m_ratingHoverTag.style.display = "block";
        m_ratingHoverTag.style.width = getStarWidth() * getHoverValue(ev) + "px";
      }
    }
    function hideHoverLayer(ev) {
      if (m_enable) {
        m_ratingHoverTag.style.display = "none";
        m_ratingSelectedTag.style.display = "block";
      }
    }
    function getStarWidth() {
      return m_ratingEmptyTag.clientWidth / m_props.max;
    }
    function getLeftPosition(ev) {
      return ev.clientX - self.getBoundingClientRect().left;
    }
    function getHoverValue(ev) {
      return Math.ceil(getLeftPosition(ev) / getStarWidth());
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_value;
      } else {
        setValue(context.value);
      }
    }
    function setValue(value2) {
      return new Promise((resolve) => {
        m_value = value2;
        m_ratingSelectedTag.style.display = "block";
        m_ratingHoverTag.style.display = "none";
        m_ratingSelectedTag.style.width = getStarWidth() * m_value + "px";
        resolve();
      });
    }
    function enable(enable2) {
      m_enable = enable2;
      setEnable();
    }
    function setEnable() {
      self.classList.toggle(m_props.css.disabled, !m_enable);
    }
    function destroyRating() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Rating: self });
      }
    }
    function configure(customProps = {}) {
      m_props = {
        tag: "default",
        theme: "default",
        value: 0,
        max: 5,
        enable: true
      };
      m_props = ui.utils.extend(true, m_props, customProps);
      m_parentTag = ui.d.getTag(m_props.parentTag);
      m_value = m_props.value;
      m_enable = m_props.enable;
      const tags = ui.tags.getTags({ name: m_props.tag, component: "rating" });
      m_props.tags = ui.utils.extend(true, tags, m_props.tags);
      const css = ui.theme.getTheme({ name: m_props.theme, component: "rating" });
      m_props.css = ui.utils.extend(true, css, m_props.css);
    }
  }
};
ui.rating = (props) => new ui.class.Rating(props);
customElements.define("mambo-rating", ui.class.Rating);
ui.class.Slideout = class Slideout extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_slideoutHeaderTag;
    let m_slideoutBodyTag;
    let m_slideoutOverlayTag;
    let m_props;
    this.close = close;
    this.destroy = destroySlideout;
    this.getContentTag = () => self;
    this.getHeaderTag = () => m_slideoutHeaderTag;
    this.getBodyTag = () => m_slideoutBodyTag;
    this.open = openAnimation;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_slideoutHeaderTag = ui.d.createTag({ ...m_props.tags.header, class: m_props.css.header });
        m_slideoutBodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
        m_slideoutOverlayTag = ui.d.createTag({
          ...m_props.tags.overlay,
          class: m_props.css.overlay,
          event: {
            click: closeAnimation
          }
        });
        self.classList.add(m_props.css.self);
        self.appendChild(m_slideoutHeaderTag);
        self.appendChild(m_slideoutBodyTag);
        self.appendChild(m_slideoutOverlayTag);
        installCloseButton().then(resolve);
      });
    }
    function installCloseButton() {
      return new Promise((resolve) => {
        if (m_props.closeButton) {
          const config = m_props.closeButton;
          config.parentTag = m_slideoutHeaderTag;
          config.fnClick = closeAnimation;
          ui.button(config);
        }
        resolve();
      });
    }
    function openAnimation() {
      self.classList.add("open");
      m_slideoutOverlayTag.classList.add("fade-in");
      if (m_props.fnOpen) {
        m_props.fnOpen({ slideout: self });
      }
    }
    function close() {
      closeAnimation();
    }
    function closeAnimation() {
      self.classList.remove("open");
      m_slideoutOverlayTag.classList.remove("fade-in");
      if (m_props.fnClose) {
        m_props.fnClose({ slideout: self });
      }
    }
    function destroySlideout() {
      ui.d.remove(self).remove(m_slideoutOverlayTag);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Slideout: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          closeButton: {
            text: "X",
            css: {
              button: "slideout-close-button"
            }
          }
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "slideout" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "slideout" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.slideout = (props) => new ui.class.Slideout(props);
customElements.define("mambo-slideout", ui.class.Slideout);
ui.class.Slider = class Slider extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_sliderWrapperTag;
    let m_trackTag;
    let m_selectionTag;
    let m_handleTag;
    let m_stepTags = [];
    let m_props;
    let m_horizontal = true;
    let m_css;
    let m_enable = true;
    let m_value = 0;
    let m_stepLength;
    this.destroy = destroySlider;
    this.enable = enable;
    this.getParentTag = () => self;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_sliderWrapperTag = ui.d.createTag({ ...m_props.tags.wrapper, class: m_css.wrapper });
        const domPromises = [];
        if (m_props.showButtons) {
          if (m_horizontal) {
            domPromises.push(installButton(m_props.increaseButton, m_css.increaseButton, increase));
          } else {
            domPromises.push(installButton(m_props.decreaseButton, m_css.decreaseButton, decrease));
          }
        }
        self.classList.add(m_props.css.self);
        self.appendChild(m_sliderWrapperTag);
        domPromises.push(installTrack());
        domPromises.push(installSteps());
        domPromises.push(installHandle());
        Promise.all(domPromises).then(() => {
          setEnable(m_enable);
          setValue(m_value);
          resolve();
        });
      });
    }
    function installButton(config, css, fnClick) {
      return new Promise((resolve) => {
        let button = ui.utils.extend(true, {}, config);
        button.css = ui.utils.extend(true, css, button.css);
        button.parentTag = self;
        button.fnClick = (context) => {
          fnClick();
          if (m_props.fnSelect) {
            m_props.fnSelect({ Slider: self, ev: context.ev });
          }
          if (config.fnClick) {
            config.fnClick(context);
          }
        };
        ui.button(button);
        resolve();
      });
    }
    function installTrack() {
      return new Promise((resolve) => {
        m_trackTag = ui.d.createTag({ ...m_props.tags.track, class: m_css.track });
        m_sliderWrapperTag.appendChild(m_trackTag);
        m_selectionTag = ui.d.createTag({ ...m_props.tags.selection, class: m_css.selection });
        m_sliderWrapperTag.appendChild(m_selectionTag);
        resolve();
      });
    }
    function installSteps() {
      return new Promise((resolve) => {
        let stepsTag = ui.d.createTag({ ...m_props.tags.stepsContainer, class: m_css.stepsContainer });
        ui.d.prepend(m_sliderWrapperTag, stepsTag);
        const trackLength = m_horizontal ? m_trackTag.clientWidth : m_trackTag.clientHeight;
        const steps = Math.floor((m_props.max - m_props.min) / m_props.step);
        m_stepLength = trackLength / steps;
        for (let i = 0; i <= steps; i++) {
          let stepTag = null;
          const value2 = i * m_props.step + m_props.min;
          if (i * m_props.step % m_props.largeStep === 0) {
            stepTag = installLargeStep(stepsTag, value2);
          } else {
            stepTag = installSmallStep(stepsTag);
          }
          stepTag.id = value2;
          m_stepTags.push(stepTag);
        }
        resolve();
      });
    }
    function decrease() {
      setValue(m_value - m_props.step);
    }
    function increase() {
      setValue(m_value + m_props.step);
    }
    function installLargeStep(stepsTag, value2) {
      let stepTag = ui.d.createTag({ ...m_props.tags.stepLarge, class: m_css.stepLarge });
      let textTag = ui.d.createTag({
        name: "span",
        class: m_css.stepLargeSpan,
        text: value2.toString()
      });
      stepTag.appendChild(textTag);
      if (m_horizontal) {
        stepsTag.appendChild(stepTag);
        stepTag.style.width = m_stepLength + "px";
      } else {
        ui.d.prepend(stepsTag, stepTag);
        stepTag.style.height = m_stepLength + "px";
      }
      return stepTag;
    }
    function installSmallStep(stepsTag) {
      let stepTag = ui.d.createTag({ ...m_props.tags.step, class: m_css.step });
      if (m_horizontal) {
        stepsTag.appendChild(stepTag);
        stepTag.style.width = m_stepLength + "px";
      } else {
        ui.d.prepend(stepsTag, stepTag);
        stepTag.style.height = m_stepLength + "px";
      }
      return stepTag;
    }
    function installHandle() {
      return new Promise((resolve) => {
        const config = {
          parentTag: m_sliderWrapperTag,
          containerTag: m_sliderWrapperTag,
          css: {
            draggable: m_css.handle
          },
          axis: m_horizontal ? "x" : "y",
          grid: m_horizontal ? [m_stepLength, 0] : [0, m_stepLength],
          attr: {
            title: m_props.handleTitle
          },
          fnDragStart: (context) => {
            if (m_props.fnSlideStart) {
              m_props.fnSlideStart({ Slider: self, ev: context.ev });
            }
          },
          fnDragEnd: updateValue,
          fnDrag: updateSelection
        };
        m_handleTag = ui.draggable(config);
        resolve();
      });
    }
    function updateValue(context) {
      m_value = Number(m_stepTags[getSelectedIndex()].id);
      setHandlePosition();
      if (m_props.fnSelect) {
        m_props.fnSelect({ Slider: self, ev: context.ev });
      }
    }
    function updateSelection(context) {
      setSelectionPosition();
      if (m_props.fnSlide) {
        m_props.fnSlide({ Slider: self, ev: context.ev });
      }
    }
    function getSelectedIndex() {
      let handleOffset = m_horizontal ? m_handleTag.getParentTag().offsetLeft : m_sliderWrapperTag.clientHeight - m_handleTag.getParentTag().offsetTop;
      for (let i = 0; i < m_stepTags.length; i++) {
        let stepOffset = m_horizontal ? m_stepTags[i].offsetLeft : m_sliderWrapperTag.clientHeight - m_stepTags[i].offsetTop;
        if (handleOffset <= stepOffset) {
          if (stepOffset - handleOffset > m_stepLength / 2 && i > 0) {
            return i - 1;
          }
          return i;
        }
      }
      return 0;
    }
    function enable(enable2) {
      m_enable = enable2;
      setEnable();
    }
    function setEnable() {
      self.classList.toggle(m_props.css.disabled, !m_enable);
      m_handleTag.enable(m_enable);
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_value;
      } else {
        setValue(context.value);
      }
    }
    function setValue(value2) {
      m_value = getValidValue(value2);
      setHandlePosition();
    }
    function setHandlePosition() {
      let stepTag = m_stepTags.find((tag) => tag.id === m_value.toString());
      let handleTag = m_handleTag.getParentTag();
      if (m_horizontal) {
        const length = stepTag.getBoundingClientRect().left - m_sliderWrapperTag.getBoundingClientRect().left - handleTag.clientWidth / 2;
        handleTag.style.left = length + "px";
      } else {
        const length = stepTag.getBoundingClientRect().top - m_sliderWrapperTag.getBoundingClientRect().top - handleTag.clientHeight / 2;
        handleTag.style.top = length + "px";
      }
      setSelectionPosition();
    }
    function setSelectionPosition() {
      let handleTag = m_handleTag.getParentTag();
      if (m_horizontal) {
        m_selectionTag.style.width = handleTag.offsetLeft + "px";
      } else {
        const length = m_sliderWrapperTag.getBoundingClientRect().bottom - handleTag.getBoundingClientRect().bottom;
        m_selectionTag.style.height = length + "px";
      }
    }
    function getValidValue(value2) {
      if (value2 < m_props.min) {
        return m_props.min;
      }
      if (value2 > m_props.max) {
        return m_props.max;
      }
      if ((value2 - m_props.min) % m_props.step !== 0) {
        let steps = Math.floor((value2 - m_props.min) / m_props.step);
        return m_props.min + steps * m_props.step;
      }
      return value2;
    }
    function destroySlider() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Slider: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          value: 0,
          min: -10,
          max: 10,
          step: 1,
          largeStep: 5,
          orientation: "horizontal",
          handleTitle: "drag",
          enable: true,
          showButtons: true,
          decreaseButton: {
            attr: {
              title: "Decrease"
            }
          },
          increaseButton: {
            attr: {
              title: "Increase"
            }
          }
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "slider" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "slider" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        m_enable = m_props.enable;
        m_value = m_props.value;
        m_horizontal = m_props.orientation !== "vertical";
        m_css = m_horizontal ? m_props.css.horizontal : m_props.css.vertical;
        resolve();
      });
    }
  }
};
ui.slider = (props) => new ui.class.Slider(props);
customElements.define("mambo-slider", ui.class.Slider);
ui.class.Switch = class Switch extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_inputTag;
    let m_containerTag;
    let m_props;
    let m_enable = true;
    let m_checked = false;
    this.check = check;
    this.checked = () => m_checked;
    this.configure = configure;
    this.destroy = destroySwitch;
    this.enable = enable;
    this.getParentTag = () => self;
    this.setup = setup;
    this.toggle = toggle;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        const tagConfig = {
          name: "input",
          class: m_props.css.input,
          attr: { type: "checkbox" },
          prop: { checked: m_checked }
        };
        m_inputTag = ui.d.createTag(tagConfig);
        m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        self.classList.add(m_props.css.self);
        self.appendChild(m_inputTag);
        self.appendChild(m_containerTag);
        installLabels().then(setupEventListener).then(resolve);
      });
    }
    function installLabels() {
      return new Promise((resolve) => {
        const onTag = ui.d.createTag({
          ...m_props.tags.on,
          class: m_props.css.on,
          text: m_props.messages.checked
        });
        const offTag = ui.d.createTag({
          ...m_props.tags.off,
          class: m_props.css.off,
          text: m_props.messages.unchecked
        });
        const handleTag = ui.d.createTag({
          ...m_props.tags.handle,
          class: m_props.css.handle
        });
        m_containerTag.appendChild(onTag);
        m_containerTag.appendChild(offTag);
        m_containerTag.appendChild(handleTag);
        setEnable();
        resolve();
      });
    }
    function setupEventListener() {
      return new Promise((resolve) => {
        self.addEventListener("click", handleClick);
        resolve();
      });
    }
    function setEnable() {
      self.classList.toggle(m_props.css.disabled, !m_enable);
    }
    function handleClick(ev) {
      if (m_enable) {
        toggleSwitch(ev);
      }
    }
    function toggleSwitch(ev) {
      m_checked = !m_checked;
      setChecked(ev);
    }
    function setChecked(ev) {
      ui.d.setProps(m_inputTag, { checked: m_checked });
      if (m_props.fnChange) {
        m_props.fnChange({ Switch: self, ev });
      }
    }
    function enable(context = {}) {
      if (typeof context.enable === "undefined") {
        return m_enable;
      } else {
        setEnable(context.enable);
      }
    }
    function toggle() {
      toggleSwitch();
    }
    function check(context = {}) {
      if (typeof context.checked === "boolean") {
        m_checked = context.checked;
        setChecked();
      }
    }
    function destroySwitch() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Switch: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          enable: true,
          messages: {
            checked: "ON",
            unchecked: "OFF"
          }
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        m_enable = m_props.enable;
        m_checked = m_props.checked;
        const tags = ui.tags.getTags({ name: m_props.tag, component: "switch" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "switch" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.switch = (props) => new ui.class.Switch(props);
customElements.define("mambo-switch", ui.class.Switch);
ui.class.Tab = class Tab extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_props;
    let m_selectedId;
    let m_parentTag;
    let m_tabsTag;
    let m_tabsGroup;
    let m_contentTag;
    const m_contentTagsMap = {};
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_contentTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
        m_tabsTag = ui.d.createTag({ ...m_props.tags.tabs, class: m_props.css.tabs });
        self.classList.add(m_props.css.self);
        self.appendChild(m_tabsTag);
        self.appendChild(m_contentTag);
        installTabs().then(resolve);
      });
    }
    function installTabs() {
      return new Promise((resolve) => {
        const tabConfig = ui.utils.extend(true, m_props.tabs, {});
        tabConfig.fnClick = toggleTabContent;
        tabConfig.parentTag = m_tabsTag;
        m_tabsGroup = ui.buttonGroup(tabConfig);
        installContent().then(resolve);
      });
    }
    function installContent() {
      return new Promise((resolve) => {
        const tabPromises = m_props.tabs.buttons.map((button, index) => {
          return new Promise((resolve2) => {
            const contentTag = ui.d.createTag({ ...m_props.tags.content, class: m_props.css.content });
            if (m_selectedId === button.id) {
              contentTag.classList.add(m_props.css.selectedTab);
            } else if (!m_selectedId && index === 0) {
              contentTag.classList.add(m_props.css.selectedTab);
            }
            m_contentTagsMap[button.id] = contentTag;
            if (m_props.contents[index]) {
              contentTag.appendChild(m_props.contents[index]);
            }
            m_contentTag.appendChild(contentTag);
            if (m_props.fnTabComplete) {
              m_props.fnTabComplete(contentTag, button);
            }
            resolve2();
          });
        });
        Promise.all(tabPromises).then(resolve);
      });
    }
    function toggleTabContent(clickedBtn) {
      ui.d.removeClassAll(m_contentTagsMap, m_props.css.selectedTab);
      const tabId = clickedBtn.Button.getId();
      const selectedTab = m_contentTagsMap[tabId];
      selectedTab.classList.add(m_props.css.selectedTab);
      if (m_props.tabs.fnClick) {
        m_props.tabs.fnClick(clickedBtn);
      }
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ Tab: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          theme: "default",
          tag: "default",
          contents: []
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "tab" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "tab" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.tab = (options) => new ui.class.Tab(options);
customElements.define("mambo-tab", ui.class.Tab);
ui.class.TimePicker = class TimePicker extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_comboBox;
    let m_props;
    let m_value = null;
    this.destroy = destroyTimePicker;
    this.getParentTag = () => m_comboBox.getParentTag();
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        setupComboBox().then(resolve);
      });
    }
    function setupComboBox() {
      return new Promise((resolve) => {
        const combobox = ui.utils.extend(true, {}, m_props.combobox);
        combobox.parentTag = self;
        combobox.data = createComboBoxData();
        if (m_props.value) {
          let value2 = ui.date.getDate(m_props.value, m_props.format);
          if (value2) {
            combobox.value = ui.date.format(value2, m_props.format);
          }
        }
        combobox.fnSelect = (context) => {
          selectTime(context);
          if (m_props.combobox.fnSelect) {
            m_props.combobox.fnSelect(context);
          }
        };
        m_comboBox = ui.combobox(combobox);
        resolve();
      });
    }
    function createComboBoxData() {
      let min = ui.date.getDate(m_props.min, m_props.format);
      let max = ui.date.getDate(m_props.max, m_props.format);
      if (ui.date.isSameOrAfter(min, max)) {
        ui.date.add(max, 1, "d");
      }
      return ui.date.createInterval(m_props.interval, "m", min, max, m_props.format);
    }
    function selectTime(context) {
      m_value = context.Button ? ui.date.createDate(context.Button.text(), m_props.format) : null;
      if (m_props.fnSelect) {
        m_props.fnSelect({
          TimePicker: self,
          button: context.Button,
          ev: context.ev
        });
      }
    }
    function setValue(value2) {
      let time = ui.date.getDate(value2, m_props.format);
      m_value = ui.date.cloneDate(time);
      m_comboBox.value({ value: ui.date.format(time, m_props.format) });
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_value;
      } else {
        setValue(context.value);
      }
    }
    function destroyTimePicker() {
      m_comboBox.destroy();
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ TimePicker: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          combobox: {
            filter: false,
            dropdown: {
              button: {
                text: "watchIcon"
              }
            }
          },
          value: "",
          interval: 30,
          format: "h:mm A",
          min: ui.date.getToday(),
          max: ui.date.getToday()
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "timePicker" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "timePicker" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.timePicker = (props) => new ui.class.TimePicker(props);
customElements.define("mambo-time-picker", ui.class.TimePicker);
ui.class.TreeView = class TreeView extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_props;
    let m_treeViewData = props.data;
    const m_dataMapById = {};
    this.destroy = destroyTreeView;
    this.getItemData = getItemData;
    this.getParentTag = () => self;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        installItems(m_treeViewData).then(resolve);
      });
    }
    function installItems(groupData) {
      return new Promise((resolve) => {
        const itemPromises = groupData.map((itemData) => {
          return processItem(itemData);
        });
        Promise.all(itemPromises).then(resolve);
      });
    }
    function processItem(itemData) {
      return new Promise((resolve) => {
        let itemTag = ui.d.createTag({ ...m_props.tags.item, class: m_props.css.item });
        self.appendChild(itemTag);
        let itemId = m_props.idField in itemData ? itemData[m_props.idField] : ui.utils.getUniqueId();
        let idAtt = {};
        idAtt[m_props.itemIdAttrName] = itemId;
        m_dataMapById[itemId] = ui.utils.clone(itemData);
        delete m_dataMapById[itemId][m_props.itemsField];
        const topTag = ui.d.createTag({ ...m_props.tags.itemTop, class: m_props.css.top });
        const itemInAttr = { ...m_props.tags.itemIn.attr, ...idAtt };
        const itemInConfig = {
          ...m_props.tags.itemIn,
          class: m_props.css.in,
          attr: itemInAttr,
          text: itemData[m_props.textField]
        };
        const inTag = ui.d.createTag(itemInConfig);
        topTag.appendChild(inTag);
        itemTag.appendChild(topTag);
        setupItemEventListeners(inTag, itemData).then(() => {
          const items = itemData[m_props.itemsField];
          if (items && Array.isArray(items) && items.length > 0) {
            let groupTag = processGroup(items, itemTag);
            installIcon(topTag, groupTag, itemData).then(resolve);
          } else {
            resolve();
          }
        });
      });
    }
    function processGroup(groupData, parentTag) {
      let groupTag = ui.d.createTag({ ...m_props.tags.group, class: m_props.css.group });
      parentTag.appendChild(groupTag);
      installItems(groupData, groupTag);
      return groupTag;
    }
    function installIcon(parentTag, groupTag, itemData) {
      return new Promise((resolve) => {
        const expanded = "expanded" in itemData ? itemData.expanded : m_props.expanded;
        const iconTag = ui.d.createTag({ ...m_props.tags.icon, class: m_props.css.icon });
        iconTag.classList.add(m_props.css.iconExpand);
        ui.d.prepend(parentTag, iconTag);
        setupIconEventListeners(groupTag, iconTag);
        if (expanded) {
          toggleExpand(groupTag, iconTag);
        }
        resolve();
      });
    }
    function clearSelected() {
      let selected = ui.d.getTags(`.${m_props.css.selected}`, self);
      if (selected && selected.length > 0) {
        for (let index = 0; index < selected.length; index++) {
          selected[index].classList.remove(m_props.css.selected);
        }
      }
    }
    function setupItemEventListeners(inTag, itemData) {
      return new Promise((resolve) => {
        inTag.addEventListener("click", (ev) => {
          if (m_props.fnSelect) {
            m_props.fnSelect({
              TreeView: self,
              tag: inTag,
              itemData,
              ev
            });
          }
          if (!ev.defaultPrevented) {
            clearSelected();
            inTag.classList.add(m_props.css.selected);
          }
        });
        inTag.addEventListener("mouseenter", () => {
          if (!ui.d.hasClass(inTag, m_props.css.selected)) {
            inTag.classList.add(m_props.css.hover);
          }
        });
        inTag.addEventListener("mouseleave", () => {
          inTag.classList.remove(m_props.css.hover);
        });
        resolve();
      });
    }
    function setupIconEventListeners(groupTag, iconTag) {
      iconTag.addEventListener("click", (ev) => {
        let iconTag2 = ev.target;
        toggleExpand(groupTag, iconTag2);
      });
    }
    function toggleExpand(groupTag, iconTag) {
      groupTag.classList.toggle(m_props.css.expanded);
      iconTag.classList.toggle(m_props.css.iconCollapse);
      iconTag.classList.toggle(m_props.css.iconExpand);
    }
    function getItemData(tag) {
      let itemId = tag.getAttribute(m_props.itemIdAttrName);
      return m_dataMapById[itemId];
    }
    function destroyTreeView() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ TreeView: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          idField: "id",
          textField: "text",
          itemsField: "items",
          itemIdAttrName: "data-tree-view-item-id"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "treeView" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "treeView" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.treeView = (props) => new ui.class.TreeView(props);
customElements.define("mambo-tree-view", ui.class.TreeView);
var Template = class extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_props;
    let m_parentTag;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        resolve();
      });
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ UITemplate: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "template" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "template" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
customElements.define("mambo-template", Template);
ui.class.VideoPlayer = class VideoPlayer extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_props;
    let m_player;
    this.getPlayer = () => m_player;
    this.getPlayerTag = () => m_player.getTag();
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        m_props.player.parentTag = self;
        m_player = ui.player(m_props.player);
        resolve();
      });
    }
    function setupComplete() {
      if (m_props.fnComplete) {
        m_props.fnComplete({ VideoPlayer: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          player: {
            attr: {
              controls: true
            }
          }
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "videoPlayer" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "videoPlayer" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.videoPlayer = (props) => new ui.class.VideoPlayer(props);
customElements.define("mambo-video-player", ui.class.VideoPlayer);

return ui;
}
