function storyButton(selectedStory) {
  singleButton();
  textIcon();
  textImage();
  primaryLarge();
  primaryMedium();
  primarySmall();
  secondaryLarge();
  secondaryMedium();
  secondarySmall();
  primaryDisabled();
  secondaryDisabled();
  buttonImgWithHover();
  function singleButton() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 8,
      text: "Single Button",
      enable: true
    };
    ui.button(config);
  }
  function primaryLarge() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 3,
      text: "Button",
      size: "large",
      type: "primary",
      icon: [
        {
          attr: {
            class: "fa-solid fa-plus"
          },
          size: "large"
        }
      ]
    };
    ui.button(config);
  }
  function primaryMedium() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 2,
      text: "",
      size: "medium",
      type: "primary",
      icon: [
        {
          attr: {
            class: "fa-solid fa-plus"
          },
          size: "medium"
        }
      ]
    };
    ui.button(config);
  }
  function primarySmall() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 1,
      text: "Button",
      size: "small",
      type: "primary",
      icon: [
        {
          attr: {
            class: "fa-solid fa-plus"
          },
          size: "small",
          position: "left"
        }
      ],
      onClick: (context) => {
        console.log(`${context.Button.text()} clicked.`);
      }
    };
    ui.button(config);
  }
  function secondaryLarge() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 4,
      text: "Button",
      size: "large",
      type: "secondary"
    };
    ui.button(config);
  }
  function secondaryMedium() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 5,
      text: "Button",
      size: "medium",
      type: "secondary",
      icon: [
        {
          attr: {
            class: "fa-solid fa-plus"
          },
          size: "medium",
          position: "left"
        }
      ]
    };
    ui.button(config);
  }
  function secondarySmall() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 6,
      text: "Button",
      size: "small",
      type: "secondary"
    };
    ui.button(config);
  }
  function primaryDisabled() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 7,
      text: "Primary",
      size: "medium",
      type: "primary",
      enable: false,
      icon: [
        {
          attr: {
            class: "fa-solid fa-plus"
          },
          size: "medium",
          position: "right"
        }
      ]
    };
    ui.button(config);
  }
  function secondaryDisabled() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 8,
      text: "Secondary",
      size: "medium",
      type: "secondary",
      enable: false
    };
    ui.button(config);
  }
  function textImage() {
    const config = {
      parentTag: selectedStory.parentTag,
      img: {
        attr: {
          src: "img/storyboard/home-icon.svg",
          alt: "home"
        },
        position: "left"
      },
      id: 2,
      text: "Image Button",
      onClick: (context) => {
        console.log(`${context.Button.text()} clicked.`);
      }
    };
    ui.button(config);
  }
  function buttonImgWithHover() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 5,
      text: "Hover Button",
      img: {
        attr: {
          src: "img/storyboard/home-icon.svg",
          alt: "home"
        },
        hover: "img/storyboard/star.png"
      },
      onClick: (context) => {
        console.log(`${context.Button.text()} clicked.`);
      }
    };
    ui.button(config);
  }
  function textIcon() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 3,
      text: "Icon Button",
      icon: [
        {
          attr: {
            class: "fa-solid fa-star"
          }
        },
        {
          attr: {
            class: "fa-solid fa-circle"
          }
        }
      ],
      onMouseDown: (context) => {
        console.log(`${context.Button.text()} Mouse Down.`);
      },
      onMouseUp: (context) => {
        console.log(`${context.Button.text()} Mouse Up.`);
      }
    };
    ui.button(config);
  }
}
function storyButtonGroup(selectedStory) {
  demoButtonGroup();
  demoButtonGroupIcon();
  demoPrimaryButtonGroup();
  demoSecondaryButtonGroupIcon();
  function demoButtonGroup() {
    let btnGroupProps = {
      parentTag: selectedStory.parentTag,
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
      }
    };
    ui.buttonGroup(btnGroupProps);
  }
  function demoButtonGroupIcon() {
    let btnGroupProps = {
      parentTag: selectedStory.parentTag,
      buttons: [
        {
          id: 1,
          text: "Button One",
          onClick: (context) => {
          },
          icon: [
            {
              attr: {
                class: "fa-solid fa-star"
              }
            },
            {
              attr: {
                class: "fa-solid fa-star"
              }
            }
          ]
        },
        {
          id: 2,
          text: "Button Two",
          icon: [
            {
              attr: {
                class: "fa-solid fa-compass"
              },
              size: "medium"
            }
          ]
        },
        {
          id: 3,
          text: "Button Three",
          icon: [
            {
              attr: {
                class: "fa-solid fa-star"
              }
            },
            {
              attr: {
                class: "fa-solid fa-star"
              }
            }
          ]
        }
      ],
      onClick: (context) => {
      }
    };
    ui.buttonGroup(btnGroupProps);
  }
  function demoPrimaryButtonGroup() {
    let btnGroupProps = {
      parentTag: selectedStory.parentTag,
      buttons: [
        {
          id: 1,
          text: "Button One",
          onClick: (context) => {
          },
          type: "primary",
          size: "small"
        },
        {
          id: 2,
          text: "Button Two",
          type: "primary",
          size: "medium"
        },
        {
          id: 3,
          text: "Button Three",
          type: "primary",
          size: "small"
        }
      ],
      onClick: (context) => {
      }
    };
    ui.buttonGroup(btnGroupProps);
  }
  function demoSecondaryButtonGroupIcon() {
    let btnGroupProps = {
      parentTag: selectedStory.parentTag,
      buttons: [
        {
          id: 1,
          text: "Button One",
          type: "secondary",
          size: "small",
          onClick: (context) => {
          },
          icon: [
            {
              attr: {
                class: "fa-solid fa-star"
              },
              position: "left",
              size: "small"
            },
            {
              attr: {
                class: "fa-solid fa-star"
              },
              position: "left",
              size: "small"
            }
          ]
        },
        {
          id: 2,
          text: "Button Two",
          type: "secondary",
          size: "large",
          icon: [
            {
              attr: {
                class: "fa-solid fa-star"
              },
              position: "left",
              size: "large"
            },
            {
              attr: {
                class: "fa-solid fa-star"
              },
              position: "right",
              size: "large"
            }
          ]
        },
        {
          id: 3,
          text: "Button Three",
          type: "secondary",
          size: "small",
          icon: [
            {
              attr: {
                class: "fa-solid fa-star"
              }
            },
            {
              attr: {
                class: "fa-solid fa-star"
              }
            }
          ]
        }
      ],
      onClick: (context) => {
      }
    };
    ui.buttonGroup(btnGroupProps);
  }
}
function storyButtonSVG(selectedStory) {
  textImage();
  buttonImgWithHover();
  function textImage() {
    const config = {
      parentTag: selectedStory.parentTag,
      img: {
        attr: {
          src: "img/storyboard/home-icon.svg",
          alt: "home"
        }
      },
      id: 2,
      text: "Image Button",
      onClick: (context) => {
        alert(`${context.Button.text()} clicked.`);
      }
    };
    ui.button(config);
  }
  function buttonImgWithHover() {
    const config = {
      parentTag: selectedStory.parentTag,
      id: 5,
      text: "Hover Button",
      img: {
        attr: {
          src: "img/storyboard/home-icon.svg",
          alt: "home"
        },
        hover: "img/storyboard/star.png"
      },
      onClick: (context) => {
        alert(`${context.Button.text()} clicked.`);
      }
    };
    ui.button(config);
  }
}
function storyCalendar(selectedStory) {
  let config = {
    parentTag: selectedStory.parentTag
  };
  ui.calendar(config);
}
function storyCard(selectedStory) {
  const configCard1 = {
    parentTag: selectedStory.parentTag,
    content: `<figure style='height: 9rem;overflow: hidden;margin: 0;'>
			 	<img style='width: 100%; height: 10rem; overflow: hidden; object-fit: cover;' src='img/storyboard/shoes.jpg' alt='Shoes' />
			 </figure>
			 <div style='display: flex; flex-direction: column; padding: 1rem; gap: 0.5rem;'>
			 <div style='color: black;'>Buy new shoes</div>
			 <div style='color: gray;'>Only $100</div>`
  };
  ui.card(configCard1);
  const configCard2 = {
    parentTag: selectedStory.parentTag,
    onComplete: (context) => {
      context.Card.getBodyTag().innerHTML = `<p style='padding:3rem;'>Your Card content will go here</p>
				 <div style='display: flex; justify-content: flex-end; padding: 1rem;'>
				 <mambo-button id='btnSelect'></mambo-button>`;
      const button = document.getElementById("btnSelect");
      button.setup({
        text: "Seleccionar",
        type: "primary",
        size: "small",
        onClick: () => {
          console.log("Button clicked");
        }
      });
    }
  };
  ui.card(configCard2);
}
function storyCheckbox(selectedStory) {
  const config = {
    parentTag: selectedStory.parentTag,
    text: "Checkbox",
    position: "right"
  };
  ui.checkbox(config);
  const configCheckboxLeft = {
    parentTag: selectedStory.parentTag,
    text: "Checkbox",
    position: "left"
  };
  ui.checkbox(configCheckboxLeft);
  const configCheckboxNoText = {
    parentTag: selectedStory.parentTag,
    text: "",
    position: "left"
  };
  ui.checkbox(configCheckboxNoText);
}
function storyCheckboxGroup(selectedStory) {
  const config = {
    parentTag: selectedStory.parentTag,
    checkbox: {
      position: "right"
    },
    checkboxes: [
      {
        text: "",
        checked: true,
        onClick: (context) => {
        },
        position: "right"
      },
      {
        text: "CheckBox 1",
        checked: true
      },
      {
        text: "CheckBox 2",
        checked: false,
        position: "right"
      }
    ],
    onClick: (context) => {
    },
    onGroupClick: (context) => {
    }
  };
  ui.checkboxGroup(config);
}
function storyCombobox(selectedStory) {
  const config = {
    parentTag: selectedStory.parentTag,
    value: "mambo-combobox",
    data: [
      { text: "Item 1", id: "1" },
      { text: "Item 2", id: "2" },
      { text: "Item 3", id: "3" },
      { text: "Item 4", id: "4" }
    ]
  };
  ui.combobox(config);
}
function storyDatePicker(selectedStory) {
  let config = { parentTag: selectedStory.parentTag };
  ui.datePicker(config);
}
function storyDialog(selectedStory) {
  const buttonConfig1 = {
    text: "Open Dialog With Mambo Buttons",
    parentTag: selectedStory.parentTag,
    header: "Dialog Title",
    body: "<p style='padding:3em;'>Your Dialog content will go here</p>",
    footer: "<mambo-button></mambo-button>",
    onClick: () => {
      let dialogConfig = {
        title: "Dialog Title",
        closeButton: false,
        onComplete: (context) => {
          context.Dialog.getBodyTag().innerHTML = "<p style='padding:3em;'>Your Dialog content will go here</p>";
          context.Dialog.getFooterTag().innerHTML = `<div style='display:flex;gap:1em;'>
							<mambo-button id='btnCancel'></mambo-button>
							<mambo-button id='btnConfirm'></mambo-button>
						 </div>`;
          const buttonConfirm = document.getElementById("btnConfirm");
          const buttonCancel = document.getElementById("btnCancel");
          buttonCancel.setup({
            text: "Cancel",
            type: "primary",
            size: "small",
            icon: [
              {
                attr: {
                  class: "fa-solid fa-xmark"
                }
              }
            ],
            onClick: () => {
              context.Dialog.close();
            }
          });
          buttonConfirm.setup({
            text: "Confirm",
            type: "primary",
            size: "small",
            icon: [
              {
                attr: {
                  class: "fa-solid fa-check"
                }
              }
            ],
            onClick: () => {
              context.Dialog.close();
            }
          });
        }
      };
      ui.dialog(dialogConfig);
    }
  };
  ui.button(buttonConfig1);
  const buttonConfig2 = {
    text: "Open Dialog with Close Button",
    parentTag: selectedStory.parentTag,
    header: "Dialog Title",
    body: "<p style='padding:3em;'>Your Dialog content will go here</p>",
    footer: "<mambo-button></mambo-button>",
    onClick: () => {
      let dialogConfig = {
        title: "Dialog Title",
        onComplete: (context) => {
          context.Dialog.getBodyTag().innerHTML = "<p style='padding:3em; text-align: center;'>Your Dialog content will go here</p>";
          context.Dialog.getFooterTag().innerHTML = "Thank you for your attention";
        }
      };
      ui.dialog(dialogConfig);
    }
  };
  ui.button(buttonConfig2);
}
function storyDragDrop(selectedStory) {
  let props = {
    parentTag: selectedStory.parentTag,
    onDrop: (context) => {
      console.table(context?.dataTransfer?.files);
    }
  };
  ui.dragDrop(props);
}
function storyDraggable(selectedStory) {
  basic();
  fullScreen();
  axisX();
  axisY();
  grid();
  function basic() {
    const containerTag = dom.createTag("div", { class: "draggable-container" });
    containerTag.appendChild(dom.createTag("span", { class: "draggable-text", text: "Drag" }));
    selectedStory.parentTag.appendChild(containerTag);
    const config = {
      containerTag,
      parentTag: containerTag
    };
    ui.draggable(config);
  }
  function fullScreen() {
    const containerTag = dom.createTag("div", { class: "draggable-container" });
    containerTag.appendChild(dom.createTag("span", { class: "draggable-text", text: "Drag Without Container" }));
    selectedStory.parentTag.appendChild(containerTag);
    const config = {
      parentTag: containerTag
    };
    ui.draggable(config);
  }
  function axisX() {
    const containerTag = dom.createTag("div", { class: "draggable-container" });
    containerTag.appendChild(dom.createTag("span", { class: "draggable-text", text: "Drag x Axis" }));
    selectedStory.parentTag.appendChild(containerTag);
    const config = {
      containerTag,
      parentTag: containerTag,
      axis: "x"
    };
    ui.draggable(config);
  }
  function axisY() {
    const containerTag = dom.createTag("div", { class: "draggable-container" });
    containerTag.appendChild(dom.createTag("span", { class: "draggable-text", text: "Drag y Axis" }));
    selectedStory.parentTag.appendChild(containerTag);
    const config = {
      containerTag,
      parentTag: containerTag,
      axis: "y"
    };
    ui.draggable(config);
  }
  function grid() {
    const containerTag = dom.createTag("div", { class: "draggable-container" });
    containerTag.appendChild(dom.createTag("span", { class: "draggable-text", text: "Drag grid [30, 30]" }));
    selectedStory.parentTag.appendChild(containerTag);
    const config = {
      containerTag,
      parentTag: containerTag,
      grid: [30, 30]
    };
    ui.draggable(config);
  }
}
function storyDropdown(selectedStory) {
  let config = {
    parentTag: selectedStory.parentTag,
    button: {
      text: "Open"
    },
    onComplete: (context) => {
      const contentTag = context.Dropdown.getContentTag();
      dom.append(contentTag, "<p style='padding:1em;'>Here goes your content</p>");
    }
  };
  ui.dropdown(config);
}
function storyFileChooser(selectedStory) {
  singleFile();
  multipleFiles();
  function singleFile() {
    const config = {
      parentTag: selectedStory.parentTag,
      buttonOnly: true,
      button: {
        text: "Choose a single .txt file"
      },
      input: {
        tags: {
          input: { attr: { accept: ".txt" } }
        }
      },
      onUpload: handleFileSelection
    };
    ui.fileChooser(config);
  }
  function multipleFiles() {
    const config = {
      parentTag: selectedStory.parentTag,
      input: {
        tags: {
          input: { attr: { multiple: true } }
        }
      },
      onUpload: handleFileSelection
    };
    ui.fileChooser(config);
  }
  function handleFileSelection(context) {
    console.log(context.files);
  }
}
function storyGrid(selectedStory) {
  const firstGridParentTag = dom.createTag(`${selectedStory.id}-first`, { class: "first-grid" });
  selectedStory.parentTag.appendChild(firstGridParentTag);
  const secondGridParentTag = dom.createTag(`${selectedStory.id}-second`, { class: "second-grid" });
  selectedStory.parentTag.appendChild(secondGridParentTag);
  const data = [
    {
      input: "Red",
      text: "Green",
      hidden: "hidden"
    },
    {
      input: "Purple",
      text: "Brown",
      hidden: "hidden"
    }
  ];
  const columnsConfig = [
    {
      id: "button",
      name: "Button",
      tagType: "button",
      type: "primary",
      size: "small",
      attr: {
        type: "button"
      },
      text: "Open",
      icon: [
        {
          attr: {
            class: "fa-regular fa-file"
          },
          size: "large"
        }
      ],
      onClick: handleButtonClick
    },
    {
      id: "",
      name: "Button Group",
      tagType: "button-group",
      buttons: [
        {
          id: 1,
          text: "1",
          type: "secondary",
          size: "small"
        },
        {
          id: 2,
          text: "2",
          type: "secondary",
          size: "medium"
        },
        {
          id: 3,
          text: "3",
          type: "secondary",
          size: "large"
        }
      ],
      onClick: handleButtonClick
    },
    {
      id: "input",
      name: "Input",
      tagType: "input",
      dataKey: "input",
      enableClear: true,
      attr: {},
      enableLeftButton: true,
      onMouseDown: (context) => {
        context.Input.setAttr({ type: "text" });
        context.Button.getTag().classList.toggle("fa-eye", true);
        context.Button.getTag().classList.toggle("fa-eye-slash", false);
      },
      onMouseUp: (context) => {
        context.Input.setAttr({ type: "password" });
        context.Button.getTag().classList.toggle("fa-eye-slash", true);
        context.Button.getTag().classList.toggle("fa-eye", false);
      },
      onComplete: (context) => {
        context.Input.setAttr({ type: "password" });
      }
    },
    {
      id: "text",
      name: "Text",
      tagType: "text",
      dataKey: "text"
    },
    {
      id: "hidden",
      name: "Hidden",
      tagType: "text",
      dataKey: "hidden",
      hide: true
    },
    {
      id: "fileChooser",
      name: "File Chooser",
      tagType: "file-chooser",
      onUpload: (context) => {
      }
    },
    {
      id: "dialog",
      name: "Dialog",
      tagType: "dialog",
      title: "Dialog",
      text: "Open Dialog",
      icon: [
        {
          attr: {
            class: "fa-regular fa-file"
          },
          size: "large"
        }
      ],
      onOpen: (context) => {
        context.Dialog.getBodyTag().innerHTML = "<p style='padding:3em; text-align: center;'>Your Dialog content will go here</p>";
        context.Dialog.getFooterTag().innerHTML = "Thank you for your attention";
      },
      onClose: (context) => {
      }
    },
    {
      id: "slideout",
      name: "Slideout",
      tagType: "slideout",
      text: null,
      type: "secondary",
      icon: [
        {
          attr: {
            class: "fa-solid fa-bars"
          },
          size: "large"
        }
      ],
      onInstallContent: (context) => {
        const contentTag = context.Slideout.getContentTag();
        const headerTag = context.Slideout.getHeaderTag();
        dom.append(headerTag, "<h3>My Header Content</h3>");
        const bodyTag = context.Slideout.getBodyTag();
        dom.append(bodyTag, "<p style='padding:1em;'>Here goes your content</p>");
      }
    },
    {
      id: "dragDrop",
      tagType: "drag-drop",
      name: "Drag & Drop",
      dropText: "Drop Files",
      onDrop: (context) => {
      }
    }
  ];
  let config = {
    parentTag: firstGridParentTag,
    data,
    columns: columnsConfig,
    maxColWidth: true,
    onPostRow: handleGridPostRow,
    onComplete: (context) => {
    }
  };
  ui.grid(config);
  function handleGridPostRow(context) {
  }
  function handleButtonClick(context) {
    alert("Button Clicked");
  }
  const data2 = [{}];
  const columnsConfig2 = [
    {
      id: "treeView",
      name: "Tree View",
      tagType: "tree-view",
      style: {
        "min-width": "150px",
        width: "150px",
        "max-width": "150px"
      },
      data: [
        {
          text: "Item 1",
          items: [
            {
              text: "Item 1-1"
            },
            {
              text: "Item 1-2"
            },
            {
              text: "Item 1-3",
              items: [
                {
                  text: "Item 1-3-1"
                },
                {
                  text: "Item 1-3-2"
                }
              ]
            }
          ]
        },
        {
          text: "Item 2",
          items: [
            {
              text: "Item 2-1"
            },
            {
              text: "Item 2-2"
            }
          ]
        }
      ],
      onSelect: (context) => {
      }
    },
    {
      id: "dropdown",
      name: "Dropdown",
      tagType: "dropdown",
      style: {
        "min-width": "160px",
        width: "160px",
        "max-width": "160px"
      },
      onComplete: (context) => {
        const contentTag = context.Dropdown.getContentTag();
        dom.append(contentTag, "<p style='padding:1em;'>Here goes your content</p>");
      }
    },
    {
      id: "combobox",
      name: "Combobox",
      tagType: "combobox",
      style: {
        "min-width": "130px"
      },
      value: "mambo-combobox",
      data: [
        {
          text: "Item 1",
          id: "1"
        },
        {
          text: "Item 2",
          id: "2"
        },
        {
          text: "Item 3",
          id: "3"
        },
        {
          text: "Item 4",
          id: "4"
        }
      ],
      onSelect: (context) => {
      }
    },
    {
      id: "timePicker",
      name: "Time Picker",
      tagType: "time-picker",
      style: {
        "min-width": "160px",
        width: "160px",
        "max-width": "160px"
      },
      onSelect: (context) => {
      }
    },
    {
      id: "datePicker",
      name: "Date Picker",
      tagType: "date-picker",
      style: {
        "min-width": "160px",
        width: "160px",
        "max-width": "160px"
      },
      onSelect: (context) => {
      }
    }
  ];
  let config2 = {
    parentTag: secondGridParentTag,
    data: data2,
    columns: columnsConfig2,
    maxColWidth: true,
    onComplete: (context) => {
    }
  };
  ui.grid(config2);
}
function storyInput(selectedStory) {
  inputWithClearButton();
  inputWithIcon();
  inputWithLeftButton();
  function inputWithClearButton() {
    const config = {
      parentTag: selectedStory.parentTag,
      value: "My value",
      enableClear: true,
      icon: [
        {
          attr: {
            class: "fa-regular fa-envelope"
          },
          size: "small",
          position: "left"
        }
      ]
    };
    ui.input(config);
  }
  function inputWithLeftButton() {
    const config = {
      parentTag: selectedStory.parentTag,
      value: "My value",
      enableClear: false,
      enableLeftButton: true,
      onMouseDown: (context) => {
        context.Input.setAttr({ type: "text" });
        context.Button.getTag().classList.toggle("fa-eye", true);
        context.Button.getTag().classList.toggle("fa-eye-slash", false);
      },
      onMouseUp: (context) => {
        context.Input.setAttr({ type: "password" });
        context.Button.getTag().classList.toggle("fa-eye-slash", true);
        context.Button.getTag().classList.toggle("fa-eye", false);
      },
      onComplete: (context) => {
        context.Input.setAttr({ type: "password" });
      }
    };
    ui.input(config);
  }
  function inputWithIcon() {
    const config = {
      parentTag: selectedStory.parentTag,
      icon: [
        {
          attr: {
            class: "fa-regular fa-envelope"
          },
          size: "small",
          position: "left"
        }
      ],
      tags: {
        input: {
          prop: {
            placeholder: "Ingresa tu email"
          }
        }
      },
      required: true,
      onBlur: ({ Input }) => {
        Input.showRequired();
      }
    };
    ui.input(config);
  }
}
function storyListbox(selectedStory) {
  simpleListbox();
  function simpleListbox() {
    const data = [{ displayName: "Av. Mosconi 2345" }, { displayName: "Test 2" }];
    const config = {
      data,
      onSelect: (e) => console.log(e),
      parentTag: selectedStory.parentTag,
      prop: { id: "simplelistbox" }
    };
    ui.listbox(config);
  }
}
function storyMapBox(selectedStory) {
  const token = "pk.eyJ1Ijoic2NvdHRpYWxlamFuZHJvIiwiYSI6ImNsNWJxNGo1YzAxOXUzZHE5b2k1OWxhZ3AifQ.O39Uy9OX7tjnNGJxAnEoiw";
  sendPointsToMap();
  function userPositionMark() {
    const config = {
      accessToken: token,
      parentTag: selectedStory.parentTag,
      tags: {
        container: {
          attr: {
            id: "simplemap"
          }
        }
      }
    };
    ui.mapbox(config);
  }
  function sendPointsToMap() {
    const config = {
      accessToken: token,
      controls: {
        fullscreen: true,
        navigation: true,
        search: true
      },
      marker: { color: "#E50087" },
      parentTag: selectedStory.parentTag,
      tags: {
        container: {
          attr: {
            id: "searcheventsmap"
          }
        }
      },
      onComplete: (component) => addPoints(component)
    };
    ui.mapbox(config);
    function addPoints(component) {
      const pointsArr = [
        {
          lng: -58.485783,
          lat: -34.576503
        },
        {
          lng: -58.493848,
          lat: -34.602807
        },
        {
          lng: -58.498737,
          lat: -34.584316
        },
        {
          lng: -58.476967,
          lat: -34.569271
        }
      ];
      component.Mapbox.addPoints(pointsArr);
    }
  }
}
function storyPercentage(selectedStory) {
  lowPercentage();
  highPercentage();
  fullPercentage();
  function lowPercentage() {
    const config = {
      parentTag: selectedStory.parentTag,
      value: 0.3
    };
    ui.percentage(config);
  }
  function highPercentage() {
    const config = {
      parentTag: selectedStory.parentTag,
      value: 0.8
    };
    ui.percentage(config);
  }
  function fullPercentage() {
    const config = {
      parentTag: selectedStory.parentTag,
      value: 1
    };
    ui.percentage(config);
  }
}
function storyPlayer(selectedStory) {
  const ipfs = {};
  let m_videoPlayer;
  let m_playerTag;
  installButtonGroup();
  videoPlayer();
  function setupHls() {
    Hls.DefaultConfig.loader = HlsjsIpfsLoader;
    Hls.DefaultConfig.debug = false;
    const isSup = Hls.isSupported();
    if (isSup) {
      const hls = new Hls();
      hls.config.ipfs = ipfs;
      hls.config.ipfsHash = "QmdpAidwAsBGptFB3b6A9Pyi5coEbgjHrL3K2Qrsutmj9K";
      hls.loadSource("master.m3u8");
      hls.attachMedia(m_playerTag);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        m_playerTag.play();
      });
    }
  }
  function setupMediaSource() {
    const parser = new m3u8Parser.Parser();
    const ms = new MediaSource();
    m_playerTag.src = window.URL.createObjectURL(ms);
    ms.addEventListener("sourceopen", msReady);
    async function msReady(event) {
      for await (const chunk of ipfs.get("QmdccEyrTxfvMiKAkQYBs9h8XDyZ6Hw8JJjRGGpVmyyZjF")) {
        parser.push(chunk);
        parser.end();
      }
      const sourceBuffer = ms.addSourceBuffer("video/MP2T; avc1.42c00d,mp4a.40.2");
      const videoSegments = parser.manifest.segments;
      for (let i = 0; i < videoSegments.length; i++) {
        const segmentPath = `bafybeihf5pvm3gckha5zkcmiovc6hwhzvws3ffdfpswr2e2qtd2h57j3li/${videoSegments[i].name}`;
        for await (const chunk of ipfs.get(segmentPath)) {
          sourceBuffer.appendBuffer(chunk);
        }
      }
    }
  }
  function videoPlayer() {
    const html = `
        <div style="display: flex;padding: 1em;box-sizing: border-box">
            <div id="storyboard-video" style="width: 50%;padding: 1em;"><h3>Video Player</h3></div>
            <div id="storyboard-audio" style="width: 50%;padding: 1em;"><h3>Audio Player</h3></div>
        </div>`;
    selectedStory.parentTag.appendChild(html);
    const config = {
      parentTag: "#storyboard-video",
      player: {
        attr: {
          src: "public/app/demo/media/video1.mp4",
          type: "video/mp4"
        }
      }
    };
    m_videoPlayer = ui.videoPlayer(config);
    m_playerTag = m_videoPlayer.getPlayer().getTag();
  }
  function installButtonGroup() {
    let btnGroupProps = {
      parentTag: selectedStory.parentTag,
      buttons: [
        {
          id: 1,
          text: "Local MP4 Video"
        },
        {
          id: 2,
          text: "IPFS HLS"
        },
        {
          id: 3,
          text: "IPFS HLS MediaSource"
        },
        {
          id: 4,
          text: "IPFS MP4 Video"
        }
      ],
      onClick: (context) => {
        const buttonId = context.Button.getId();
        switch (buttonId) {
          case 1:
            m_playerTag.src = "public/app/demo/media/video1.mp4";
            m_playerTag.type = "video/mp4";
            break;
          case 2:
            setupHls();
            break;
          case 3:
            setupMediaSource();
            break;
          case 4:
            m_playerTag.src = "https://ipfs.io/ipfs/QmX8ULWunstJdPG2QfxpcG9B8oTxBUMiZoZ6GjyT2mq7An?filename=video3.mp4";
            m_playerTag.type = "video/mp4";
            break;
        }
      }
    };
    ui.buttonGroup(btnGroupProps);
  }
}
function storyRadio(selectedStory) {
  const config1 = {
    parentTag: selectedStory.parentTag,
    text: "Radio",
    position: "right"
  };
  ui.radio(config1);
  const config2 = {
    parentTag: selectedStory.parentTag,
    text: "Radio",
    position: "left"
  };
  ui.radio(config2);
}
function storyRadioGroup(selectedStory) {
  const config = {
    parentTag: selectedStory.parentTag,
    radio: { position: "left" },
    radios: [
      {
        text: "Radio One",
        checked: true,
        onClick: (context) => {
        }
      },
      {
        text: "Radio Two",
        checked: true,
        onClick: (context) => {
        }
      },
      {
        text: "Radio Three",
        checked: false,
        onClick: (context) => {
        }
      }
    ],
    onClick: (context) => {
    },
    onGroupClick: (context) => {
    }
  };
  ui.radioGroup(config);
}
function storyRating(selectedStory) {
  defaultRating();
  tenStars();
  disabled();
  function defaultRating() {
    const config = {
      parentTag: selectedStory.parentTag,
      onSelect: (context) => {
      }
    };
    ui.rating(config);
  }
  function tenStars() {
    const config = {
      parentTag: selectedStory.parentTag,
      css: {
        parent: "rating-parent rating-parent-ten"
      },
      value: 5,
      max: 10,
      onSelect: (context) => {
      }
    };
    ui.rating(config);
  }
  function disabled() {
    const config = {
      parentTag: selectedStory.parentTag,
      value: 3,
      enable: false
    };
    ui.rating(config);
  }
}
function storySearch(selectedStory) {
  const config = {
    button: { text: "", onClick: (value) => toMap(apiSearch(value)) },
    input: {
      onKeyup: (value) => handleKeyUp(value),
      enableClear: true
    },
    firedIn: 3,
    parentTag: selectedStory.parentTag,
    suggest: {
      displayKey: "displayName",
      onSelect: (e) => toMap(e)
    }
  };
  const search = ui.search(config);
  function handleKeyUp(value) {
    search.suggest(apiSearch(value));
  }
  function apiSearch(value) {
    const testData = [
      { displayName: "Text One", id: 1 },
      { displayName: "Text Two", id: 2 },
      { displayName: "Text Three", id: 3 },
      { displayName: "Text Four", id: 4 },
      { displayName: "Text Five", id: 5 }
    ];
    const expr = new RegExp(value, "gi");
    return testData.filter((data) => data.displayName.match(expr));
  }
  function toMap(ev) {
    console.log(ev);
  }
}
function storySlideout(selectedStory) {
  let m_slideout;
  installSlideout();
  installOpenButton();
  function installOpenButton() {
    const buttonConfig = {
      parentTag: selectedStory.parentTag,
      text: "Open Slideout",
      onClick: () => {
        m_slideout.open();
      }
    };
    ui.button(buttonConfig);
  }
  function installSlideout() {
    const slideoutConfig = {
      parentTag: "body",
      onComplete: installSlideoutContent
    };
    m_slideout = ui.slideout(slideoutConfig);
  }
  function installSlideoutContent(context) {
    const headerTag = context.Slideout.getHeaderTag();
    dom.append(headerTag, "<h3>My Header Content</h3>");
    const bodyTag = context.Slideout.getBodyTag();
    dom.append(bodyTag, "<p style='padding:1em;'>Here goes your content</p>");
  }
}
function storySlider(selectedStory) {
  const horizontalParentTag = dom.createTag("slider-horizontal");
  const verticalParentTag = dom.createTag("slider-vertical");
  selectedStory.parentTag.appendChild(horizontalParentTag);
  selectedStory.parentTag.appendChild(verticalParentTag);
  defaultSlider();
  verticalSlider();
  function defaultSlider() {
    const config = {
      parentTag: horizontalParentTag,
      onSelect: (context) => {
      }
    };
    ui.slider(config);
  }
  function verticalSlider() {
    const config = {
      parentTag: verticalParentTag,
      orientation: "vertical",
      onSelect: (context) => {
      }
    };
    ui.slider(config);
  }
}
function storySwitch(selectedStory) {
  defaultSwitchLeft();
  defaultSwitchRight();
  checkedSwitch();
  customTextSwitch();
  disabledSwitch();
  disabledSwitchNoLabels();
  function defaultSwitchLeft() {
    const config = {
      parentTag: selectedStory.parentTag,
      text: "Option",
      position: "left",
      messages: {
        checked: "",
        unchecked: ""
      },
      onChange: (context) => {
      }
    };
    ui.switch(config);
  }
  function defaultSwitchRight() {
    const config = {
      parentTag: selectedStory.parentTag,
      text: "Option",
      position: "right",
      messages: {
        checked: "",
        unchecked: ""
      },
      onChange: (context) => {
      }
    };
    ui.switch(config);
  }
  function checkedSwitch() {
    const config = {
      parentTag: selectedStory.parentTag,
      checked: true,
      onChange: (context) => {
      }
    };
    ui.switch(config);
  }
  function customTextSwitch() {
    const config = {
      parentTag: selectedStory.parentTag,
      checked: true,
      messages: {
        checked: "YES",
        unchecked: "NO"
      },
      onChange: (context) => {
      }
    };
    ui.switch(config);
  }
  function disabledSwitch() {
    const config = {
      parentTag: selectedStory.parentTag,
      enable: false,
      onChange: (context) => {
      }
    };
    ui.switch(config);
  }
  function disabledSwitchNoLabels() {
    const config = {
      parentTag: selectedStory.parentTag,
      enable: false,
      messages: {
        checked: "",
        unchecked: ""
      },
      onChange: (context) => {
      }
    };
    ui.switch(config);
  }
}
function storyTab(selectedStory) {
  installWithFnCallback();
  installWithContentProp();
  function installWithFnCallback() {
    const btnAttr = { style: "display: flex; flex-direction: column-reverse; width: 4rem; font-size: 0.75rem;" };
    let tabConfig = {
      parentTag: selectedStory.parentTag,
      tabs: {
        buttons: [
          {
            text: "Mail",
            size: "small",
            tags: {
              button: {
                attr: btnAttr
              }
            },
            icon: {
              attr: {
                class: "fa-solid fa-envelope"
              }
            },
            onClick: (context) => {
            }
          },
          {
            text: "Star",
            size: "small",
            tags: {
              button: {
                attr: btnAttr
              }
            },
            icon: {
              attr: {
                class: "fa-solid fa-star"
              }
            }
          },
          {
            text: "Compass",
            size: "small",
            tags: {
              button: {
                attr: btnAttr
              }
            },
            icon: {
              attr: {
                class: "fa-solid fa-compass"
              }
            }
          }
        ],
        onClick: (context) => {
        }
      },
      onTabComplete: (contentTag, tab) => {
        contentTag.appendChild(dom.createTag("div", { text: `Tab name: ${tab.text}` }));
      }
    };
    ui.tab(tabConfig);
  }
  function installWithContentProp() {
    const btnGroupConfig = {
      buttons: [
        {
          id: 4,
          text: "Tab 4",
          onClick: (context) => {
          }
        },
        {
          id: 5,
          text: "Tab 5"
        },
        {
          id: 6,
          text: "Tab 6"
        }
      ],
      onClick: (buttonContext) => {
      }
    };
    const contentList = btnGroupConfig.buttons.map((btn) => {
      return dom.createTag("div", {
        text: `This is content for Tab id: ${btn.id} name: ${btn.text}`
      });
    });
    let tabConfig = {
      parentTag: selectedStory.parentTag,
      tabs: btnGroupConfig,
      contents: contentList
    };
    ui.tab(tabConfig);
  }
}
function storyTextarea(selectedStory) {
  const textareaConfig = {
    parentTag: selectedStory.parentTag,
    editable: true,
    attr: {
      textarea: { placeholder: "editable@email.com" }
    },
    required: true,
    onBlur: ({ Textarea }) => {
      Textarea.showRequired();
    }
  };
  ui.textarea(textareaConfig);
}
function storyTimePicker(selectedStory) {
  const config = {
    parentTag: selectedStory.parentTag
  };
  ui.timePicker(config);
}
function storyToaster(selectedStory) {
  const activeToasters = {};
  const configButton = {
    text: "Toaster with Mambo Button",
    parentTag: selectedStory.parentTag,
    onClick: () => {
      if (activeToasters["toaster-with-mambo-button"]) {
        activeToasters["toaster-with-mambo-button"].close();
        delete activeToasters["toaster-with-mambo-button"];
        return;
      }
      let toasterConfig = {
        parentTag: selectedStory.parentTag,
        closeButton: false,
        open: true,
        message: "Mambo Toaster Successfully Completed",
        autoHideDuration: 5e3,
        size: "large",
        type: "success",
        onClose: (context) => {
          context.Toaster.close();
          delete activeToasters["toaster-with-mambo-button"];
        },
        onComplete: (context) => {
          context.Toaster.getBodyTag().innerHTML = `
									<div style="display: flex; align-items: start; flex-direction: column;">
										<span style="font-size: var(--m-font-size-m);"> Titulo: </span>
										<span>Mambo Toaster + Mambo Button</span>
									</div>
									<mambo-button style="padding-left: 1rem;" id='btn-undo-mambo-button'></mambo-button>`;
          const buttonUndo = document.getElementById("btn-undo-mambo-button");
          const timeOut = setTimeout(() => {
            context.Toaster.close();
            delete activeToasters["toaster-with-mambo-button"];
          }, context.Toaster.autoHideDuration());
          buttonUndo.setup({
            text: "Cancel",
            type: "secondary",
            size: "small",
            onClick: () => {
              clearTimeout(timeOut);
              context.Toaster.close();
              delete activeToasters["toaster-with-mambo-button"];
            }
          });
        }
      };
      activeToasters["toaster-with-mambo-button"] = ui.toaster(toasterConfig);
    }
  };
  ui.button(configButton);
  const variants = [
    { h: "left", v: "top", type: "info", size: "small" },
    { h: "center", v: "top", type: "success", size: "medium" },
    { h: "right", v: "top", type: "error", size: "large" },
    { h: "left", v: "center", type: "warning", size: "small" },
    { h: "center", v: "center", type: "info", size: "medium" },
    { h: "right", v: "center", type: "success", size: "large" },
    { h: "left", v: "bottom", type: "error", size: "small" },
    { h: "center", v: "bottom", type: "warning", size: "medium" },
    { h: "right", v: "bottom", type: "success", size: "large" }
  ];
  variants.forEach((variant) => {
    const config = {
      text: `Toaster ${variant.h}-${variant.v}`,
      parentTag: selectedStory.parentTag,
      onClick: () => {
        if (activeToasters[`${variant.h}-${variant.v}`]) {
          activeToasters[`${variant.h}-${variant.v}`].close();
          delete activeToasters[`${variant.h}-${variant.v}`];
          return;
        }
        let toasterConfig = {
          closeButton: true,
          anchorOrigin: { horizontal: variant.h, vertical: variant.v },
          open: true,
          message: variant.size === "small" ? `<div style="display: flex; flex-direction: column;">
							   <span style="font-size: 0.85rem; font-weight: 400;">Toaster: ${variant.h}-${variant.v}</span>
							    </div>` : `<div style="display: flex; flex-direction: column;">
								 <span style="font-size: 1rem; font-weight: 600;">Title:</span>
								 <span style="font-size: 0.85rem; font-weight: 400;">toaster: ${variant.h}-${variant.v}</span>
							    </div>`,
          autoHideDuration: 5e3,
          type: variant.type,
          size: variant.size,
          onClose: (context) => {
            context.Toaster.close();
            delete activeToasters[`${variant.h}-${variant.v}`];
          },
          onComplete: (context) => {
            const timeOut = setTimeout(() => {
              context.Toaster.close();
              delete activeToasters[`${variant.h}-${variant.v}`];
            }, context.Toaster.autoHideDuration());
          }
        };
        activeToasters[`${variant.h}-${variant.v}`] = ui.toaster(toasterConfig);
      }
    };
    ui.button(config);
  });
}
function storyTreeView(selectedStory) {
  const props = {
    parentTag: selectedStory.parentTag,
    data: [
      {
        text: "Item 1",
        expanded: true,
        items: [
          { text: "Item 1-1" },
          { text: "Item 1-2" },
          {
            text: "Item 1-3",
            items: [{ text: "Item 1-3-1" }, { text: "Item 1-3-2" }, { text: "Item 1-3-3" }]
          }
        ]
      },
      {
        text: "Item 2",
        items: [{ text: "Item 2-1" }, { text: "Item 2-2" }, { text: "Item 2-3" }, { text: "Item 2-4" }]
      }
    ],
    onSelect: (context) => {
    }
  };
  ui.treeView(props);
}
function storyVideoPlayer(selectedStory) {
}
