let container = document.querySelector(".container");
let add = document.querySelector(".add_btn");
let modal = document.querySelector(".modal-container");
let text_area = document.querySelector(".text-area");
let set_priority = document.querySelector(".set-priority");
// let input_value;
let input_priority;

let color_obj = {
  pink: "pink",
  blue: "lightblue",
  green: "lightgreen",
  purple: "lightcoral",
};

// container.addEventListener('click',(e)=>{
//     if(e.target.getAttribute('class') != 'add_btn'){
//         console.log('asss',e.target.getAttribute('class'));
//   modal.style.display = 'none'
//     }
// })

//open modal
add.addEventListener("click", (e) => {
  console.log(e.target, e.currentTarget);
  modal.style.display = "flex";

  //   modal.style.display = modal.style.display == "none" ? "flex" : "none";
});

//catch content
// text_area.addEventListener("input", (e) => {
//   //   console.log(e.target.value);

//   // input_value = e.target.value;
// });

//catch set-priority
set_priority.addEventListener("click", (e) => {
  if (e.target != e.currentTarget) {
    console.log(e.target.parentNode.children);
    for (let i = 0; i < 4; i++) {
      let current_priority = e.target.parentNode.children[i];
      current_priority.setAttribute(
        "class",
        current_priority.getAttribute("class").split(" ")[0]
      );
    }
    let priority = e.target.getAttribute("class");
    e.target.setAttribute("class", `${priority} active`);
    // console.log(priority);
    input_priority = priority;
  }
});

//
modal.addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    let original_node = document.querySelector(".cards");
    let dummy_node = original_node.cloneNode(true);
    console.log(dummy_node.children);
    dummy_node.children[0].style.backgroundColor = color_obj[input_priority];
    dummy_node.children[1].innerText = new ShortUniqueId().rnd()
    dummy_node.children[2].innerText = text_area.value;

    let parent = original_node.parentNode;
    // check if input and color are !undfiend
    if (text_area.value && input_priority) {
      // console.log(input_priority);
      parent.appendChild(dummy_node);
    }
    modal.style.display = "none";

    text_area.value = ""; //reset text
    // input_value = "" // reset the input value
    dummy_node.style.display = "flex";
  }
});
