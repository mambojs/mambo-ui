//: Rating
//@
demoRating("demo-rating");

function demoRating(parentEle) {
  defaultRating();
  tenStars();
  disabled();

  function defaultRating() {
    const config = {
      parentTag: parentEle,
      fnSelect: (context) => {
        console.log(context.rating.value());
      },
    };

    ui.rating(config);
  }

  function tenStars() {
    const config = {
      parentTag: parentEle,
      css: {
        parent: "rating-parent rating-parent-ten",
      },
      value: 5,
      max: 10,
      fnSelect: (context) => {
        console.log(context.rating.value());
      },
    };

    ui.rating(config);
  }

  function disabled() {
    const config = {
      parentTag: parentEle,
      value: 3,
      enable: false,
    };

    ui.rating(config);
  }
}
//!
