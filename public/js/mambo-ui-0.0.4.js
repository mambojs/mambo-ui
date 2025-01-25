/******************************************
*  Copyright 2025 Alejandro Sebastian Scotti, Scotti Corp.
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
*  @version 0.0.4
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
ui.defaultTags = {
  button: {
    self: { name: "mambo-button" },
    button: { name: "button" }
  },
  buttonGroup: {
    self: { name: "mambo-button-group" }
  },
  buttonSVG: {
    self: { name: "mambo-button-svg" },
    button: { name: "button" }
  },
  calendar: {
    self: { name: "mambo-calendar" },
    body: { name: "mambo-calendar-body" },
    bodyContent: { name: "mambo-calendar-body-content" },
    bodyHeader: { name: "mambo-calendar-body-header" }
  },
  card: {
    self: { name: "mambo-card" },
    body: { name: "mambo-card-body" }
  },
  checkbox: {
    self: { name: "mambo-checkbox" },
    container: { name: "label" },
    input: { name: "input", attr: { type: "checkbox" } },
    span: { name: "span" },
    text: { name: "span" }
  },
  checkboxGroup: {
    self: { name: "mambo-checkbox-group" }
  },
  checkboxRadio: {
    self: { name: "mambo-checkbox-radio" },
    inputTag: { name: "input", attr: { type: "checkbox" } },
    label: { name: "label" },
    radioText: { name: "span" },
    radioSpanTag: { name: "span" }
  },
  combobox: {
    self: { name: "mambo-combobox" },
    container: { name: "mambo-combobox-container" },
    wrapper: { name: "mambo-combobox-wrapper" },
    input: { name: "mambo-input" }
  },
  datePicker: {
    self: { name: "mambo-date-picker" },
    wrapper: { name: "mambo-date-picker-wrapper" }
  },
  dialog: {
    self: { name: "mambo-dialog" },
    container: { name: "mambo-dialog-container" },
    button: { name: "mambo-dialog-button" },
    body: { name: "mambo-dialog-body" },
    header: { name: "mambo-dialog-header" },
    headerCenter: { name: "mambo-dialog-header-center" },
    headerLeft: { name: "mambo-dialog-header-left" },
    headerRight: { name: "mambo-dialog-header-right" },
    headerTitle: { name: "h3" },
    footer: { name: "mambo-dialog-footer" },
    wrapper: { name: "mambo-dialog-wrapper" }
  },
  dragDrop: {
    self: { name: "mambo-drag-drop" },
    dropText: { name: "mambo-drag-drop-text" }
  },
  draggable: {
    self: { name: "mambo-draggable" },
    draggable: { name: "mambo-draggable" }
  },
  dropdown: {
    self: { name: "mambo-dropdown" },
    container: { name: "mambo-dropdown-container" }
  },
  fileChooser: {
    self: { name: "mambo-file-chooser" }
  },
  grid: {
    self: { name: "mambo-grid" },
    colCell: { name: "mambo-col-cell" },
    body: { name: "mambo-grid-body" },
    header: { name: "mambo-grid-header" },
    headerTitle: { name: "mambo-title" },
    grid: { name: "mambo-grid" },
    row: { name: "mambo-data-grid-row", attr: {} },
    text: { name: "mambo-text" },
    tileItem: { name: "mambo-tile-item", attr: {} },
    tiles: { name: "mambo-tiles" }
  },
  input: {
    self: { name: "mambo-input" },
    container: { name: "mambo-input-container" },
    input: { name: "input", attr: { type: "text" } },
    errorIcon: { name: "i" },
    successIcon: { name: "i" },
    errorText: { name: "mambo-input-error-text" }
  },
  listbox: {
    self: { name: "mambo-listbox" },
    container: { name: "mambo-listbox-container" },
    item: { name: "mambo-listbox-item" }
  },
  listMenu: {
    self: { name: "mambo-list-menu" },
    container: { name: "mambo-list-menu-container" },
    wrapper: { name: "mambo-list-menu-wrapper" },
    body: { name: "mambo-list-menu-body" },
    title: { name: "mambo-list-menu-title" },
    subtitle: { name: "mambo-list-menu-subtitle" }
  },
  mapbox: {
    self: { name: "mambo-mapbox" },
    container: { name: "mambo-mapbox-container" },
    currentPoint: { name: "mambo-mapbox-current-point" }
  },
  pagination: {
    self: { name: "mambo-pagination" },
    container: { name: "mambo-pagination-container" },
    button: { name: "mambo-pagination-button" }
  },
  percentage: {
    self: { name: "mambo-percentage" },
    bar: { name: "mambo-percentage-bar" },
    text: { name: "mambo-percentage-text" }
  },
  player: {
    self: { name: "mambo-player" },
    controls: { name: "mambo-controls" },
    time: { name: "mambo-time-stats" },
    player: { name: "video" }
  },
  radio: {
    self: { name: "mambo-radio" },
    container: { name: "label" },
    input: { name: "input", attr: { type: "radio" } },
    span: { name: "span" },
    text: { name: "span" }
  },
  radioGroup: {
    self: { name: "mambo-radio-group" }
  },
  rating: {
    self: { name: "mambo-rating" },
    empty: { name: "mambo-rating-empty" },
    emptyStar: { name: "mambo-rating-empty-star" },
    hover: { name: "mambo-rating-hover" },
    hoverStar: { name: "mambo-rating-hover-star" },
    selected: { name: "mambo-rating-selected" },
    selectedStar: { name: "mambo-rating-selected-star" }
  },
  search: {
    self: { name: "mambo-search" },
    inputContainer: { name: "mambo-search-input-container" },
    wrapper: { name: "mambo-search-wrapper" }
  },
  slideout: {
    self: { name: "mambo-slideout" },
    body: { name: "mambo-slideout-body" },
    header: { name: "mambo-slideout-header" },
    overlay: { name: "mambo-slideout-overlay" }
  },
  slider: {
    self: { name: "mambo-slider" },
    handle: { name: "mambo-slider-handle" },
    selection: { name: "mambo-slider-selection" },
    step: { name: "mambo-slider-step" },
    stepLarge: { name: "mambo-slider-step-large" },
    stepsContainer: { name: "mambo-slider-steps-container" },
    track: { name: "mambo-slider-track" },
    wrapper: { name: "mambo-slider-wrapper" }
  },
  switch: {
    self: { name: "mambo-switch" },
    container: { name: "mambo-switch-container" },
    handle: { name: "mambo-switch-handle" },
    off: { name: "mambo-switch-label-off" },
    on: { name: "mambo-switch-label-on" },
    text: { name: "mambo-switch-text" }
  },
  tab: {
    self: { name: "mambo-tab" },
    content: { name: "mambo-tab-content" },
    body: { name: "mambo-tab-body" },
    tabs: { name: "mambo-tabs" }
  },
  textarea: {
    self: { name: "mambo-textarea" },
    textarea: { name: "textarea", attr: {} },
    span: { name: "span" },
    buttonsContainer: { name: "mambo-textarea-buttons-container" },
    iconsContainer: { name: "mambo-textarea-icons-container" },
    footer: { name: "mambo-textarea-footer" },
    iconRequired: { name: "i" },
    textRequired: { name: "mambo-textarea-text-required" },
    containerUp: { name: "mambo-textarea-container-up" },
    containerDown: { name: "mambo-textarea-container-down" }
  },
  timePicker: {
    self: { name: "mambo-time-picker" }
  },
  toaster: {
    self: { name: "mambo-toaster" },
    button: { name: "mambo-toaster-button" },
    body: { name: "mambo-toaster-body" },
    buttonContainer: { name: "mambo-toaster-button-container" },
    iconContainer: { name: "mambo-toaster-icon-container" },
    wrapper: { name: "mambo-toaster-wrapper" }
  },
  tooltip: {
    self: { name: "mambo-tooltip" },
    body: { name: "mambo-tooltip-body" }
  },
  treeView: {
    self: { name: "mambo-tree-view" },
    group: { name: "mambo-tree-view-group" },
    icon: { name: "icon" },
    item: { name: "mambo-tree-view-item" },
    itemIn: { name: "mambo-tree-view-item-in" },
    itemTop: { name: "mambo-tree-view-item-top" }
  },
  template: {
    self: { name: "mambo-template" }
  },
  videoPlayer: {
    self: { name: "mambo-video-player" }
  }
};
ui.class.Tags = class Tags {
  constructor() {
    this.m_tags = {
      default: ui.defaultTags
    };
  }
  getTags(context) {
    if (context && context.name && context.component) {
      if (context.name in this.m_tags) {
        return this.m_tags[context.name][context.component];
      }
    }
  }
  addTags(context) {
    if (!context || !context.name || !context.tags) {
      throw "Tags() you invoked addTags() but failed to define the tags name.";
    }
    if (this.m_tags[context.name] && !this.m_tags[context.override]) {
      throw `Tags() you have attempted to override the tags name ${context.name}. Please add the property 'override:true' to succesfully override the tags.`;
    }
    this.m_tags[context.name] = context.theme;
  }
};
ui.tags = new ui.class.Tags();
ui.defaultTheme = {
  button: {
    button: "m-button-button",
    disabled: "m-button-disabled",
    hover: "m-hover",
    img: "m-button-img",
    icon: "m-button-icon",
    selected: "m-selected",
    self: "m-button-self",
    pressed: "m-pressed"
  },
  buttonGroup: {
    button: {
      button: "m-button-group-button",
      img: "m-button-group-img"
    },
    self: "m-button-group-self"
  },
  buttonSVG: {
    button: "m-buttonsvg-button",
    disabled: "m-buttonsvg-disabled",
    hover: "m-hover",
    img: "m-buttonsvg-img",
    selected: "m-selected",
    self: "m-buttonsvg-self"
  },
  calendar: {
    body: "m-calendar-body",
    bodyContent: "m-calendar-body-content",
    bodyHeader: "m-calendar-body-header",
    currentDate: "m-current-date",
    datesButtonGroup: {
      button: {
        button: "m-dates-button-group-button",
        disabled: "m-dates-button-group-button-disabled"
      },
      self: "m-dates-button-group"
    },
    datesHeader: {
      tileItem: "m-dates-header-day",
      tiles: "m-dates-header-parent"
    },
    decadesButtonGroup: {
      button: {
        button: "m-decades-button-group-button",
        disabled: "m-decades-button-group-button-disabled"
      },
      self: "m-decades-button-group"
    },
    footerButton: {
      button: "m-calendar-footer-button",
      disabled: "m-calendar-footer-button-disabled"
    },
    headerButtonGroup: {
      self: "m-calendar-header-button-group"
    },
    monthsButtonGroup: {
      button: {
        button: "m-months-button-group-button",
        disabled: "m-months-button-group-button-disabled"
      },
      self: "m-months-button-group"
    },
    otherCentury: "m-other-century",
    otherDecade: "m-other-decade",
    otherMonth: "m-other-month",
    self: "m-calendar-self",
    yearsButtonGroup: {
      button: {
        button: "m-years-button-group-button",
        disabled: "m-years-button-group-button-disabled"
      },
      self: "m-years-button-group"
    }
  },
  card: {
    body: "m-card-body"
  },
  checkboxRadio: {
    radioParent: "m-checkbox-radio-parent",
    radioText: "m-checkbox-radio-text-span",
    checkbox: {
      input: "m-checkbox-input",
      span: "m-checkbox-span"
    },
    radio: {
      input: "m-radio-input",
      span: "m-radio-span"
    },
    disabled: "m-checkbox-radio-disabled"
  },
  checkbox: {
    container: "m-checkbox-container",
    text: "m-checkbox-text-span",
    input: "m-checkbox-input",
    span: "m-checkbox-span",
    disabled: "m-checkbox-disabled",
    self: "m-checkbox-self"
  },
  checkboxGroup: {
    checkbox: {
      input: "m-checkbox-group-input",
      span: "m-checkbox-group-span",
      label: "m-checkbox-group-label"
    },
    self: "m-checkbox-group-self"
  },
  combobox: {
    buttonGroup: {
      button: {
        button: "m-combobox-button-group-button"
      },
      self: "m-combobox-button-group"
    },
    dropdown: {
      button: {
        button: "m-combobox-button"
      },
      container: "m-combobox-dropdown-container",
      self: "m-combobox-dropdown-parent"
    },
    container: "m-combobox-container",
    wrapper: "m-dropdown-wrapper",
    input: {
      input: "m-combobox-input-input",
      inputWrapper: "m-combobox-input-wrapper"
    },
    self: "m-combobox-self"
  },
  datePicker: {
    calendar: {
      body: "m-date-picker-calendar-body",
      bodyContent: "m-date-picker-calendar-body-content",
      bodyHeader: "m-date-picker-calendar-body-header",
      headerButtonGroup: {
        self: "m-date-picker-calendar-header"
      },
      self: "m-date-picker-calendar-parent"
    },
    dropdown: {
      button: {
        button: "m-date-picker-button fa-regular fa-calendar-days"
      },
      container: "m-date-picker-dropdown-container",
      self: "m-date-picker-dropdown-parent"
    },
    dropdownWrapper: "m-date-picker-dropdown-wrapper",
    input: {
      self: "m-date-picker-input-self",
      input: "m-date-picker-input-input",
      container: "m-date-picker-input-container"
    },
    self: "m-date-picker-self"
  },
  dialog: {
    container: "m-dialog-container",
    body: "m-dialog-body",
    button: {
      button: "m-dialog-button fa-solid fa-xmark"
    },
    buttonLeft: {
      button: "m-dialog-button fa-solid fa-xmark left"
    },
    header: "m-dialog-header",
    headerCenter: "m-dialog-header-center",
    headerLeft: "m-dialog-header-left",
    headerRight: "m-dialog-header-right",
    headerTitle: "m-dialog-header-title",
    footer: "m-dialog-footer",
    self: "m-dialog-self"
  },
  dragDrop: {
    dropText: "m-drag-drop-text",
    dropIcon: "m-drag-drop-icon fa-regular fa-file",
    self: "m-drag-drop-self"
  },
  draggable: {
    draggable: "m-draggable",
    self: "m-draggable-self"
  },
  dropdown: {
    button: {
      button: "m-dropdown-button",
      self: "m-dropdown-button-self"
    },
    container: "m-dropdown-container",
    open: "m-open",
    self: "m-dropdown-self"
  },
  fileChooser: {
    button: {
      button: "m-file-chooser-button",
      self: "m-file-chooser-button-self"
    },
    input: {
      input: "m-file-chooser-input",
      label: "m-file-chooser-label",
      self: "m-file-chooser-input-self"
    },
    self: "m-file-chooser-self",
    wrapper: "m-file-chooser-input-wrapper"
  },
  grid: {
    body: "m-grid-body",
    button: "m-grid-button",
    calendarParent: "m-grid-calendar-parent",
    cell: "m-grid-cell",
    colCell: "m-grid-col-cell",
    comboboxDropDownContainer: "m-grid-combobox-dropdown-container",
    comboboxParent: "m-grid-combobox-parent",
    datePickerParent: "m-grid-date-picker-parent",
    dropDownContainer: "m-grid-dropdown-container",
    dropDownParent: "m-grid-dropdown-parent",
    dropImgDropIcon: "m-grid-drag-drop-icon",
    dropParent: "m-grid-drag-drop-parent",
    dropText: "m-grid-drag-drop-text",
    grid: "m-grid",
    header: "m-grid-hdr",
    headerTitle: "m-grid-title",
    input: "m-grid-input",
    inputContainer: "m-grid-input-container",
    row: "m-grid-row",
    self: "m-grid-self",
    text: "m-grid-text",
    tileItem: "m-tile-item",
    tiles: "m-tiles",
    timePickerDropDownContainer: "m-grid-time-picker-dropdown-container",
    timePickerParent: "m-grid-time-picker-parent",
    treeViewParent: "m-grid-tree-view-parent"
  },
  input: {
    container: "m-input-container",
    clearButton: {
      button: "m-input-button fa-solid fa-xmark"
    },
    leftButton: {
      button: "m-input-button fa-solid fa-eye-slash"
    },
    input: "m-input-input",
    label: "m-input-label",
    self: "m-input-self",
    icon: "m-input-icon",
    errorIcon: "m-input-error-icon fa-solid fa-exclamation-triangle hidden",
    successIcon: "m-input-success-icon fa-solid fa-check hidden",
    errorText: "m-input-error-text hidden"
  },
  listbox: {
    container: "m-listbox-container",
    item: "m-listbox-item",
    self: "m-listbox-self"
  },
  listMenu: {
    self: "m-list-menu-self",
    container: "m-list-menu-container",
    wrapper: "m-list-menu-wrapper",
    body: "m-list-menu-body",
    title: "m-list-menu-title",
    subtitle: "m-list-menu-subtitle",
    icon: "m-list-menu-icon"
  },
  mapbox: {
    container: "m-mapbox-container",
    currentPoint: "m-mapbox-current-point",
    hidewait: "m-mapbox-hide-wait",
    self: "m-mapbox-self"
  },
  pagination: {
    self: "m-pagination-self",
    container: "m-pagination-container"
  },
  percentage: {
    bar: "m-percentage-bar",
    self: "m-percentage-self",
    text: "m-percentage-text"
  },
  player: {
    player: "m-player-player",
    self: "m-player-self"
  },
  radio: {
    container: "m-radio-container",
    text: "m-radio-text",
    input: "m-radio-input",
    span: "m-radio-span",
    disabled: "m-radio-disabled",
    self: "m-radio-self"
  },
  radioGroup: {
    radio: {
      input: "m-radio-group-input",
      span: "m-radio-group-span",
      label: "m-radio-group-label"
    },
    self: "m-radio-group-self"
  },
  rating: {
    disabled: "m-rating-disabled",
    empty: "m-rating-empty",
    emptyStar: "m-rating-empty-star",
    hover: "m-rating-hover",
    hoverStar: "m-rating-hover-star",
    selected: "m-rating-selected",
    selectedStar: "m-rating-selected-star",
    self: "m-rating-self"
  },
  search: {
    dropdown: {
      button: {
        button: "m-search-button fa-solid fa-magnifying-glass"
      },
      container: "m-search-dropdown-container",
      self: "m-search-dropdown-parent"
    },
    input: {
      input: "m-search-input-input",
      inputWrapper: "m-search-input-wrapper"
    },
    inputContainer: "m-search-input-container",
    listbox: {
      item: "m-search-listbox-item"
    },
    searchButton: {
      button: "m-search-button fa-solid fa-magnifying-glass"
    },
    self: "m-search-self",
    wrapper: "m-search-dropdown-wrapper"
  },
  slideout: {
    body: "m-slideout-body",
    header: "m-slideout-header",
    open: "m-open",
    openAnimation: "m-fade-in",
    overlay: "m-slideout-overlay",
    self: "m-slideout-self",
    button: { button: "m-slideout-close-button fa-solid fa-xmark" }
  },
  slider: {
    disabled: "m-slider-disabled",
    horizontal: {
      decreaseButton: {
        button: "m-slider-button-decrease-horizontal fa-solid fa-caret-left"
      },
      handle: "m-slider-handle-horizontal",
      increaseButton: {
        button: "m-slider-button-increase-horizontal fa-solid fa-caret-right"
      },
      self: "m-slider-parent-horizontal",
      selection: "m-slider-selection-horizontal",
      step: "m-slider-step-horizontal",
      stepLarge: "m-slider-step-large-horizontal",
      stepLargeSpan: "m-slider-step-large-span-horizontal",
      stepsContainer: "m-slider-steps-container-horizontal",
      track: "m-slider-track-horizontal",
      wrapper: "m-slider-wrapper-horizontal"
    },
    self: "m-slider-self",
    vertical: {
      decreaseButton: {
        button: "m-slider-button-decrease-vertical fa-solid fa-caret-down"
      },
      handle: "m-slider-handle-vertical",
      increaseButton: {
        button: "m-slider-button-increase-vertical fa-solid fa-caret-up"
      },
      self: "m-slider-parent-vertical",
      selection: "m-slider-selection-vertical",
      step: "m-slider-step-vertical",
      stepLarge: "m-slider-step-large-vertical",
      stepLargeSpan: "m-slider-step-large-span-vertical",
      stepsContainer: "m-slider-steps-container-vertical",
      track: "m-slider-track-vertical",
      wrapper: "m-slider-wrapper-vertical"
    }
  },
  switch: {
    container: "m-switch-container",
    disabled: "m-switch-disabled",
    handle: "m-switch-handle",
    input: "m-switch-input",
    off: "m-switch-label-off",
    on: "m-switch-label-on",
    text: "m-switch-text",
    self: "m-switch-self"
  },
  tab: {
    body: "m-tab-body",
    content: "m-tab-content",
    selectedTab: "m-selected",
    self: "m-tab-self",
    tabs: "m-tabs"
  },
  textarea: {
    cancelButton: {
      button: "m-input-button fa-solid fa-xmark cancel-btn"
    },
    editButton: {
      button: "m-input-button fa-solid fa-edit edit-btn"
    },
    checkButton: {
      button: "m-input-button fa-solid fa-check check-btn"
    },
    buttonsContainer: "m-textarea-buttons-container",
    containerDown: "m-textarea-container-down",
    containerUp: "m-textarea-container-up",
    footer: "m-textarea-footer",
    iconsContainer: "m-textarea-icons-container",
    iconRequired: "m-textarea-icon-required fa-solid fa-exclamation-triangle hidden",
    label: "m-textarea-label",
    span: "m-textarea-span",
    self: "m-textarea-self",
    textarea: "m-textarea-textarea",
    textRequired: "m-textarea-text-required hidden"
  },
  timePicker: {
    combobox: {
      dropdown: {
        button: {
          button: "m-time-picker-combobox-button fa-regular fa-clock"
        },
        container: "m-time-picker-dropdown-container"
      },
      self: "m-time-picker-combobox"
    },
    self: "m-time-picker-self"
  },
  toaster: {
    body: "m-toaster-body",
    iconContainer: "m-toaster-icon-container",
    buttonContainer: "m-toaster-button-container",
    button: {
      button: "m-toaster-button fa-solid fa-xmark"
    },
    self: "m-toaster-self",
    icon: {
      success: "fa-solid fa-check-circle",
      warning: "fa-solid fa-exclamation-triangle",
      error: "fa-solid fa-exclamation-triangle",
      info: "fa-solid fa-info-circle"
    },
    size: {
      small: "m-toaster-small",
      medium: "m-toaster-medium",
      large: "m-toaster-large"
    },
    type: {
      error: "m-toaster-error",
      info: "m-toaster-info",
      success: "m-toaster-success",
      warning: "m-toaster-warning"
    },
    position: {
      left: "m-toaster-left",
      center: "m-toaster-center",
      centerV: "m-toaster-center-v",
      right: "m-toaster-right",
      top: "m-toaster-top",
      bottom: "m-toaster-bottom"
    },
    animation: {
      topBottomIn: "m-toaster-slide-in-top",
      bottomTopIn: "m-toaster-slide-in-bottom",
      topBottomOut: "m-toaster-slide-out-top",
      bottomTopOut: "m-toaster-slide-out-bottom"
    }
  },
  tooltip: {
    body: "m-tooltip-body",
    self: "m-tooltip-self",
    open: "m-tooltip-open"
  },
  treeView: {
    expanded: "m-expanded",
    group: "m-tree-view-group",
    hover: "m-hover",
    icon: "m-tree-view-item-icon fa-solid",
    iconCollapse: "fa-caret-down",
    iconExpand: "fa-caret-right",
    in: "m-tree-view-item-in",
    item: "m-tree-view-item",
    selected: "m-selected",
    self: "m-tree-view-self",
    itemTop: "m-tree-view-item-top"
  },
  videoPlayer: {
    self: "m-video-player-self"
  }
};
ui.class.Theme = class Theme {
  constructor() {
    this.m_themes = {
      default: ui.defaultTheme
    };
    this.linkClass = "mambo-stylesheet";
  }
  loadStylesheets(context) {
    return new Promise((resolve) => {
      context?.stylesheets?.forEach((href) => {
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href = href;
        link.className = context.linkClass || this.linkClass;
        document.head.appendChild(link);
      });
      resolve();
    });
  }
  async reloadStylesheets(context) {
    const links = document.querySelectorAll(`link.${context.linkClass || this.linkClass}`);
    await this.loadStylesheets(context);
    setTimeout(() => {
      if (links?.length > 0) {
        links.forEach((link) => link.remove());
      }
    }, 100);
  }
  getTheme(context) {
    if (context && context.name && context.component) {
      if (context.name in this.m_themes) {
        return this.m_themes[context.name][context.component];
      }
    }
  }
  addTheme(context) {
    if (!context || !context.name || !context.theme) {
      throw "Theme: you invoked addTheme() but failed to define the theme name and/or theme.";
    }
    if (this.m_themes[context.name] && !this.m_themes[context.override]) {
      throw `Theme: you have attempted to override the theme name ${context.name}. Please add the property 'override:true' to succesfully override the theme.`;
    }
    this.m_themes[context.name] = context.theme;
  }
};
ui.theme = new ui.class.Theme();
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
        console.error(`${self?.constructor?.name}() prop parentTag not passed in.`, m_props);
        reject();
      } else {
        ui.d.append(m_parentTag, self, m_props?.installPrepend);
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
    const m_iconList = [];
    let m_parentTag;
    let m_props;
    let m_buttonTag;
    let m_text = "";
    let m_enable = true;
    this.deselect = deselectBtn;
    this.enable = enable;
    this.getConfig = () => m_props;
    this.getId = () => m_props.id;
    this.setId = (id) => m_props.id = id;
    this.getImageTagById = getImageTagById;
    this.getIconTagById = getIconTagById;
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        const tagConfig = { ...m_props.tags.button };
        let buttonClasses = [m_props.css.button];
        if (m_props.size)
          buttonClasses.push(m_props.size);
        if (!m_props.text)
          buttonClasses.push("no-text");
        if (m_props.type)
          buttonClasses.push(m_props.type);
        tagConfig.class = buttonClasses.join(" ");
        tagConfig.text = m_props.text;
        tagConfig.event = {
          click: handleClick,
          mousedown: handleMouseDown,
          mouseup: handleMouseUp,
          mouseenter: () => {
            mouseEnterOverButton();
            mouseEnterOverImage();
          },
          mouseleave: () => {
            mouseLeaveOverButton();
            mouseLeaveOverImage();
          },
          touchstart: handleTouchStart,
          touchend: handleTouchEnd
        };
        m_buttonTag = ui.d.createTag(tagConfig);
        if (m_props.img) {
          insertGraphic();
        }
        if (m_props.icon) {
          insertIcon();
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
        if (img.position === "left") {
          m_buttonTag.insertBefore(imgTag, m_buttonTag.firstChild);
        } else {
          m_buttonTag.appendChild(imgTag);
        }
      }
    }
    function insertIcon() {
      if (Array.isArray(m_props.icon)) {
        m_props.icon.forEach((icon) => {
          addIcon(icon);
        });
      } else {
        addIcon(m_props.icon);
      }
      function addIcon(icon) {
        const cssClasses = [m_props.css.icon, icon.attr.class, icon.size].filter(Boolean).join(" ");
        const tagConfig = {
          class: cssClasses,
          prop: icon.prop,
          attr: icon.attr
        };
        let iconTag = ui.d.createTag("i", tagConfig);
        m_iconList.push(iconTag);
        if (icon.position === "left") {
          m_buttonTag.insertBefore(iconTag, m_buttonTag.firstChild);
        } else {
          m_buttonTag.appendChild(iconTag);
        }
      }
    }
    function getImageTagById(id) {
      return m_imageList.find((img) => img.id === id);
    }
    function getIconTagById(id) {
      return m_iconList.find((icon) => icon.id === id);
    }
    function handleClick(ev) {
      if (m_enable) {
        if (m_props.preventDefault) {
          ev.preventDefault();
        }
        if (m_props.stopPropagation) {
          ev.stopPropagation();
        }
        if (m_props.onClick) {
          m_props.onClick({
            Button: self,
            ev
          });
        }
        if (m_props.onGroupClick) {
          m_props.onGroupClick({
            Button: self,
            ev
          });
        }
      }
    }
    function handleMouseDown(ev) {
      if (m_enable) {
        m_buttonTag.classList.add(m_props.css.pressed);
        if (m_props.onMouseDown) {
          m_props.onMouseDown({
            Button: self,
            ev
          });
        }
      }
    }
    function handleMouseUp(ev) {
      if (m_enable) {
        m_buttonTag.classList.remove(m_props.css.pressed);
        if (m_props.onMouseUp) {
          m_props.onMouseUp({
            Button: self,
            ev
          });
        }
      }
    }
    function handleTouchStart(ev) {
      if (m_enable) {
        m_buttonTag.classList.add(m_props.css.pressed);
        if (m_props.onTouchStart) {
          m_props.onTouchStart({
            Button: self,
            ev
          });
        }
      }
    }
    function handleTouchEnd(ev) {
      if (m_enable) {
        m_buttonTag.classList.remove(m_props.css.pressed);
        if (m_props.onTouchEnd) {
          m_props.onTouchEnd({
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
      if (m_props.onComplete) {
        m_props.onComplete({ Button: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          text: "Mambo Button",
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
customElements.define(ui.defaultTags.button.self.name, ui.class.Button);
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
    this.getButtons = () => m_buttonsList;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        ui.d.setAttr(self, m_props.tags.self.attr);
        ui.d.setProps(self, m_props.tags.self.prop);
        self.classList.add(m_props.css.self);
        const buttonPromises = [];
        m_props.buttons.forEach((button, index) => {
          button.id = button.id ? button.id : index;
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
        button.onGroupClick = m_props.onGroupClick;
        button.parentTag = self;
        m_buttonsList.push(ui.button(button));
        resolve();
      });
    }
    function handleGroupBtnClick(context) {
      deselectBtns();
      if (m_props.onClick) {
        m_props.onClick(context);
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
      if (m_props.onComplete) {
        m_props.onComplete({ ButtonGroup: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          buttons: [],
          tag: "default",
          theme: "default",
          onGroupClick: handleGroupBtnClick
        };
        const tags = ui.tags.getTags({ name: m_props.tag, component: "buttonGroup" });
        m_props.tags = ui.utils.extend(true, tags, customProps.tags);
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "buttonGroup" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.buttonGroup = (props) => new ui.class.ButtonGroup(props);
customElements.define(ui.defaultTags.buttonGroup.self.name, ui.class.ButtonGroup);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
        if (m_props.onClick) {
          m_props.onClick({
            Button: self,
            ev
          });
        }
        if (m_props.onGroupClick) {
          m_props.onGroupClick({
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
      if (m_props.onComplete) {
        m_props.onComplete({ Button: self });
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
customElements.define(ui.defaultTags.buttonSVG.self.name, ui.class.ButtonSVG);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
        buttonGroup.onComplete = resolve;
        buttonGroup.buttons.forEach((button, index) => {
          button.onComplete = (context) => {
            m_headerButtonsList[index] = context.Button;
            if (m_props.headerButtonGroup.buttons[index].onComplete) {
              m_props.headerButtonGroup.buttons[index].onComplete(context);
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
          button.onComplete = resolve;
          let today = ui.date.getToday();
          button.id = ui.date.format(today, m_idFormat);
          button.text = ui.date.format(today, m_props.footer);
          if (ui.date.isBefore(today, m_minDate) || ui.date.isAfter(today, m_maxDate)) {
            button.enable = false;
          }
          button.onClick = (context) => {
            m_depth = m_minDepth;
            selectValue(context.Button, context.ev);
            if (m_props.footerButton.onClick) {
              m_props.footerButton.onClick(context);
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
        if (m_props.headerButtonGroup.buttons[index].onEnabled) {
          button.enable({
            enable: m_props.headerButtonGroup.buttons[index].onEnabled()
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
      const i = m_props.headerButtonGroup.buttons.findIndex((button) => button.onDynamicHeaderText);
      if (i) {
        m_props.headerButtonGroup.buttons[i].onDynamicHeaderText(m_headerButtonsList[i]);
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
        buttonGroup.onComplete = (context) => {
          if (m_props.datesButtonGroup?.onComplete) {
            m_props.datesButtonGroup.onComplete(context);
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
          onClick: (context) => {
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
        buttonGroup.onComplete = (context) => {
          if (m_props.monthsButtonGroup?.onComplete) {
            m_props.monthsButtonGroup.onComplete(context);
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
          onClick: (context) => {
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
        buttonGroup.onComplete = (context) => {
          if (m_props.yearsButtonGroup?.onComplete) {
            m_props.yearsButtonGroup.onComplete(context);
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
          onClick: (context) => {
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
        buttonGroup.onComplete = (context) => {
          if (m_props.decadesButtonGroup?.onComplete) {
            m_props.decadesButtonGroup.onComplete(context);
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
          onClick: (context) => {
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
      if (buttonGroup?.onClick) {
        buttonGroup.onClick(context);
      }
    }
    function selectValue(button, ev) {
      let value2 = ui.date.createDate(button.getId(), m_idFormat);
      if (m_depth <= m_minDepth) {
        setValue(value2);
        if (m_props.onSelect) {
          m_props.onSelect({ Calendar: self, ev });
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
      if (m_props.onComplete) {
        m_props.onComplete({ Calendar: self });
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
                text: "",
                css: {
                  button: "m-prev-button",
                  disabled: "m-calendar-header-button-disabled"
                },
                onClick: navigateToPast,
                onEnabled: canNavigatePast
              },
              {
                css: {
                  button: "m-fast-button",
                  disabled: "m-calendar-header-button-disabled"
                },
                onClick: navigateUp,
                onEnabled: canNavigateUp,
                onDynamicHeaderText: getDepthButtonText
              },
              {
                text: "",
                css: {
                  button: "m-next-button",
                  disabled: "m-calendar-header-button-disabled"
                },
                onClick: navigateToFuture,
                onEnabled: canNavigateFuture
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
customElements.define(ui.defaultTags.calendar.self.name, ui.class.Calendar);
ui.class.Card = class Card extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_bodyTag;
    let m_props;
    this.getParentTag = () => m_parentTag;
    this.getBodyTag = () => m_bodyTag;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_bodyTag = ui.d.createTag({
          ...m_props.tags.body,
          class: m_props.css.body
        });
        m_bodyTag.innerHTML = m_props.content;
        self.appendChild(m_bodyTag);
        resolve();
      });
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Card: self });
      }
    }
    function configure(customProps = {}) {
      m_props = {
        tag: "default",
        theme: "default"
      };
      m_props = ui.utils.extend(true, m_props, customProps);
      m_parentTag = ui.d.getTag(m_props.parentTag);
      const tags = ui.tags.getTags({ name: m_props.tag, component: "card" });
      m_props.tags = ui.utils.extend(true, tags, m_props.tags);
      const css = ui.theme.getTheme({ name: m_props.theme, component: "card" });
      m_props.css = ui.utils.extend(true, css, m_props.css);
    }
  }
};
ui.card = (props) => new ui.class.Card(props);
customElements.define(ui.defaultTags.card.self.name, ui.class.Card);
ui.class.Checkbox = class Checkbox extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_containerTag;
    let m_inputTag;
    let m_spanTag;
    let m_props;
    let m_enabled;
    let m_checked;
    this.destroy = destroyCheckbox;
    this.enable = enable;
    this.getId = () => m_props.id;
    this.getParentTag = () => m_containerTag;
    this.select = select;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        if (m_props.position === "right") {
          m_containerTag.classList.add("right");
        }
        self.classList.add(m_props.css.self);
        self.appendChild(m_containerTag);
        const textTag = ui.d.createTag({
          ...m_props.tags.text,
          class: m_props.css.text,
          text: m_props.text
        });
        const inputConfig = {
          ...m_props.tags.input,
          class: m_props.css.input,
          text: m_props.value,
          prop: { checked: m_props.checked },
          event: { click: handleClick }
        };
        inputConfig.attr.name = m_props.name;
        m_inputTag = ui.d.createTag(inputConfig);
        m_spanTag = ui.d.createTag({ ...m_props.tags.span, class: m_props.css.span });
        if (m_props.position === "right") {
          m_containerTag.appendChild(textTag);
          m_containerTag.appendChild(m_inputTag);
          m_containerTag.appendChild(m_spanTag);
        } else {
          m_containerTag.appendChild(m_inputTag);
          m_containerTag.appendChild(m_spanTag);
          m_containerTag.appendChild(textTag);
        }
        setEnable();
        resolve();
      });
    }
    function handleClick(ev) {
      if (m_enabled) {
        m_checked = !m_checked;
        if (m_props.onClick) {
          m_props.onClick({ Checkbox: self, ev });
        }
        if (m_props.onGroupClick) {
          m_props.onGroupClick({ Checkbox: self, ev });
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
      if (m_enabled) {
        if (notTrigger) {
          m_inputTag.click();
        }
      }
    }
    function enable({ enable: enable2 }) {
      if (!enable2) {
        return m_enabled;
      } else {
        m_enabled = enable2;
        setEnable();
      }
    }
    function setEnable() {
      m_containerTag.classList.toggle(m_props.css.disabled, !m_enabled);
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_inputTag.value;
      } else {
        m_inputTag.value = context.value;
      }
    }
    function destroyCheckbox() {
      ui.d.remove(m_containerTag);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Checkbox: self });
      }
    }
    function configure(customProps = {}) {
      m_props = {
        enable: true,
        name: Math.random().toString(36).slice(2),
        tag: "default",
        theme: "default",
        position: "left"
      };
      m_props = ui.utils.extend(true, m_props, customProps);
      m_parentTag = ui.d.getTag(m_props.parentTag);
      m_checked = m_props.checked;
      m_enabled = m_props.enable;
      const tags = ui.tags.getTags({ name: m_props.tag, component: "checkbox" });
      m_props.tags = ui.utils.extend(true, tags, m_props.tags);
      const css = ui.theme.getTheme({ name: m_props.theme, component: "checkbox" });
      m_props.css = ui.utils.extend(true, css, m_props.css);
    }
  }
};
ui.checkbox = (props) => new ui.class.Checkbox(props);
customElements.define(ui.defaultTags.checkbox.self.name, ui.class.Checkbox);
ui.class.CheckboxGroup = class CheckboxGroup extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_checkboxList = [];
    let m_parentTag;
    let m_props;
    this.clear = clear;
    this.destroy = destroyCheckboxGroup;
    this.getParentTag = () => self;
    this.getTag = getTagById;
    this.select = select;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        const checkboxPromises = [];
        m_props.checkboxes.forEach((checkbox, index) => {
          checkboxPromises.push(processCheckbox(checkbox, index));
        });
        Promise.all(checkboxPromises).then(resolve);
      });
    }
    function processCheckbox(checkbox, index) {
      return new Promise((resolve) => {
        checkbox.id = checkbox.id ? checkbox.id : index;
        const checkboxConfig = {
          ...m_props.checkbox,
          class: m_props.css.checkbox,
          ...checkbox,
          name: m_props.name,
          parentTag: self,
          onGroupClick: handleGroupClick,
          onComplete: resolve,
          position: checkbox.position || m_props.position
        };
        m_checkboxList.push(ui.checkbox(checkboxConfig));
      });
    }
    function handleGroupClick(context) {
      if (m_props.onClick) {
        m_props.onClick(context);
      }
      if (m_props.onGroupClick) {
        m_props.onGroupClick({
          CheckboxGroup: self,
          Checkbox: context.Checkbox,
          ev: context.ev
        });
      }
    }
    function getTag(id) {
      return m_checkboxList.find((tag) => tag.getId() === id);
    }
    function getSelected() {
      return m_checkboxList.filter((tag) => tag.select());
    }
    function selectTag(tag, notTrigger) {
      if (tag) {
        tag.select({ value: true, notTrigger });
      }
    }
    function getTagById(context = {}) {
      return getTag(context.id);
    }
    function clear() {
      m_checkboxList.forEach((tag) => {
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
    function destroyCheckboxGroup() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ CheckboxRadioGroup: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          name: Math.random().toString(36).slice(2),
          checkboxes: [],
          position: "right"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "checkboxGroup" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.checkboxGroup = (props) => new ui.class.CheckboxGroup(props);
customElements.define(ui.defaultTags.checkboxGroup.self.name, ui.class.CheckboxGroup);
ui.class.Combobox = class Combobox extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_containerTag;
    let m_labelTag;
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      await setupContainer();
      await setupInput();
      await setupLabel();
      await setupDropdown();
      setupLabelForAttr();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        resolve();
      });
    }
    function setupContainer() {
      return new Promise((resolve) => {
        m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        self.appendChild(m_containerTag);
        resolve();
      });
    }
    function setupLabel() {
      return new Promise((resolve) => {
        if (m_props.labelText) {
          const labelTagConfig = {
            name: "label",
            class: m_props.css.label,
            prop: m_props.prop,
            text: m_props.labelText
          };
          m_labelTag = ui.d.createTag(labelTagConfig);
          self.prepend(m_labelTag);
        }
        resolve();
      });
    }
    function setupInput() {
      return new Promise((resolve) => {
        let input = ui.utils.extend(true, {}, m_props.input);
        input.css = ui.utils.extend(true, m_props.css.input, input.css);
        input.parentTag = m_containerTag;
        m_input = ui.input({ ...input, onComplete: resolve() });
      });
    }
    function setupDropdown() {
      return new Promise((resolve) => {
        m_dropdownWrapperTag = ui.d.createTag({ ...m_props.tags.wrapper, class: m_props.css.wrapper });
        m_containerTag.appendChild(m_dropdownWrapperTag);
        let dropdown = ui.utils.extend(true, {}, m_props.dropdown);
        dropdown.css = ui.utils.extend(true, m_props.css.dropdown, dropdown.css);
        dropdown.onBeforeClose = (context) => {
          const result = m_props.dropdown.onBeforeClose ? m_props.dropdown.onBeforeClose(context) : true;
          return (!context.ev || !m_input.getTag().contains(context.ev.target)) && result;
        };
        dropdown.onComplete = (context) => {
          installButtonGroup(context.Dropdown, m_comboBoxData);
          if (m_props.dropdown.onComplete) {
            m_props.dropdown.onComplete(context);
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
      buttonGroup.onClick = (context) => {
        let text = context.Button.text();
        m_input.value({ value: text });
        m_previous_text = text;
        m_value = context.Button.getId();
        m_input.getTag().classList.add("m-selected");
        dropdown.close();
        if (m_props.onSelect) {
          m_props.onSelect({
            Combobox: self,
            button: context.Button,
            ev: context.ev
          });
        }
        if (m_props.buttonGroup.onClick) {
          m_props.buttonGroup.onClick(context);
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
        const button = m_buttonGroup.getTag({ id: getItemDataId(item) });
        if (button) {
          button.select();
        }
      } else {
        m_previous_text = value2;
        m_value = value2;
        if (m_props.onSelect) {
          m_props.onSelect({ Combobox: self, ev });
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
    function setupLabelForAttr() {
      if (m_props.labelText) {
        const id = m_input.getTag().getAttribute("id");
        ui.d.setAttr(m_labelTag, { for: id });
      }
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Combobox: self });
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
        m_comboBoxData = m_props.data;
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
customElements.define(ui.defaultTags.combobox.self.name, ui.class.Combobox);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
        const input = ui.utils.extend(true, {}, m_props.input);
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
        const dropdownConfig = ui.utils.extend(true, {}, m_props.dropdown);
        dropdownConfig.css = ui.utils.extend(true, m_props.css.dropdown, dropdownConfig.css);
        dropdownConfig.onBeforeClose = (context) => {
          const result = m_props.dropdown?.onBeforeClose ? m_props.dropdown.onBeforeClose(context) : true;
          return (!context.ev || !m_input.getTag().contains(context.ev.target)) && result;
        };
        dropdownConfig.onComplete = (context) => {
          installCalendar(context.Dropdown);
          resolve();
          if (m_props.dropdown?.onComplete) {
            m_props.dropdown.onComplete(context);
          }
        };
        dropdownConfig.parentTag = m_dropdownWrapperTag;
        m_dropdown = ui.dropdown(dropdownConfig);
      });
    }
    function installCalendar(dropdown) {
      const contentTag = dropdown.getContentTag();
      contentTag.innerHTML = null;
      const calendar = ui.utils.extend(true, {}, m_props.calendar);
      calendar.css = ui.utils.extend(true, m_props.css.calendar, calendar.css);
      calendar.format = m_props.format;
      calendar.footer = m_props.footer;
      calendar.start = m_props.start;
      calendar.depth = m_props.depth;
      calendar.min = m_props.min;
      calendar.max = m_props.max;
      calendar.onSelect = (context) => {
        m_value = context.Calendar.value();
        const text = ui.date.format(m_value, m_props.format);
        m_input.value({ value: text });
        m_previous_text = text;
        dropdown.close();
        if (m_props.calendar.onSelect) {
          m_props.calendar.onSelect(context);
        }
        if (m_props.onSelect) {
          m_props.onSelect({ DatePicker: self, ev: context.ev });
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
      const date = ui.date.getDate(value2, m_props.format);
      m_calendar.value({ value: date });
      m_value = m_calendar.value();
      const text = ui.date.format(m_value, m_props.format);
      m_input.value({ value: text });
      m_previous_text = text;
    }
    function handleBlur(ev) {
      const text = m_input.value();
      if (m_previous_text !== text) {
        setValue(text);
        if (m_props.onSelect) {
          m_props.onSelect({ DatePicker: self, ev });
        }
      }
    }
    function destroyDatePicker() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ DatePicker: self });
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
customElements.define(ui.defaultTags.datePicker.self.name, ui.class.DatePicker);
ui.class.Dialog = class Dialog extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_button;
    let m_containerTag;
    let m_dialogHdrTag;
    let m_dialogBodyTag;
    let m_dialogFtrTag;
    let m_parentTag;
    let m_props;
    this.close = closeDialog;
    this.button = () => m_button;
    this.getParentTag = () => self;
    this.getContainerTag = () => m_containerTag;
    this.getBodyTag = () => m_dialogBodyTag;
    this.getHeaderTag = () => m_dialogHdrTag;
    this.getFooterTag = () => m_dialogFtrTag;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        self.appendChild(m_containerTag);
        m_dialogBodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
        const dialogHdrLeft = ui.d.createTag({ ...m_props.tags.headerLeft, class: m_props.css.headerLeft });
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
        installCloseButton();
        m_dialogHdrTag = ui.d.createTag({ ...m_props.tags.header, class: m_props.css.header });
        m_dialogHdrTag.appendChild(dialogHdrLeft);
        m_dialogHdrTag.appendChild(overlayHdrCenter);
        m_dialogHdrTag.appendChild(overlayHdrRight);
        m_dialogFtrTag = ui.d.createTag({ ...m_props.tags.footer, class: m_props.css.footer });
        self.classList.add(m_props.css.self);
        m_containerTag.appendChild(m_dialogHdrTag);
        m_containerTag.appendChild(m_dialogBodyTag);
        m_containerTag.appendChild(m_dialogFtrTag);
        resolve();
      });
    }
    function installCloseButton() {
      let propCss = m_props.css.button;
      if (m_props.closeButtonLeft) {
        m_props.closeButton = false;
        propCss = m_props.css.buttonLeft;
      }
      if (m_props.closeButton || m_props.closeButtonLeft) {
        const btnConfig = {
          ...m_props.button,
          css: propCss,
          parentTag: m_containerTag,
          attr: {
            type: "button"
          },
          onClick: (context) => {
            closeDialog();
            if (m_props.onClose) {
              m_props.onClose({
                Dialog: self,
                Button: context.Button,
                ev: context.ev
              });
            }
          }
        };
        m_button = ui.button(btnConfig);
      }
    }
    function closeDialog() {
      close();
    }
    function close() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Dialog: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          parentTag: "body",
          closeButton: true,
          button: { text: "" },
          closeText: "",
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
customElements.define(ui.defaultTags.dialog.self.name, ui.class.Dialog);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
      if (m_props.onMouseenterMouseleave) {
        m_props.onMouseenterMouseleave({ ev });
      }
    }
    function handleDragover(ev) {
      ev.preventDefault();
      if (m_props.onDragover) {
        m_props.onDragover({ ev });
      }
    }
    function handleDrop(ev) {
      ev.preventDefault();
      ev.stopPropagation();
      if (!m_props.onDrop) {
        return;
      }
      let items = ev.dataTransfer.items;
      if (!items || items.length === 0) {
        m_props.onDrop({ error: "No items dropped", dataTransfer: {} });
        return;
      }
      if (m_props.maxFileCount && items.length > m_props.maxFileCount) {
        m_props.onDrop({ error: "maxFileCount", dataTransfer: {} });
        return;
      }
      for (let i = 0; i < items.length; i++) {
        if (!checkFileKindAllowed(items[i].type)) {
          console.error("DragDrop() one or more file formats are not allowed.");
          return;
        }
      }
      m_props.onDrop({ dataTransfer: ev.dataTransfer, ev });
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
      if (m_props.onComplete) {
        m_props.onComplete({ Button: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          dropText: "Drop Here",
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
customElements.define(ui.defaultTags.dragDrop.self.name, ui.class.DragDrop);
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
    this.enable = setEnable;
    this.getParentTag = () => m_draggableTag;
    this.getHandleWidth = () => m_draggableTag.clientWidth;
    this.getHandleHeight = () => m_draggableTag.clientHeight;
    this.setPosition = setPosition;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_draggableTag = ui.d.createTag({ ...m_props.tags.draggable, class: m_props.css.draggable });
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
        if (m_active && m_props.onDragStart) {
          m_props.onDragStart({ Draggable: self, ev });
        }
      }
    }
    function dragEnd(ev) {
      if (m_enable) {
        if (m_active && m_props.onDragEnd) {
          m_props.onDragEnd({ Draggable: self, ev });
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
        if (m_props.onDrag && (currentX !== 0 || currentY !== 0)) {
          m_props.onDrag({ Draggable: self, ev });
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
      if (xPos) {
        m_draggableTag.style.left = m_xOffset + xPos + "px";
      }
      if (yPos) {
        m_draggableTag.style.top = m_yOffset + yPos + "px";
      }
    }
    function setEnable(enable) {
      m_enable = enable;
    }
    function destroyDraggable() {
      ui.d.remove(m_draggableTag);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Draggable: self });
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
customElements.define(ui.defaultTags.draggable.self.name, ui.class.Draggable);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
        button.text = button.text || "";
        button.onComplete = resolve;
        button.onClick = (context) => {
          if (m_props.button?.onClick) {
            m_props.button.onClick(context);
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
        if (m_props.positionTag) {
          ui.d.computeTagHeight(m_props.positionTag).then((tagHeight) => {
            m_dropdownContainerTag.style.top = `${tagHeight}px`;
            resolve();
          });
        } else {
          resolve();
        }
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
      if (m_props.onOpen) {
        m_props.onOpen({ dropdown: self });
      }
    }
    function close(context = {}) {
      closeAnimation(context.ev);
    }
    function closeAnimation(ev) {
      if (m_props.onBeforeClose && !m_props.onBeforeClose({ ev })) {
        return;
      }
      m_dropdownContainerTag.classList.remove(m_props.css.open);
      m_open = false;
      if (m_props.onClose) {
        m_props.onClose({ dropdown: self });
      }
    }
    function destroyDropdown() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Dropdown: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          onBeforeClose: (context) => {
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
customElements.define(ui.defaultTags.dropdown.self.name, ui.class.Dropdown);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        switch (m_props.buttonOnly) {
          case true:
            installButton().then(resolve);
            break;
          default:
            installInput().then(resolve);
            break;
        }
      });
    }
    function installButton() {
      return new Promise((resolve) => {
        const config = {
          ...m_props.button,
          parentTag: self,
          onClick: () => {
            m_inputTag.getTag().click();
          },
          css: m_props.css.button,
          onComplete: () => {
            installInput(true).then(resolve);
          },
          resolve
        };
        ui.button(config);
      });
    }
    function installInput(hidden) {
      return new Promise((resolve) => {
        const inputConfig = {
          ...m_props.input,
          parentTag: self,
          css: m_props.css.input,
          events: [
            {
              name: "change",
              fn: (context) => {
                if (m_props.onUpload) {
                  m_props.onUpload({
                    files: context.Input.getTag().files,
                    ev: context.ev
                  });
                }
              }
            }
          ],
          onComplete: resolve
        };
        if (hidden) {
          inputConfig.hidden = true;
        }
        m_inputTag = ui.input(inputConfig);
      });
    }
    function destroyFileChooser() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ FileChooser: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          button: {
            text: "Select File"
          },
          input: {
            labelText: "Choose files to upload",
            tags: { input: { attr: { type: "file" } } }
          },
          tag: "default",
          theme: "default"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "fileChooser" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.fileChooser = (props) => new ui.class.FileChooser(props);
customElements.define(ui.defaultTags.fileChooser.self.name, ui.class.FileChooser);
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
    let m_gridData;
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
      if (props.data)
        m_gridData = props.data;
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
        if (m_props.onPostTile) {
          m_props.onPostTile({
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
                switch (column.tagType) {
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
            if (m_props.onPostRow) {
              m_props.onPostRow({
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
      buttonConfig.onClick = (contextClick) => {
        if (context.column.onClick) {
          context.column.onClick({
            rowIndex: context.rowIndex,
            rowData: context.rowData,
            parentTag: context.parentTag,
            ev: contextClick.ev
          });
        }
      };
      buttonConfig.onComplete = (contextComplete) => {
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
          button: m_props.css.button,
          input: m_props.css.input,
          container: m_props.css.inputContainer
        },
        value: context.column.dataKey in context.rowData ? context.rowData[context.column.dataKey] : context.column.text
      };
      inputConfig = ui.utils.extend(true, inputConfig, context.column);
      inputConfig.events = [
        {
          name: "change",
          on: (contextEvent) => {
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
      inputConfig.onDataValidationChange = (contextValidation) => {
        inputElChangeEvent({
          input: contextValidation.input,
          column: context.column,
          rowIndex: context.rowIndex,
          rowData: context.rowData,
          ev: contextValidation.ev
        });
      };
      inputConfig.onComplete = (contextComplete) => {
        saveCellTagWidth({
          colIndex: context.colIndex,
          tag: contextComplete.Input.getTag(),
          parentTag: context.parentTag
        });
        if (context.column.onComplete) {
          context.column.onComplete(contextComplete);
        }
      };
      inputConfig.onClick = (contextClick) => {
        if (context.column.onClick) {
          context.column.onClick(contextClick);
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
        onComplete: (contextComplete) => {
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
        title: "Default Title",
        css: {
          button: m_props.css.button
        }
      };
      const dialogConfig = ui.utils.extend(true, dialogDefaultConfig, context.column);
      dialogConfig.onClick = () => {
        ui.dialog({
          title: dialogConfig.title,
          onComplete: context.column.onOpen,
          onClose: context.column.onClose
        });
      };
      const buttonConfig = ui.utils.extend(true, {}, dialogConfig);
      buttonConfig.onComplete = (contextComplete) => {
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
      config.onClick = () => {
        slideoutTag.open();
      };
      config.parentTag = context.parentTag;
      const buttonTag = ui.button(config);
      const slideoutConfig = ui.utils.extend(true, {}, config);
      slideoutConfig.onComplete = config.onInstallContent;
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
        onDrop: handleDropEvent,
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
          self: m_props.css.treeViewParent
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
      if (m_props.onComplete) {
        m_props.onComplete({ Grid: self });
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
customElements.define(ui.defaultTags.grid.self.name, ui.class.Grid);
ui.class.Input = class Input extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_iconList = [];
    let m_clearButton;
    let m_containerTag;
    let m_dataChanged;
    let m_errorTextTag;
    let m_errorIconTag;
    let m_inputTag;
    let m_isValid;
    let m_labelTag;
    let m_leftButton;
    let m_parentTag;
    let m_props;
    let m_successIconTag;
    this.commitDataChange = () => m_dataChanged = null;
    this.clear = clearInput;
    this.clearButton = () => m_clearButton;
    this.dataChanged = () => m_dataChanged;
    this.focus = focus;
    this.getIconTagById = getIconTagById;
    this.getTag = () => m_inputTag;
    this.isValid = () => m_isValid;
    this.leftButton = () => m_leftButton;
    this.setup = setup;
    this.setAttr = setAttribute;
    this.required = () => m_props.required;
    this.value = value;
    this.validate = validate;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    async function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        self.appendChild(m_containerTag);
        const tagConfig = {
          ...m_props.tags.input,
          class: m_props.css.input,
          text: m_props.value,
          event: eventHandlers
        };
        tagConfig.attr.name = m_props.name;
        tagConfig.attr.id = m_props.name;
        m_inputTag = ui.d.createTag(tagConfig);
        m_containerTag.appendChild(m_inputTag);
        if (m_props.icon) {
          insertIcon();
        }
        if (m_props.hidden) {
          self.style.display = "none";
        } else if (ui.utils.isString(m_props.labelText)) {
          const labelTagConfig = {
            name: "label",
            class: m_props.css.label,
            prop: m_props.prop,
            attr: { for: m_props.name },
            text: m_props.labelText
          };
          m_labelTag = ui.d.createTag(labelTagConfig);
          self.insertBefore(m_labelTag, m_containerTag);
        }
        if (m_props?.validate?.onStart) {
          validate();
        }
        installLeftButton().then(() => installClearInput()).then(() => {
          if (m_props.required) {
            m_errorIconTag = ui.d.createTag({ ...m_props.tags.errorIcon, class: m_props.css.errorIcon });
            m_iconList.push(m_errorIconTag);
            m_successIconTag = ui.d.createTag({ ...m_props.tags.successIcon, class: m_props.css.successIcon });
            m_iconList.push(m_successIconTag);
            m_containerTag.appendChild(m_errorIconTag);
            m_containerTag.appendChild(m_successIconTag);
            m_errorTextTag = ui.d.createTag({ ...m_props.tags.errorText, class: m_props.css.errorText });
            self.appendChild(m_errorTextTag);
          }
          resolve();
        });
      });
    }
    function setAttribute(context) {
      for (const attr in context) {
        if (attr) {
          m_inputTag.setAttribute(attr, context[attr]);
        }
      }
    }
    function insertIcon() {
      if (Array.isArray(m_props.icon)) {
        m_props.icon.forEach((icon) => {
          addIcon(icon);
        });
      } else {
        addIcon(m_props.icon);
      }
      function addIcon(icon) {
        const cssClasses = [m_props.css.icon, icon.attr.class, icon.size].filter(Boolean).join(" ");
        const tagConfig = {
          class: cssClasses,
          prop: icon.prop,
          attr: icon.attr
        };
        let iconTag = ui.d.createTag("i", tagConfig);
        m_iconList.push(iconTag);
        if (icon.position === "right") {
          m_containerTag.appendChild(iconTag);
        } else {
          m_containerTag.insertBefore(iconTag, m_inputTag);
        }
      }
    }
    function installClearInput() {
      return new Promise((resolve) => {
        if (m_props.enableClear) {
          const buttonConfig = {
            ...m_props.clearButton,
            css: m_props.css.clearButton,
            parentTag: m_containerTag,
            onComplete: resolve,
            onClick: (context) => {
              clearInput();
              if (m_props.onClear) {
                m_props.onClear({
                  Input: self,
                  Button: context.Button,
                  ev: context.ev
                });
              }
            }
          };
          m_clearButton = ui.button(buttonConfig);
        }
        resolve();
      });
    }
    function installLeftButton() {
      return new Promise((resolve) => {
        if (!m_props.enableLeftButton) {
          return resolve();
        }
        const eventHandlers2 = ["onMouseDown", "onMouseUp", "onTouchStart", "onTouchEnd"];
        const buttonConfig = {
          ...m_props.leftButton,
          css: m_props.css.leftButton,
          parentTag: m_containerTag,
          onComplete: resolve
        };
        eventHandlers2.forEach((event) => {
          const propHandler = m_props[event];
          if (propHandler) {
            buttonConfig[event] = (context) => {
              propHandler({
                Input: self,
                Button: context.Button,
                ev: context.ev
              });
            };
          }
        });
        m_leftButton = ui.button(buttonConfig);
        resolve();
      });
    }
    const eventHandlers = {
      blur: (ev) => {
        ev.stopPropagation();
        if (m_props.validateEvents?.includes(ev.type))
          validate(ev);
        m_props.onBlur?.({
          Input: self,
          value: m_inputTag.value,
          Button: m_clearButton,
          ev
        });
      },
      change: (ev) => {
        ev.stopPropagation();
        if (m_props.validateEvents?.includes(ev.type))
          validate(ev);
        m_props.onChange?.({
          Input: self,
          value: m_inputTag.value,
          Button: m_clearButton,
          ev
        });
      },
      keydown: (ev) => {
        ev.stopPropagation();
        if (m_props.validateEvents?.includes(ev.type))
          validate(ev);
        m_props.onKeydown?.({
          Input: self,
          value: m_inputTag.value,
          Button: m_clearButton,
          ev
        });
      },
      keyup: (ev) => {
        ev.stopPropagation();
        if (m_props.validateEvents?.includes(ev.type))
          validate(ev);
        m_props.onKeyup?.({
          Input: self,
          value: m_inputTag.value,
          Button: m_clearButton,
          ev
        });
      },
      focus: (ev) => {
        ev.stopPropagation();
        if (m_props.validateEvents?.includes(ev.type))
          validate(ev);
        m_props.onFocus?.({
          Input: self,
          value: m_inputTag.value,
          Button: m_clearButton,
          ev
        });
      }
    };
    function focus(context = {}) {
      if (m_inputTag)
        m_inputTag.focus(context);
    }
    function validate(ev) {
      let isValid = true;
      let errorMessage = [];
      if (Array.isArray(m_props.validate?.types)) {
        m_props.validate.types.forEach((validate2) => {
          const keys = Object.keys(validate2);
          keys.forEach((key) => {
            switch (key) {
              case "minLength":
                validateMinLength(validate2.minLength, ev);
                break;
              case "required":
                if (!validateRequired(validate2.required)) {
                  isValid = false;
                  errorMessage.push(validate2.required.message || m_props.requiredText);
                }
                break;
              case "custom":
                if (!validateCustom(validate2.custom)) {
                  isValid = false;
                  errorMessage.push(validate2.custom.message || m_props.invalidInput);
                }
                break;
            }
          });
        });
      }
      if (m_props.onDataValidationChange) {
        m_props.onDataValidationChange({
          Input: self,
          ev,
          errorMessage
        });
      }
      showValidationResult(isValid, errorMessage);
      m_isValid = isValid;
      return isValid;
    }
    function validateRequired() {
      return m_inputTag.value.trim() !== "";
    }
    function validateCustom(config) {
      if (typeof config.validator === "function") {
        return config.validator(m_inputTag.value);
      }
      return true;
    }
    function showValidationResult(isValid, messages) {
      if (!isValid && messages.length > 0) {
        if (m_props.validate.show) {
          m_errorTextTag.innerHTML = "";
          m_errorTextTag.style.display = "block";
          messages.forEach((message) => {
            const messageElement = ui.d.createTag({
              name: "div",
              text: message
            });
            m_errorTextTag.appendChild(messageElement);
          });
        }
        if (m_errorIconTag) {
          m_errorIconTag.classList.remove("hidden");
          m_successIconTag.classList.toggle("hidden", true);
        }
      } else {
        if (m_errorTextTag) {
          m_errorTextTag.style.display = "none";
          m_errorTextTag.innerHTML = "";
        }
        if (m_errorIconTag) {
          m_errorIconTag.classList.add("hidden");
          m_successIconTag.classList.toggle("hidden", false);
        }
      }
    }
    function validateMinLength(config, ev) {
      const curLen = m_inputTag.value.length;
      if (typeof config.value === "string") {
        const length = config.len - curLen;
        if (length > 0) {
          const padding = config.value.repeat(length);
          m_dataChanged = true;
          m_inputTag.value = config.dir === "right" ? m_inputTag.value + padding : padding + m_inputTag.value;
          if (m_props.onDataValidationChange) {
            m_props.onDataValidationChange({
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
    function getIconTagById(id) {
      return m_iconList.find((icon) => icon.id === id);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Input: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          name: Math.random().toString(36).slice(2),
          clearButton: { text: "" },
          leftButton: { text: "" },
          icon: [],
          requiredText: "This is a required field.",
          invalidInput: "Invalid input.",
          validate: {
            show: true,
            types: []
          }
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
customElements.define(ui.defaultTags.input.self.name, ui.class.Input);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
          class: m_props.css.item
        };
        let itemTag = ui.d.createTag(itemConfig);
        const constructorName = itemData[m_props.displayKey].constructor.name;
        if (constructorName === "DocumentFragment") {
          itemTag.appendChild(itemData[m_props.displayKey].firstChild);
        }
        if (constructorName === "String") {
          itemTag.innerHTML = itemData[m_props.displayKey];
        }
        if (ui.d.utils.isNode(itemData[m_props.displayKey])) {
          itemTag.appendChild(itemData[m_props.displayKey]);
        }
        m_listboxContainerTag.appendChild(itemTag);
        setupItemEventListeners(itemTag, itemData).then(resolve);
      });
    }
    function setupItemEventListeners(item, data) {
      return new Promise((resolve) => {
        const listeners = [
          { type: "click", fn: "onSelect" },
          { type: "mouseover", fn: "onHover" },
          { type: "mouseleave", fn: "onLeave" }
        ];
        listeners.forEach((listener) => {
          item.addEventListener(listener.type, (ev) => {
            if (m_props[listener.fn]) {
              m_props[listener.fn]({
                ev,
                data,
                item,
                Listbox: self
              });
            }
          });
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
      if (m_props.onComplete) {
        m_props.onComplete({ Listbox: self });
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
customElements.define(ui.defaultTags.listbox.self.name, ui.class.Listbox);
ui.class.ListMenu = class ListMenu extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_iconList = [];
    let m_containerTag;
    let m_data;
    let m_parentTag;
    let m_props;
    let m_lastOpenParent = null;
    this.addToList = addToList;
    this.destroy = destroyListMenu;
    this.replaceList = replaceList;
    this.setup = setup;
    this.toggleChildren = toggleChildren;
    this.getIconTagById = getIconTagById;
    this.closeAllItems = closeAllItems;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        self.classList.add(m_props.css.self);
        installItems(m_data).then(() => {
          self.appendChild(m_containerTag);
          resolve();
        });
      });
    }
    function installItems(data, parentId = null) {
      return new Promise((resolve) => {
        const itemPromises = data.map((item) => {
          return processItem(item, parentId);
        });
        Promise.all(itemPromises).then(resolve);
      });
    }
    function processItem(itemData, parentId) {
      return new Promise((resolve) => {
        const itemId = ui.utils.getUniqueId();
        const itemWrapperTag = ui.d.createTag({
          name: m_props.tags.wrapper.name,
          class: m_props.css.wrapper
        });
        if (parentId) {
          itemWrapperTag.setAttribute(m_props.parentIdAttrName, parentId);
          itemWrapperTag.classList.add("child-item");
          itemWrapperTag.style.display = "none";
        }
        itemWrapperTag.setAttribute(m_props.itemIdAttrName, itemId);
        const bodyTag = ui.d.createTag({
          name: m_props.tags.body.name,
          class: m_props.css.body
        });
        const titleTag = ui.d.createTag({
          name: m_props.tags.title.name,
          text: itemData.title,
          class: m_props.css.title
        });
        const subtitleTag = ui.d.createTag({
          name: m_props.tags.subtitle.name,
          text: itemData.subtitle,
          class: m_props.css.subtitle
        });
        itemWrapperTag.appendChild(bodyTag);
        bodyTag.appendChild(titleTag);
        bodyTag.appendChild(subtitleTag);
        const hasIcons = insertIcon({ data: itemData, parentTag: itemWrapperTag, bodyTag });
        if (!hasIcons.left) {
          bodyTag.classList.add(m_props.css.paddingLeft || "padding-left");
        }
        if (!hasIcons.right) {
          bodyTag.classList.add(m_props.css.paddingRight || "padding-right");
        }
        m_containerTag.appendChild(itemWrapperTag);
        if (itemData.children && Array.isArray(itemData.children) && itemData.children.length > 0) {
          itemWrapperTag.classList.add("has-children");
          installItems(itemData.children, itemId).then(() => {
            setupItemEventListeners(itemWrapperTag, itemData).then(resolve);
          });
        } else {
          setupItemEventListeners(itemWrapperTag, itemData).then(resolve);
        }
      });
    }
    function insertIcon(context) {
      const iconPresence = { left: false, right: false };
      if (Array.isArray(context.data.icon)) {
        context.data.icon.forEach((icon) => {
          const position = addIcon({
            icon,
            parentTag: context.parentTag
          });
          if (position) {
            iconPresence[position] = true;
          }
        });
      }
      return iconPresence;
      function addIcon(context2) {
        const cssClasses = [m_props.css.icon, context2.icon.attr.class, context2.icon.size].filter(Boolean).join(" ");
        const props2 = {
          ...context2.icon.prop,
          position: context2.icon.position,
          size: context2.icon.size,
          rotatable: context2.icon.rotatable
        };
        const tagConfig = {
          class: cssClasses,
          prop: props2,
          attr: context2.icon.attr
        };
        let iconTag = ui.d.createTag("i", tagConfig);
        m_iconList.push(iconTag);
        if (context2.icon.position === "left") {
          context2.parentTag.insertBefore(iconTag, context2.parentTag.firstChild);
          return "left";
        } else {
          context2.parentTag.appendChild(iconTag);
          return "right";
        }
      }
    }
    function getIconTagById(id) {
      return m_iconList.find((icon) => icon.id === id);
    }
    function toggleChildren(parentItem) {
      const isTopLevelParent = !parentItem.closest(".child-item");
      const parentId = parentItem.getAttribute(m_props.itemIdAttrName);
      const isExpanded = parentItem.getAttribute(m_props.dataExpanded) === "true";
      if (isTopLevelParent && m_props.autoCloseItems && m_lastOpenParent && m_lastOpenParent !== parentItem) {
        const lastParentId = m_lastOpenParent.getAttribute(m_props.itemIdAttrName);
        const lastAllDescendants = getAllDescendants(lastParentId);
        lastAllDescendants.forEach((child) => {
          child.style.display = "none";
          child.setAttribute(m_props.dataExpanded, "false");
          m_iconList.map((icon) => {
            if (icon.rotatable && child === icon.parentElement)
              icon.style.transform = "rotate(0deg)";
          });
        });
        m_lastOpenParent.setAttribute(m_props.dataExpanded, "false");
        m_iconList.map((icon) => {
          if (icon.rotatable && m_lastOpenParent === icon.parentElement)
            icon.style.transform = "rotate(0deg)";
        });
      }
      const allDescendants = getAllDescendants(parentId);
      if (isExpanded) {
        allDescendants.forEach((child) => {
          child.style.display = "none";
          child.setAttribute(m_props.dataExpanded, "false");
          m_iconList.map((icon) => {
            if (icon.rotatable && child === icon.parentElement)
              icon.style.transform = "rotate(0deg)";
          });
        });
      } else {
        const directChildren = Array.from(allDescendants).filter((child) => child.getAttribute(m_props.parentIdAttrName) === parentId);
        directChildren.forEach((child) => {
          child.style.display = "flex";
        });
        if (isTopLevelParent) {
          m_lastOpenParent = parentItem;
        }
      }
      allDescendants.forEach((child) => {
        child.setAttribute(m_props.dataExpanded, "false");
      });
      parentItem.setAttribute(m_props.dataExpanded, !isExpanded);
      m_iconList.map((icon) => {
        if (icon.rotatable && parentItem === icon.parentElement)
          icon.style.transform = isExpanded ? "rotate(0deg)" : "rotate(90deg)";
      });
    }
    function getAllDescendants(parentId) {
      const descendants = [];
      let currentLevel = m_containerTag.querySelectorAll(`[data-parent-id="${parentId}"]`);
      while (currentLevel.length > 0) {
        const nextLevel = [];
        currentLevel.forEach((child) => {
          descendants.push(child);
          const childId = child.getAttribute(m_props.itemIdAttrName);
          const childChildren = m_containerTag.querySelectorAll(`[data-parent-id="${childId}"]`);
          childChildren.forEach((grandChild) => nextLevel.push(grandChild));
        });
        currentLevel = nextLevel;
      }
      return descendants;
    }
    function setupItemEventListeners(item, data) {
      return new Promise((resolve) => {
        const listeners = [
          { type: "click", fn: "onSelect" },
          { type: "mouseover", fn: "onHover" },
          { type: "mouseleave", fn: "onLeave" }
        ];
        listeners.forEach((listener) => {
          item.addEventListener(listener.type, (ev) => {
            if (listener.type === "click" && item.classList.contains("has-children")) {
              toggleChildren(item);
            }
            if (m_props[listener.fn]) {
              m_props[listener.fn]({
                ev,
                data,
                item,
                ListMenu: self
              });
            }
          });
        });
        resolve();
      });
    }
    function addToList(data) {
      m_data = data;
      installItems(m_data).then();
    }
    function replaceList(data) {
      clearData();
      m_data = data;
      installItems(m_data).then();
    }
    function clearData() {
      m_containerTag.innerHTML = "";
    }
    function destroyListMenu() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ ListMenu: self });
      }
    }
    function closeAllItems() {
      function recursiveClose(parentItem) {
        const parentId = parentItem.getAttribute(m_props.itemIdAttrName);
        const allDescendants = getAllDescendants(parentId);
        allDescendants.forEach((child) => {
          child.style.display = "none";
          child.setAttribute(m_props.dataExpanded, "false");
          if (child.classList.contains("has-children")) {
            recursiveClose(child);
          }
        });
        parentItem.setAttribute(m_props.dataExpanded, "false");
        m_iconList.map((icon) => {
          if (icon.rotatable && parentItem === icon.parentElement)
            icon.style.transform = "rotate(0deg)";
        });
      }
      const allParentItems = m_containerTag.querySelectorAll(".has-children");
      allParentItems.forEach((parentItem) => {
        recursiveClose(parentItem);
      });
      m_lastOpenParent = null;
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          itemIdAttrName: "data-item-id",
          parentIdAttrName: "data-parent-id",
          dataExpanded: "data-expanded",
          autoCloseItems: true
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        m_data = customProps.data;
        const tags = ui.tags.getTags({ name: m_props.tag, component: "listMenu" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "listMenu" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.listMenu = (props) => new ui.class.ListMenu(props);
customElements.define(ui.defaultTags.listMenu.self.name, ui.class.ListMenu);
ui.class.Mapbox = class Mapbox extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_containerTag;
    let m_props;
    let m_map;
    let m_markers = [];
    this.addPoints = addPoints;
    this.fitBounds = fitBounds;
    this.getMarker = getMarker;
    this.getMarkers = getMarkers;
    this.jumpTo = jumpTo;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      checkMapboxLibraries();
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      await renderMap();
      await getUserLocation();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_parentTag.style.setProperty(m_props.containerLoadingMessageVar, `"${m_props.loadingMessage}"`);
        m_containerTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        self.classList.add(m_props.css.self);
        self.appendChild(m_containerTag);
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
    function fitBounds(props2) {
      let config = {
        padding: 30,
        maxZoom: 13
      };
      if (props2.config) {
        config = ui.utils.extend(true, config, props2);
      }
      m_map.fitBounds([props2.southwestern, props2.northeastern], config);
    }
    function geolocationError(e) {
      removeWait();
    }
    function renderMap() {
      return new Promise((resolve) => {
        m_map = new mapboxgl.Map({
          container: m_props.tags.container.attr.id,
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
        m_markers.push(new mapboxgl.Marker(config).setLngLat([lng, lat]).addTo(m_map));
      });
    }
    function getMarker(coords) {
      return m_markers.find((marker) => marker._lngLat.lng === coords.lng && marker._lngLat.lat === coords.lat);
    }
    function getMarkers() {
      return m_markers;
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
      if (m_props.onComplete) {
        m_props.onComplete({ Mapbox: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          marker: { color: "orange" },
          mapStyle: "mapbox://styles/mapbox/streets-v11",
          tag: "default",
          theme: "default",
          zoom: 16,
          containerLoadingMessageVar: "--container-after-content",
          loadingMessage: "Loading..."
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
customElements.define(ui.defaultTags.mapbox.self.name, ui.class.Mapbox);
ui.class.Pagination = class Pagination extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_props;
    let m_currentPage = 1;
    let m_totalPages;
    let m_parentTag;
    let m_paginationTag;
    let m_buttonsGroup;
    this.setup = setup;
    this.getCurrentPage = () => m_currentPage;
    this.setCurrentPage = setCurrentPage;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_paginationTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        self.classList.add(m_props.css.self);
        self.appendChild(m_paginationTag);
        installPaginationButtons().then(resolve);
      });
    }
    function installPaginationButtons() {
      return new Promise((resolve) => {
        const buttonsConfig = createPaginationButtons();
        if (!m_buttonsGroup) {
          m_buttonsGroup = ui.buttonGroup({
            buttons: buttonsConfig,
            onClick: handlePageClick,
            parentTag: m_paginationTag,
            onComplete: (context) => {
              updateButtonSelected();
            }
          });
        } else {
          const buttons = m_buttonsGroup.getButtons();
          buttonsConfig.forEach((btnConfig, index) => {
            if (buttons[index]) {
              buttons[index].text(btnConfig.text);
              buttons[index].setId(btnConfig.id);
              buttons[index].enable(!btnConfig.disabled);
            }
          });
        }
        resolve();
      });
    }
    function createPaginationButtons() {
      m_totalPages = m_props.totalPages || 1;
      const buttons = [];
      if (m_totalPages > 7)
        buttons.push({
          id: "prev",
          text: m_props.previousButton.text,
          disabled: m_currentPage === 1,
          icon: m_props.previousButton.icon
        });
      const addEllipsis = () => {
        buttons.push({
          id: "ellipsis",
          text: "...",
          disabled: false
        });
      };
      const createNumberButton = (number) => ({
        id: number.toString(),
        text: number.toString(),
        disabled: false
      });
      if (m_totalPages <= 7) {
        for (let i = 1; i <= m_totalPages; i++) {
          buttons.push(createNumberButton(i));
        }
      } else {
        buttons.push(createNumberButton(1));
        if (m_currentPage <= 3) {
          for (let i = 2; i <= 5; i++) {
            buttons.push(createNumberButton(i));
          }
          addEllipsis();
          buttons.push(createNumberButton(m_totalPages));
        } else if (m_currentPage >= m_totalPages - 3) {
          addEllipsis();
          for (let i = m_totalPages - 4; i <= m_totalPages; i++) {
            buttons.push(createNumberButton(i));
          }
        } else {
          addEllipsis();
          for (let i = m_currentPage - 1; i <= m_currentPage + 1; i++) {
            buttons.push(createNumberButton(i));
          }
          addEllipsis();
          buttons.push(createNumberButton(m_totalPages));
        }
        buttons.push({
          id: "next",
          text: m_props.nextButton.text,
          disabled: m_currentPage === m_totalPages,
          icon: m_props.nextButton.icon
        });
      }
      return buttons;
    }
    async function handlePageClick(clickedBtn) {
      const btnId = clickedBtn.Button.getId();
      if (btnId === "ellipsis") {
        setCurrentPage(m_currentPage);
        return;
      }
      if (btnId === "prev" && m_currentPage > 1) {
        setCurrentPage(m_currentPage - 1);
      } else if (btnId === "next" && m_currentPage < m_totalPages) {
        setCurrentPage(m_currentPage + 1);
      } else if (btnId !== "prev" && btnId !== "next" && btnId !== "ellipsis") {
        setCurrentPage(parseInt(clickedBtn.Button.text()));
      }
    }
    async function setCurrentPage(page) {
      if (isNaN(page))
        return;
      m_currentPage = page;
      await installPaginationButtons();
      const prevButton = m_buttonsGroup.getTag({ id: "prev" });
      const nextButton = m_buttonsGroup.getTag({ id: "next" });
      if (prevButton)
        prevButton.enable(m_currentPage !== 1);
      if (nextButton)
        nextButton.enable(m_currentPage !== m_totalPages);
      updateButtonSelected();
      if (m_props.onPageChange) {
        m_props.onPageChange({ Pagination: self });
      }
    }
    function updateButtonSelected() {
      m_buttonsGroup.deselect();
      const buttons = m_buttonsGroup.getButtons();
      const btn = buttons.find((btn2) => btn2.getTag().innerText === m_currentPage.toString());
      btn.select({ notTrigger: true });
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Pagination: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          theme: "default",
          tag: "default",
          totalPages: 1,
          currentPage: 1,
          previousButton: {
            text: "previous"
          },
          nextButton: {
            text: "next"
          }
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_currentPage = m_props.currentPage;
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "pagination" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "pagination" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.pagination = (options) => new ui.class.Pagination(options);
customElements.define(ui.defaultTags.pagination.self.name, ui.class.Pagination);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
      if (m_props.onComplete) {
        m_props.onComplete({ Percentage: self });
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
customElements.define(ui.defaultTags.percentage.self.name, ui.class.Percentage);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
            onClick: (context) => {
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
        onClick: (context) => {
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
      if (m_props.onComplete) {
        m_props.onComplete({ Player: self });
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
customElements.define(ui.defaultTags.player.self.name, ui.class.Player);
ui.class.Radio = class Radio extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_labelTag;
    let m_inputTag;
    let m_spanTag;
    let m_props;
    let m_enable = true;
    let m_checked = false;
    this.destroy = destroyRadio;
    this.enable = enable;
    this.getId = () => m_props.id;
    this.getParentTag = () => m_labelTag;
    this.select = select;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_labelTag = ui.d.createTag({ ...m_props.tags.container, class: m_props.css.container });
        if (m_props.position === "right") {
          m_labelTag.classList.add("right");
        }
        const textTag = ui.d.createTag({
          ...m_props.tags.text,
          class: m_props.css.text,
          text: m_props.text
        });
        const tagConfig = {
          ...m_props.tags.input,
          class: m_props.css.input,
          text: m_props.value,
          event: {
            click: handleClick
          }
        };
        tagConfig.attr.name = Math.random().toString(36).slice(2);
        m_inputTag = ui.d.createTag(tagConfig);
        m_spanTag = ui.d.createTag({ ...m_props.tags.span, class: m_props.css.span });
        if (m_props.position === "right") {
          m_labelTag.appendChild(textTag);
          m_labelTag.appendChild(m_inputTag);
          m_labelTag.appendChild(m_spanTag);
        } else {
          m_labelTag.appendChild(m_inputTag);
          m_labelTag.appendChild(m_spanTag);
          m_labelTag.appendChild(textTag);
        }
        m_checked = m_props.prop?.checked;
        setEnable();
        self.classList.add(m_props.css.self);
        self.appendChild(m_labelTag);
        resolve();
      });
    }
    function handleClick(ev) {
      if (m_enable) {
        m_checked = true;
        if (m_props.onClick) {
          m_props.onClick({ Radio: self, ev });
        }
        if (m_props.onGroupClick) {
          m_props.onGroupClick({ Radio: self, ev });
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
        if (notTrigger) {
          m_checked = value2;
          ui.d.setProps(m_inputTag, { checked: m_checked });
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
      m_labelTag.classList.toggle(m_props.css.disabled, !m_enable);
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_inputTag.value;
      } else {
        m_inputTag.value = context.value;
      }
    }
    function destroyRadio() {
      ui.d.remove(m_labelTag);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Radio: self });
      }
    }
    function configure(customProps = {}) {
      m_props = {
        tag: "default",
        theme: "default",
        enable: true,
        position: "left"
      };
      m_props = ui.utils.extend(true, m_props, customProps);
      m_parentTag = ui.d.getTag(m_props.parentTag);
      m_enable = m_props.enable;
      const tags = ui.tags.getTags({ name: m_props.tag, component: "radio" });
      m_props.tags = ui.utils.extend(true, tags, m_props.tags);
      const css = ui.theme.getTheme({ name: m_props.theme, component: "radio" });
      m_props.css = ui.utils.extend(true, css, m_props.css);
    }
  }
};
ui.radio = (props) => new ui.class.Radio(props);
customElements.define(ui.defaultTags.radio.self.name, ui.class.Radio);
ui.class.RadioGroup = class RadioGroup extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_radioList = [];
    let m_parentTag;
    let m_props;
    this.clear = clear;
    this.destroy = destroyRadioGroup;
    this.getParentTag = () => self;
    this.getTag = getTagById;
    this.select = select;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        const radioPromises = [];
        m_props.radios.forEach((radio, index) => {
          radioPromises.push(processRadio(radio, index));
        });
        Promise.all(radioPromises).then(resolve);
      });
    }
    function processRadio(radio, index) {
      return new Promise((resolve) => {
        radio.id = radio.id ? radio.id : index;
        const radioConfig = {
          ...m_props.radio,
          class: m_props.css.radio,
          ...radio,
          name: m_props.name,
          parentTag: self,
          onGroupClick: handleGroupClick,
          onComplete: resolve,
          position: radio.position || m_props.radio.position || "left"
        };
        m_radioList.push(ui.radio(radioConfig));
      });
    }
    function handleGroupClick(context) {
      selectTag(context.Radio, true);
      if (m_props.onClick) {
        m_props.onClick(context);
      }
      if (m_props.onGroupClick) {
        m_props.onGroupClick({
          RadioGroup: self,
          Radio: context.Radio,
          ev: context.ev
        });
      }
    }
    function getTag(id) {
      return m_radioList.find((tag) => tag.getId() === id);
    }
    function getSelected() {
      return m_radioList.filter((tag) => tag.select());
    }
    function selectTag(tag, notTrigger) {
      if (tag) {
        deselectRadios();
        tag.select({ value: true, notTrigger });
      }
    }
    function deselectRadios() {
      m_radioList.forEach((radio) => {
        radio.select({ value: false, notTrigger: true });
      });
    }
    function getTagById(context = {}) {
      return getTag(context.id);
    }
    function clear() {
      m_radioList.forEach((tag) => {
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
    function destroyRadioGroup() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ CheckboxRadioGroup: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          name: Math.random().toString(36).slice(2),
          radios: []
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "radioGroup" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.radioGroup = (props) => new ui.class.RadioGroup(props);
customElements.define(ui.defaultTags.radioGroup.self.name, ui.class.RadioGroup);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
        if (m_props.onSelect) {
          m_props.onSelect({ Rating: self, ev });
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
      if (m_props.onComplete) {
        m_props.onComplete({ Rating: self });
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
customElements.define(ui.defaultTags.rating.self.name, ui.class.Rating);
ui.class.Search = class Search extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_inputContainer;
    let m_input;
    let m_dropdownWrapperTag;
    let m_dropdown;
    let m_listbox;
    let m_searchButton;
    let m_props;
    let m_value = "";
    this.destroy = destroySearch;
    this.setup = setup;
    this.suggest = suggest;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      await setupInput();
      await setupButton();
      await setupDropdown();
      setupComplete();
    }
    async function setupDOM() {
      return new Promise((resolve) => {
        m_inputContainer = ui.d.createTag({ ...m_props.tags.inputContainer, class: m_props.css.inputContainer });
        self.classList.add(m_props.css.self);
        self.appendChild(m_inputContainer);
        resolve();
      });
    }
    function setupInput() {
      return new Promise((resolve) => {
        let input = ui.utils.extend(true, {}, m_props.input);
        input.css = ui.utils.extend(true, m_props.css.input, input.css);
        input.parentTag = m_inputContainer;
        input.onClear = (context) => {
          m_value = "";
          if (m_dropdown) {
            m_dropdown.close();
          }
        };
        input.onKeyup = (context) => {
          if (m_props.input?.onKeyup) {
            m_value = context.value;
            if (m_value.length >= m_props.firedIn) {
              m_props.input.onKeyup(m_value);
            } else {
              if (m_dropdown) {
                m_dropdown.close();
              }
            }
          }
        };
        input.onComplete = resolve;
        m_input = ui.input(input);
      });
    }
    function setupButton() {
      return new Promise((resolve) => {
        let button = ui.utils.extend(true, {}, m_props.button);
        button.css = ui.utils.extend(true, m_props.css.searchButton, button.css);
        button.parentTag = self;
        button.onComplete = resolve();
        button.onClick = (context) => {
          if (m_props.button?.onClick && m_value?.length >= m_props.firedIn) {
            m_props.button.onClick(m_value);
          }
        };
        m_searchButton = ui.button(button);
      });
    }
    function setupDropdown() {
      return new Promise((resolve) => {
        if (m_props.suggest) {
          m_dropdownWrapperTag = ui.d.createTag({ ...m_props.tags.wrapper, class: m_props.css.wrapper });
          self.appendChild(m_dropdownWrapperTag);
          let dropdown = ui.utils.extend(true, {}, m_props.dropdown);
          dropdown.css = ui.utils.extend(true, m_props.css.dropdown, dropdown.css);
          dropdown.onComplete = (context) => {
            installListbox(context.Dropdown);
            resolve();
          };
          dropdown.disableButton = true;
          dropdown.positionTag = m_input;
          dropdown.parentTag = m_dropdownWrapperTag;
          m_dropdown = ui.dropdown(dropdown);
        }
        resolve();
      });
    }
    function installListbox(dropdown) {
      return new Promise((resolve) => {
        let listbox = ui.utils.extend(true, {}, m_props.suggest);
        listbox.css = ui.utils.extend(true, m_props.css.listbox, listbox.css);
        let contentTag = dropdown.getContentTag();
        listbox.parentTag = contentTag;
        listbox.data = [];
        listbox.onComplete = resolve();
        m_listbox = ui.listbox(listbox);
      });
    }
    function suggest(data) {
      if (m_props.suggest) {
        m_listbox.replaceList(data);
        m_dropdown.open();
      }
    }
    function destroySearch() {
      ui.d.remove(self);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Search: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          firedIn: 1,
          tag: "default",
          theme: "default",
          input: {
            tags: {
              input: {
                prop: {
                  placeholder: "Search"
                }
              }
            }
          }
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "search" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "search" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.search = (props) => new ui.class.Search(props);
customElements.define(ui.defaultTags.search.self.name, ui.class.Search);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
        if (m_props.enableCloseButton) {
          const configButton = { css: m_props.css.button, ...m_props.closeButton };
          configButton.parentTag = m_slideoutHeaderTag;
          configButton.onClick = closeAnimation;
          ui.button(configButton);
        }
        resolve();
      });
    }
    function openAnimation() {
      self.classList.add(m_props.css.open);
      m_slideoutOverlayTag.classList.add(m_props.css.openAnimation);
      if (m_props.onOpen) {
        m_props.onOpen({ slideout: self });
      }
    }
    function close() {
      closeAnimation();
    }
    function closeAnimation() {
      self.classList.remove(m_props.css.open);
      m_slideoutOverlayTag.classList.remove(m_props.css.openAnimation);
      if (m_props.onClose) {
        m_props.onClose({ slideout: self });
      }
    }
    function destroySlideout() {
      ui.d.remove(self).remove(m_slideoutOverlayTag);
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Slideout: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          enableCloseButton: true,
          tag: "default",
          theme: "default"
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
customElements.define(ui.defaultTags.slideout.self.name, ui.class.Slideout);
ui.class.Slider = class Slider extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_wrapperTag;
    let m_trackTag;
    let m_selectionTag;
    let m_draggable;
    let m_stepTags = [];
    let m_props;
    let m_horizontal = true;
    let m_css;
    let m_enable = true;
    let m_value = 0;
    let m_stepLength;
    this.destroy = destroySlider;
    this.enable = setEnable;
    this.getParentTag = () => self;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      await continueSetupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self, m_props.orientation);
        if (m_props.showButtons) {
          if (m_horizontal) {
            installDecreaseButton().then(appendWrapper).then(installIncreaseButton).then(resolve);
          } else {
            installIncreaseButton().then(appendWrapper).then(installDecreaseButton).then(resolve);
          }
        } else {
          appendWrapper().then(resolve);
        }
        function appendWrapper() {
          return new Promise((resolve2) => {
            m_wrapperTag = ui.d.createTag({ ...m_props.tags.wrapper, class: m_css.wrapper });
            self.appendChild(m_wrapperTag);
            resolve2();
          });
        }
      });
    }
    function continueSetupDOM() {
      return new Promise((resolve) => {
        installTrack().then(installSteps).then(installHandle).then(() => {
          setValue(m_value);
          resolve();
        });
      });
    }
    function installDecreaseButton() {
      return installButton(m_props.decreaseButton, m_css.decreaseButton, handleDecrease);
    }
    function installIncreaseButton() {
      return installButton(m_props.increaseButton, m_css.increaseButton, handleIncrease);
    }
    function installButton(config, css, onClick) {
      return new Promise((resolve) => {
        const buttonConfig = ui.utils.extend(true, {}, config);
        buttonConfig.css = ui.utils.extend(true, css, buttonConfig.css);
        buttonConfig.parentTag = self;
        buttonConfig.onClick = (context) => {
          onClick();
          if (m_props.onSelect) {
            m_props.onSelect({ Slider: self, ev: context.ev });
          }
          if (config?.onClick) {
            config.onClick(context);
          }
        };
        ui.button(buttonConfig);
        resolve();
      });
    }
    function installTrack() {
      return new Promise((resolve) => {
        m_trackTag = ui.d.createTag({ ...m_props.tags.track, class: m_css.track });
        m_selectionTag = ui.d.createTag({ ...m_props.tags.selection, class: m_css.selection });
        m_wrapperTag.appendChild(m_trackTag);
        m_wrapperTag.appendChild(m_selectionTag);
        resolve();
      });
    }
    function installSteps() {
      return new Promise((resolve) => {
        let stepsTag = ui.d.createTag({ ...m_props.tags.stepsContainer, class: m_css.stepsContainer });
        ui.d.prepend(m_wrapperTag, stepsTag);
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
    function handleDecrease() {
      setValue(m_value - m_props.step);
    }
    function handleIncrease() {
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
          parentTag: m_wrapperTag,
          containerTag: m_wrapperTag,
          css: {
            draggable: m_css.handle
          },
          tags: m_props.tags?.draggable?.tags,
          axis: m_horizontal ? "x" : "y",
          grid: m_horizontal ? [m_stepLength, 0] : [0, m_stepLength],
          onDragStart: (context) => {
            if (m_props.onSlideStart) {
              m_props.onSlideStart({ Slider: self, ev: context.ev });
            }
          },
          onDragEnd: updateValue,
          onDrag: updateSelection,
          onComplete: resolve
        };
        m_draggable = ui.draggable(config);
        setEnable(m_enable);
      });
    }
    function updateValue(context) {
      m_value = Number(m_stepTags[getSelectedIndex()].id);
      setHandlePosition();
      if (m_props.onSelect) {
        m_props.onSelect({ Slider: self, ev: context.ev });
      }
    }
    function updateSelection(context) {
      setSelectionPosition();
      if (m_props.onSlide) {
        m_props.onSlide({ Slider: self, ev: context.ev });
      }
    }
    function getSelectedIndex() {
      let handleOffset = m_horizontal ? m_draggable.getParentTag().offsetLeft : m_wrapperTag.clientHeight - m_draggable.getParentTag().offsetTop;
      for (let i = 0; i < m_stepTags.length; i++) {
        let stepOffset = m_horizontal ? m_stepTags[i].offsetLeft : m_wrapperTag.clientHeight - m_stepTags[i].offsetTop;
        if (handleOffset <= stepOffset) {
          if (stepOffset - handleOffset > m_stepLength / 2 && i > 0) {
            return i - 1;
          }
          return i;
        }
      }
      return 0;
    }
    function setEnable(enable) {
      m_enable = enable;
      self.classList.toggle(m_props.css.disabled, !m_enable);
      m_draggable.enable(m_enable);
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
      let handleTag = m_draggable.getParentTag();
      if (m_horizontal) {
        const length = stepTag.getBoundingClientRect().left - m_wrapperTag.getBoundingClientRect().left - handleTag.clientWidth / 2;
        handleTag.style.left = length + "px";
      } else {
        const length = stepTag.getBoundingClientRect().top - m_wrapperTag.getBoundingClientRect().top - handleTag.clientHeight / 2;
        handleTag.style.top = length + "px";
      }
      setSelectionPosition();
    }
    function setSelectionPosition() {
      const handleTag = m_draggable.getParentTag();
      if (m_horizontal) {
        m_selectionTag.style.width = handleTag.offsetLeft + "px";
      } else {
        const length = m_wrapperTag.getBoundingClientRect().bottom - handleTag.getBoundingClientRect().bottom;
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
      if (m_props.onComplete) {
        m_props.onComplete({ Slider: self });
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
          enable: true,
          showButtons: true,
          decreaseButton: { text: "" },
          increaseButton: { text: "" }
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
customElements.define(ui.defaultTags.slider.self.name, ui.class.Slider);
ui.class.Switch = class Switch extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_inputTag;
    let m_containerTag;
    let m_textTag;
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
        if (m_props.text) {
          m_textTag = ui.d.createTag({ ...m_props.tags.text, class: m_props.css.text });
          m_textTag.innerHTML = m_props.text;
          if (m_props.position === "left")
            self.appendChild(m_textTag);
        }
        self.classList.add(m_props.css.self);
        self.appendChild(m_inputTag);
        self.appendChild(m_containerTag);
        if (m_props.text && m_props.position === "right") {
          self.appendChild(m_textTag);
        }
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
      if (m_props.onChange) {
        m_props.onChange({ Switch: self, ev });
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
      if (m_props.onComplete) {
        m_props.onComplete({ Switch: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          enable: true,
          text: "",
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
customElements.define(ui.defaultTags.switch.self.name, ui.class.Switch);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
        tabConfig.onClick = toggleTabContent;
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
            button.id = button.id ? button.id : index;
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
            if (m_props.onTabComplete) {
              m_props.onTabComplete(contentTag, button);
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
      if (m_props.tabs.onClick) {
        m_props.tabs.onClick(clickedBtn);
      }
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Tab: self });
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
customElements.define(ui.defaultTags.tab.self.name, ui.class.Tab);
ui.class.Textarea = class Textarea extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_iconList = [];
    let m_buttonsContainerTag;
    let m_cancelButton;
    let m_containerDownTag;
    let m_containerUpTag;
    let m_checkButton;
    let m_dataChanged;
    let m_editButton;
    let m_editable;
    let m_footerTag;
    let m_iconsContainerTag;
    let m_iconRequiredTag;
    let m_labelTag;
    let m_parentTag;
    let m_props;
    let m_required;
    let m_spanTag;
    let m_textareaTag;
    let m_textRequiredTag;
    this.commitDataChange = () => m_dataChanged = null;
    this.dataChanged = () => m_dataChanged;
    this.editable = () => m_editable;
    this.getIconTagById = getIconTagById;
    this.getTag = () => m_textareaTag;
    this.showRequired = showRequired;
    this.setup = setup;
    this.value = value;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        m_containerUpTag = ui.d.createTag({ ...m_props.tags.containerUp, class: m_props.css.containerUp });
        self.appendChild(m_containerUpTag);
        m_containerDownTag = ui.d.createTag({ ...m_props.tags.containerDown, class: m_props.css.containerDown });
        self.appendChild(m_containerDownTag);
        const tagConfig = {
          ...m_props.tags.textarea,
          class: m_props.css.textarea,
          text: m_props.value,
          attr: m_props.attr.textarea,
          event: {
            blur: handleOnBlur,
            change: handleOnChange,
            keyup: handleOnKeyup
          }
        };
        tagConfig.attr.name = m_props.name;
        m_textareaTag = ui.d.createTag(tagConfig);
        m_containerUpTag.appendChild(m_textareaTag);
        if (m_props.hidden) {
          self.style.display = "none";
        } else if (ui.utils.isString(m_props.labelText)) {
          const labelTagConfig = {
            name: "label",
            class: m_props.css.label,
            prop: m_props.prop,
            attr: { for: m_props.name },
            text: m_props.labelText
          };
          m_labelTag = ui.d.createTag(labelTagConfig);
          m_containerUpTag.appendChild(m_labelTag);
        }
        if (m_props?.validate?.onStart) {
          validate();
        }
        m_spanTag = ui.d.createTag({ ...m_props.tags.span, class: m_props.css.span, event: { click: handleClick } });
        m_containerUpTag.appendChild(m_spanTag);
        m_footerTag = ui.d.createTag({ ...m_props.tags.footer, class: m_props.css.footer });
        m_containerUpTag.appendChild(m_footerTag);
        m_buttonsContainerTag = ui.d.createTag({
          ...m_props.tags.buttonsContainer,
          class: m_props.css.buttonsContainer
        });
        m_footerTag.appendChild(m_buttonsContainerTag);
        m_iconsContainerTag = ui.d.createTag({ ...m_props.tags.iconsContainer, class: m_props.css.iconsContainer });
        m_footerTag.appendChild(m_iconsContainerTag);
        m_iconRequiredTag = ui.d.createTag({ ...m_props.tags.iconRequired, class: m_props.css.iconRequired });
        m_iconList.push(m_iconRequiredTag);
        m_footerTag.appendChild(m_iconRequiredTag);
        m_textRequiredTag = ui.d.createTag({ ...m_props.tags.textRequired, class: m_props.css.textRequired });
        m_textRequiredTag.innerText = m_props.requiredText;
        m_containerDownTag.appendChild(m_textRequiredTag);
        if (m_props.icon) {
          insertIcon();
        }
        if (m_props.editable) {
          installButtons().then(resolve);
          enableSpan();
        }
        if (m_props.required) {
          m_required = m_props.required;
        }
      });
    }
    function installButtons() {
      return new Promise((resolve) => {
        installEditButton().then(resolve);
        installCancelButton().then(resolve);
        installCheckButton().then(resolve);
      });
    }
    function installCancelButton() {
      return new Promise((resolve) => {
        if (m_props.editable) {
          const buttonConfig = {
            ...m_props.cancelButton,
            css: m_props.css.cancelButton,
            parentTag: m_buttonsContainerTag,
            onComplete: resolve,
            onClick: (context) => {
              enableSpan();
              if (m_props.onClear) {
                m_props.onClear({
                  Textarea: self,
                  Button: context.Button,
                  ev: context.ev
                });
              }
            }
          };
          m_cancelButton = ui.button(buttonConfig);
        }
      });
    }
    function installEditButton() {
      return new Promise((resolve) => {
        if (m_props.editable) {
          const buttonConfig = {
            ...m_props.editButton,
            css: m_props.css.editButton,
            parentTag: m_buttonsContainerTag,
            onComplete: resolve,
            onClick: (context) => {
              enableTextarea();
              if (m_props.onClick) {
                m_props.onClick({
                  Textarea: self,
                  Button: context.Button,
                  ev: context.ev
                });
              }
            }
          };
          m_editButton = ui.button(buttonConfig);
        }
      });
    }
    function installCheckButton() {
      return new Promise((resolve) => {
        if (m_props.editable) {
          const buttonConfig = {
            ...m_props.checkButton,
            css: m_props.css.checkButton,
            parentTag: m_buttonsContainerTag,
            onComplete: resolve,
            onClick: (context) => {
              saveTextareaValue();
              if (m_props.onClick) {
                m_props.onClick({
                  Textarea: self,
                  Button: context.Button,
                  ev: context.ev
                });
              }
            }
          };
          m_checkButton = ui.button(buttonConfig);
        }
      });
    }
    function handleClick(ev) {
      if (m_props.preventDefault) {
        ev.preventDefault();
      }
      if (m_props.stopPropagation) {
        ev.stopPropagation();
      }
      if (!m_editable)
        enableTextarea();
    }
    function handleOnBlur(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      validate(ev);
      if (m_props.onBlur) {
        m_props.onBlur({
          Textarea: self,
          value: m_textareaTag.value,
          ev
        });
      }
    }
    function handleOnChange(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      validate(ev);
      if (m_props.onChange) {
        m_props.onChange({
          Textarea: self,
          value: m_textareaTag.value,
          ev
        });
      }
    }
    function handleOnKeyup(ev) {
      ev.stopPropagation();
      ev.preventDefault();
      validate(ev);
      if (m_props.onKeyup) {
        m_props.onKeyup({
          Textarea: self,
          value: m_textareaTag.value,
          ev
        });
      }
    }
    function validate(ev) {
      if (Array.isArray(m_props.validate?.types)) {
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
    }
    function validateMinLength(config, ev) {
      const curLen = m_textareaTag.value.length;
      if (typeof config.value === "string") {
        const length = config.len - curLen;
        if (length > 0) {
          const padding = config.value.repeat(length);
          m_dataChanged = true;
          m_textareaTag.value = config.dir === "right" ? m_textareaTag.value + padding : padding + m_textareaTag.value;
          if (m_props.onDataValidationChange) {
            m_props.onDataValidationChange({
              Textarea: self,
              ev
            });
          }
        }
      }
    }
    function value(context = {}) {
      if (typeof context.value === "undefined") {
        return m_textareaTag.value;
      } else {
        m_textareaTag.value = context.value;
      }
    }
    function insertIcon() {
      if (Array.isArray(m_props.icon)) {
        m_props.icon.forEach((icon) => {
          addIcon(icon);
        });
      } else {
        addIcon(m_props.icon);
      }
      function addIcon(icon) {
        const cssClasses = [m_props.css.icon, icon.attr.class, icon.size].filter(Boolean).join(" ");
        const tagConfig = {
          class: cssClasses,
          prop: icon.prop,
          attr: icon.attr
        };
        let iconTag = ui.d.createTag("i", tagConfig);
        m_iconList.push(iconTag);
        m_iconsContainerTag.appendChild(iconTag);
      }
    }
    function getIconTagById(id) {
      return m_iconList.find((icon) => icon.id === id);
    }
    function enableTextarea() {
      m_editable = true;
      m_textareaTag.value = m_spanTag.innerText;
      m_textareaTag.style.display = "block";
      m_spanTag.style.display = "none";
      m_checkButton.style.display = "block";
      m_editButton.style.display = "none";
      m_cancelButton.style.display = "block";
      m_textareaTag.focus();
    }
    function saveTextareaValue() {
      m_spanTag.innerText = m_textareaTag.value;
      enableSpan();
    }
    function enableSpan() {
      m_editable = false;
      m_textareaTag.style.display = "none";
      m_spanTag.style.display = "inline-block";
      m_spanTag.scrollTop = 0;
      m_checkButton.style.display = "none";
      m_editButton.style.display = "block";
      m_cancelButton.style.display = "none";
    }
    function showRequired() {
      if (m_iconRequiredTag && m_props.required && m_textareaTag.value === "") {
        m_iconRequiredTag.classList.remove("hidden");
        m_textRequiredTag.classList.remove("hidden");
      } else {
        m_iconRequiredTag.classList.add("hidden");
        m_textRequiredTag.classList.add("hidden");
      }
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Textarea: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          id: Math.random().toString(36).slice(2),
          editButton: { text: "" },
          cancelButton: { text: "" },
          checkButton: { text: "" },
          icon: [],
          requiredText: "This is a required field."
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_editable = m_props.editable;
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "textarea" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "textarea" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.textarea = (props) => new ui.class.Textarea(props);
customElements.define(ui.defaultTags.textarea.self.name, ui.class.Textarea);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
        const comboboxCss = { ...m_props.css?.combobox };
        const combobox = ui.utils.extend(true, { css: comboboxCss }, m_props.combobox);
        combobox.parentTag = self;
        combobox.data = createComboBoxData();
        if (m_props.value) {
          let value2 = ui.date.getDate(m_props.value, m_props.format);
          if (value2) {
            combobox.value = ui.date.format(value2, m_props.format);
          }
        }
        combobox.onSelect = (context) => {
          selectTime(context);
          if (m_props.combobox.onSelect) {
            m_props.combobox.onSelect(context);
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
      if (m_props.onSelect) {
        m_props.onSelect({
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
      if (m_props.onComplete) {
        m_props.onComplete({ TimePicker: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          tag: "default",
          theme: "default",
          combobox: {
            filter: false
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
customElements.define(ui.defaultTags.timePicker.self.name, ui.class.TimePicker);
ui.class.Toaster = class Toaster extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    const m_iconList = [];
    let m_button;
    let m_bodyTag;
    let m_buttonContainer;
    let m_iconContainer;
    let m_parentTag;
    let m_props;
    let m_autoHideDuration;
    let m_open;
    let m_message;
    let m_size;
    let m_type;
    let m_position;
    this.close = close;
    this.button = () => m_button;
    this.getParentTag = () => self;
    this.getBodyTag = () => m_bodyTag;
    this.getMessage = () => m_message;
    this.getButtonContainer = () => m_buttonContainer;
    this.getIconList = () => m_iconList;
    this.autoHideDuration = () => m_autoHideDuration;
    this.open = () => m_open;
    this.restart = restart;
    this.setup = setup;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      m_autoHideDuration = m_props.autoHideDuration;
      m_open = m_props.open;
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_iconContainer = ui.d.createTag({ ...m_props.tags.iconContainer, class: m_props.css.iconContainer });
        m_bodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
        m_buttonContainer = ui.d.createTag({ ...m_props.tags.buttonContainer, class: m_props.css.buttonContainer });
        installCloseButton();
        self.classList.add(m_props.css.self);
        setupStyles();
        addIcon(m_props.css.icon[m_type]);
        m_message = m_props.message;
        m_bodyTag.innerHTML = m_props.message;
        self.appendChild(m_iconContainer);
        self.appendChild(m_bodyTag);
        self.appendChild(m_buttonContainer);
        resolve();
      });
    }
    async function restart(context = {}) {
      m_iconList.length = 0;
      m_iconContainer.innerHTML = "";
      m_props.open = context.open;
      await configure(context);
      self.classList.remove(m_props.css.position[m_position?.horizontal]);
      self.classList.remove(m_props.css.position[m_position?.vertical]);
      self.classList.remove(m_props.css.position.centerV);
      if (m_type) {
        self.classList.remove(m_props.css.type[m_type]);
      }
      if (m_size) {
        self.classList.remove(m_props.css.size[m_size]);
      }
      m_autoHideDuration = m_props.autoHideDuration;
      setupStyles();
      addIcon(m_props.css.icon[m_type]);
      m_message = m_props.message;
      m_bodyTag.innerHTML = m_props.message;
      if (m_props.onComplete) {
        m_props.onComplete({ Toaster: self });
      }
    }
    function setupStyles() {
      self.style.setProperty(m_props.distanceXVar, `${m_props.distance.x}`);
      self.style.setProperty(m_props.distanceYVar, `${m_props.distance.y}`);
      self.style.setProperty(m_props.animationDistanceVar, `${m_props.animation.distance}`);
      self.style.setProperty(m_props.animationDurationVar, `${m_props.animation.duration}`);
      if (m_props.animation.name === "top-bottom") {
        self.classList.remove(m_props.css.animation.topBottomOut);
        self.classList.remove(m_props.css.animation.bottomTopOut);
        self.classList.add(m_props.css.animation.topBottomIn);
      }
      if (m_props.animation.name === "bottom-top") {
        self.classList.remove(m_props.css.animation.topBottomOut);
        self.classList.remove(m_props.css.animation.bottomTopOut);
        self.classList.add(m_props.css.animation.bottomTopIn);
      }
      if (m_props.parentTag !== "body") {
        self.classList.add("m-toaster-static");
      } else {
        m_position = m_props.anchorOrigin;
        m_size = m_props.size;
        m_type = m_props.type;
        self.classList.add(m_props.css.position[m_position.horizontal]);
        if (m_position.vertical === "center") {
          self.classList.add(m_props.css.position.centerV);
        } else {
          self.classList.add(m_props.css.position[m_position.vertical]);
        }
        if (m_size) {
          self.classList.add(m_props.css.size[m_size]);
        }
      }
      if (m_type) {
        self.classList.add(m_props.css.type[m_type]);
      }
      m_props.open ? self.style.display = "flex" : self.style.display = "none";
    }
    function addIcon(icon) {
      const tagConfig = {
        class: icon
      };
      let iconTag = ui.d.createTag("i", tagConfig);
      m_iconList.push(iconTag);
      m_iconContainer.appendChild(iconTag);
    }
    function installCloseButton() {
      if (m_props.closeButton) {
        const btnConfig = {
          ...m_props.button,
          css: m_props.css.button,
          parentTag: m_buttonContainer,
          attr: {
            type: "button"
          },
          onClick: (context) => {
            close();
            if (m_props.onClose) {
              m_props.onClose({
                Toaster: self,
                Button: context.Button,
                ev: context.ev
              });
            }
          }
        };
        m_button = ui.button(btnConfig);
      }
    }
    function close() {
      if (m_open) {
        if (m_props.animation.name) {
          closeAnimation();
        } else {
          if (m_props.persist) {
            self.style.display = "none";
            m_open = false;
          } else {
            ui.d.remove(self);
            m_open = false;
          }
        }
      }
      if (!m_open) {
        if (m_props.persist) {
          if (m_props.animation.name) {
            closeAnimation();
          } else {
            self.style.display = "none";
          }
        }
        if (m_props.animation.name) {
          closeAnimation();
        }
      }
    }
    function closeAnimation() {
      if (m_props.animation.name === "top-bottom") {
        self.classList.remove(m_props.css.animation.topBottomIn);
        self.classList.add(m_props.css.animation.topBottomOut);
      }
      if (m_props.animation.name === "bottom-top") {
        self.classList.remove(m_props.css.animation.bottomTopIn);
        self.classList.add(m_props.css.animation.bottomTopOut);
      }
      const animationName = window.getComputedStyle(self).getPropertyValue("animation-name");
      self.addEventListener("animationend", function handler(event) {
        if (event.animationName === animationName) {
          if (m_props.persist) {
            self.style.display = "none";
            m_open = false;
          } else {
            ui.d.remove(self);
            m_open = false;
          }
          self.removeEventListener("animationend", handler);
        }
      });
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Toaster: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          open: true,
          parentTag: "body",
          closeButton: true,
          button: { text: "" },
          closeText: "",
          theme: "default",
          tag: "default",
          anchorOrigin: { horizontal: "center", vertical: "top" },
          distanceXVar: "--m-toaster-distance-x",
          distanceYVar: "--m-toaster-distance-y",
          animationDistanceVar: "--m-toaster-animation-distance",
          animationDurationVar: "--m-toaster-animation-duration",
          animation: { distance: "100%", duration: "0.3s" },
          distance: { x: "1.5rem", y: "1.5rem" }
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "toaster" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "toaster" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.toaster = (props) => new ui.class.Toaster(props);
customElements.define(ui.defaultTags.toaster.self.name, ui.class.Toaster);
ui.class.Tooltip = class Tooltip extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_anchorTag;
    let m_bodyTag;
    let m_parentTag;
    let m_props;
    let m_open;
    let m_position;
    this.show = show;
    this.hide = hide;
    this.getParentTag = () => self;
    this.getBodyTag = () => m_bodyTag;
    this.getAnchorTag = () => m_anchorTag;
    this.open = () => m_open;
    this.setup = setup;
    this.updatePosition = updatePosition;
    if (props) {
      setup(props);
    }
    async function setup(props2) {
      await configure(props2);
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupEventListeners();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        m_bodyTag = ui.d.createTag({ ...m_props.tags.body, class: m_props.css.body });
        self.appendChild(m_bodyTag);
        self.classList.add(m_props.css.self);
        self.style.visibility = "hidden";
        if (m_props.position) {
          m_position = m_props.position;
          self.classList.add(m_props.position);
        }
        resolve();
      });
    }
    function setupEventListeners() {
      m_anchorTag = ui.d.getTag(m_props.anchorTag);
      if (!m_anchorTag) {
        console.error("Anchor element not found for tooltip");
        return;
      }
      m_anchorTag.addEventListener("mouseover", handleMouseOver);
      m_anchorTag.addEventListener("mouseout", handleMouseOut);
      m_anchorTag.addEventListener("focus", handleFocus);
      m_anchorTag.addEventListener("blur", handleBlur);
    }
    function updatePosition() {
      if (!m_open || !m_anchorTag)
        return;
      const anchorRect = m_anchorTag.getBoundingClientRect();
      const tooltipRect = self.getBoundingClientRect();
      let top, left;
      switch (m_position) {
        case "top":
          top = anchorRect.top - tooltipRect.height;
          left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;
          break;
        case "bottom":
          top = anchorRect.bottom;
          left = anchorRect.left + (anchorRect.width - tooltipRect.width) / 2;
          break;
        case "left":
          top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
          left = anchorRect.left - tooltipRect.width;
          break;
        case "right":
          top = anchorRect.top + (anchorRect.height - tooltipRect.height) / 2;
          left = anchorRect.right;
          break;
      }
      const viewport = {
        top: 0,
        left: 0,
        right: window.innerWidth,
        bottom: window.innerHeight
      };
      if (left < viewport.left)
        left = viewport.left;
      if (left + tooltipRect.width > viewport.right)
        left = viewport.right - tooltipRect.width;
      if (top < viewport.top)
        top = viewport.top;
      if (top + tooltipRect.height > viewport.bottom)
        top = viewport.bottom - tooltipRect.height;
      self.style.top = `${top}px`;
      self.style.left = `${left}px`;
    }
    function show() {
      if (!m_open) {
        self.style.visibility = "visible";
        self.classList.add(m_props.css.open);
        m_open = true;
        updatePosition();
        if (m_props.onShow) {
          m_props.onShow({ Tooltip: self });
        }
      }
    }
    function hide() {
      if (m_open) {
        self.style.visibility = "hidden";
        self.classList.remove(m_props.css.open);
        m_open = false;
        if (m_props.onHide) {
          m_props.onHide({ Tooltip: self });
        }
      }
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ Tooltip: self });
      }
    }
    function handleMouseOver() {
      if (m_props.onMouseOver) {
        m_props.onMouseOver({ Tooltip: self });
      }
    }
    function handleMouseOut() {
      if (m_props.onMouseOut) {
        m_props.onMouseOut({ Tooltip: self });
      }
    }
    function handleFocus() {
      if (m_props.onFocus) {
        m_props.onFocus({ Tooltip: self });
      }
    }
    function handleBlur() {
      if (m_props.onBlur) {
        m_props.onBlur({ Tooltip: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          parentTag: "body",
          position: "top",
          theme: "default",
          tag: "default"
        };
        m_props = ui.utils.extend(true, m_props, customProps);
        m_parentTag = ui.d.getTag(m_props.parentTag);
        const tags = ui.tags.getTags({ name: m_props.tag, component: "tooltip" });
        m_props.tags = ui.utils.extend(true, tags, m_props.tags);
        const css = ui.theme.getTheme({ name: m_props.theme, component: "tooltip" });
        m_props.css = ui.utils.extend(true, css, m_props.css);
        resolve();
      });
    }
  }
};
ui.tooltip = (props) => new ui.class.Tooltip(props);
customElements.define(ui.defaultTags.tooltip.self.name, ui.class.Tooltip);
ui.class.TreeView = class TreeView extends HTMLElement {
  constructor(props) {
    super();
    const self = this;
    let m_parentTag;
    let m_props;
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        self.classList.add(m_props.css.self);
        processTreeData(props.data, self).then(resolve);
      });
    }
    function processTreeData(groupData, parentTag) {
      return new Promise((resolve) => {
        const itemPromises = groupData.map((itemData) => {
          return processItem(itemData, parentTag);
        });
        Promise.all(itemPromises).then(resolve);
      });
    }
    function processItem(itemData, parentTag) {
      return new Promise((resolve) => {
        let itemTag = ui.d.createTag({ ...m_props.tags.item, class: m_props.css.item });
        parentTag.appendChild(itemTag);
        let itemId = m_props.idField in itemData ? itemData[m_props.idField] : ui.utils.getUniqueId();
        let idAtt = {};
        idAtt[m_props.itemIdAttrName] = itemId;
        m_dataMapById[itemId] = ui.utils.clone(itemData);
        delete m_dataMapById[itemId][m_props.itemsField];
        const topTag = ui.d.createTag({ ...m_props.tags.itemTop, class: m_props.css.itemTop });
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
      processTreeData(groupData, groupTag);
      return groupTag;
    }
    function installIcon(parentTag, groupTag, itemData) {
      return new Promise((resolve) => {
        const expanded = "expanded" in itemData ? itemData.expanded : m_props.expanded;
        const iconTag = ui.d.createTag({
          ...m_props.tags.icon,
          class: m_props.css.icon,
          event: {
            click: () => {
              toggleExpand(groupTag, iconTag);
            }
          }
        });
        iconTag.classList.add(m_props.css.iconExpand);
        ui.d.prepend(parentTag, iconTag);
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
          if (m_props.onSelect) {
            m_props.onSelect({
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
      if (m_props.onComplete) {
        m_props.onComplete({ TreeView: self });
      }
    }
    function configure(customProps = {}) {
      return new Promise((resolve) => {
        m_props = {
          data: [],
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
customElements.define(ui.defaultTags.treeView.self.name, ui.class.TreeView);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
      await setupDOM();
      setupComplete();
    }
    function setupDOM() {
      return new Promise((resolve) => {
        resolve();
      });
    }
    function setupComplete() {
      if (m_props.onComplete) {
        m_props.onComplete({ UITemplate: self });
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
customElements.define(ui.defaultTags.template.self.name, Template);
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
      if (!self.isConnected) {
        await ui.utils.installUIComponent({ self, m_parentTag, m_props });
      }
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
      if (m_props.onComplete) {
        m_props.onComplete({ VideoPlayer: self });
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
customElements.define(ui.defaultTags.videoPlayer.self.name, ui.class.VideoPlayer);

return ui;
}
