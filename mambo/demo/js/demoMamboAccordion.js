function demoAccordion(parentEle){
  const dom = new DomJS();
  const m_parentTag = dom.getTag("accordion-button");
  for (i=1; i<=3;i++) {
      const butt = document.createElement('button');
      const panel = document.createElement('div');
      const p = document.createElement('p');
      butt.classList.add('accordion')
      butt.innerText = 'Section ' + i;
      panel.classList.add('panel');
      p.innerText = 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Possimus accusamus dolores numquam quibusdam natus. Blanditiis ut dignissimos ex, impedit minima nulla totam accusamus beatae saepe atque, temporibus officia corporis rerum!';
      m_parentTag.append(butt);
      butt.append(panel);
      panel.append(p);
  }
  
  let acc = document.getElementsByClassName("accordion");
  
  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
      this.classList.toggle("active");
      let panel = this.firstElementChild;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

}