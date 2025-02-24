let container = document.querySelector(".container");
let add = document.querySelector(".add_btn");
let modal = document.querySelector(".modal-container");
let text_area = document.querySelector(".text-area");
let set_priority = document.querySelector(".set-priority");
let toolbox_priority_cont = document.querySelector(".toolbox_priority_cont");
let dashboard = document.querySelector(".dashboard");
let remove = document.querySelector(".remove_btn");
let cache_data = localStorage.getItem("tickets");
// console.log('cache_data',JSON.parse(cache_data));
let input_priority;
let color_arr = ["pink", "blue", "green", "purple"];
let color_obj = {
  pink: "pink",
  blue: "lightblue",
  green: "lightgreen",
  purple: "lightcoral",
};
console.log(dashboard.children, "asas");
//open modal
add.addEventListener("click", (e) => {
  console.log(e.target, e.currentTarget);
  modal.style.display = "flex";
});

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
    console.log(input_priority);
    // return input_priority
  }
});

// ticket creeation
modal.addEventListener("keypress", (e) => {
  // console.log(e.key);
  if (e.key == "Enter") {
    createTicket(input_priority, text_area.value);
  }
});

function createTicket(priority, content) {
  let original_node = document.querySelector(".cards");
  let dummy_node = original_node.cloneNode(true);

  dummy_node.children[0].style.backgroundColor = color_obj[priority];
  dummy_node.children[1].innerText = new ShortUniqueId().rnd();
  dummy_node.children[2].innerText = content;

  let parent = original_node.parentNode;

  // check if input and color are !undfiend
  if (content != "" && priority) {
    parent.appendChild(dummy_node);
  }
  // let ticket_content = dummy_node.children[2].innerText;
  let ticketArea = dummy_node.querySelector(".content");
  let lockBtn = dummy_node.querySelector(".lock_unlock");
  let select_priotiy = dummy_node.querySelector(".priority");
  addLockUnlock(ticketArea, lockBtn);

  changeCardColor(select_priotiy, priority);

  // console.log(lockBtn, ticketArea);

  modal.style.display = "none";
  text_area.value = ""; //reset text
  dummy_node.style.display = "flex";

  // const dataToStore = {
  //   id: 'uid',
  //   color: 'priorityColor',
  //   content: 'content',
  // };
}

let islocked = true;
function addLockUnlock(ticketArea, lockBtn) {
  // console.log(lockBtn.children[0].classList);
  let icon = lockBtn.children[0];
  icon.addEventListener("click", () => {
    // if (icon.classList[1] == "fa-lock") {
    if (islocked == true) {
      islocked = false;
      console.log("yes");
      icon.classList.remove("fa-lock");
      icon.classList.add("fa-unlock");
      ticketArea.setAttribute("contenteditable", true);
    } else {
      islocked = true;
      icon.classList.add("fa-lock");
      icon.classList.remove("fa-unlock");
      ticketArea.setAttribute("contenteditable", false);
    }
  });
}

function changeCardColor(select_priotiy) {
  select_priotiy.addEventListener("click", () => {
    console.log("clicked");

    function findKeyByValue(object, value) {
      return Object.keys(object).find((key) => object[key] === value);
    }

    let color = findKeyByValue(color_obj, select_priotiy.style.backgroundColor);
    let current_index = color_arr.indexOf(color);
    current_index++;
    current_index = current_index % 4;
    select_priotiy.style.backgroundColor = color_obj[color_arr[current_index]];
  });
}

//sort according color
let select_color;
toolbox_priority_cont.addEventListener("click", (e) => {
  select_color = e.target.getAttribute("class").split(" ")[1];
  // console.log(select_color[1]);
  // console.log(color_obj[select_color[1]]);

  if (e.target.getAttribute("class") != e.currentTarget.getAttribute("class")) {
    for (let i = 1; i < dashboard.children.length; i++) {
      if (
        dashboard.children[i].children[0].style.backgroundColor !=
        color_obj[select_color]
      ) {
        dashboard.children[i].style.display = "none";
      } else {
        dashboard.children[i].style.display = "block";
      }
    }
  }
});

//show all tickets
toolbox_priority_cont.addEventListener("dblclick", (e) => {
  // let select_color = e.target.getAttribute("class").split(" ")[1];
  for (let i = 1; i < dashboard.children.length; i++) {
    dashboard.children[i].style.display = "block";
  }
});

//remove ticket
remove.addEventListener("click", (e) => {
  remove.style.color = remove.style.color == "red" ? "black" : "red";
  console.log("inside remove", select_color);

  if (select_color && remove.style.color == "red") {
    remove.style.color == "black";
    for (let i = 0; i < dashboard.children.length; i++) {
      if (dashboard.children[i].style.display == "block") {
        console.log(dashboard.children[i]);
        dashboard.children[i].remove();
      }
    }
  }
});

console.log(dashboard.children[1]);
window.addEventListener("beforeunload", function (event) {
  console.log("Asss");

  let result_Arr = [];
  this.localStorage.clear
  this.localStorage.removeItem("tickets");

  for (let i = 0; i < dashboard.children.length; i++) {
    console.log(dashboard.children[i]);
    let dataToStore = {};
    dataToStore.id = dashboard.children[i].children[1].innerText;
    dataToStore.color = dashboard.children[i].children[0].style.backgroundColor;
    dataToStore.content = dashboard.children[i].children[2].innerText;
    result_Arr.push(dataToStore);
  }
  console.log("let reust", result_Arr[0]);

  // Convert the data to a JSON string and store it in localStorage
  localStorage.setItem("tickets", JSON.stringify(result_Arr));

  // Optionally, you can return a message to display a warning dialog
  // event.preventDefault(); // This is required for some browsers
  // event.returnValue = ""; // This triggers the browser's warning dialog
});

//populate cache data
window.onload = function () {
  // Your code here
  if (cache_data.length != 0) {
    cache_data = JSON.parse(cache_data);
    console.log(cache_data);
    let original_node = document.querySelector(".cards");
    for (let i = 1; i < cache_data.length; i++) {
      let dummy_node = original_node.cloneNode(true);

      dummy_node.style.display = "flex";
      dummy_node.children[0].style.backgroundColor = cache_data[i].color;
      dummy_node.children[1].innerText = cache_data[i].id;
      dummy_node.children[2].innerText = cache_data[i].content;

      // console.log(dummy_node);
      let parent = original_node.parentNode;
      parent.appendChild(dummy_node);

      let ticketArea = dummy_node.querySelector(".content");
      let lockBtn = dummy_node.querySelector(".lock_unlock");
      let select_priotiy = dummy_node.querySelector(".priority");
      addLockUnlock(ticketArea, lockBtn);
    
      changeCardColor(select_priotiy, cache_data[i].color);
    }
  }
};
