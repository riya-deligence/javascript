showtask();
let title = document.getElementById("title");
let add_todo = document.getElementById("add_todo");
add_todo.addEventListener("click", function () {
  titleval = title.value;
  if (titleval.trim() != 0) {
    let webtask = localStorage.getItem("localtask");
    if (webtask == null) {
      taskObj = [];
    } else {
      taskObj = JSON.parse(webtask);
    }
    taskObj.push({ task_name: titleval, completeStatus: false });

    localStorage.setItem("localtask", JSON.stringify(taskObj));
    title.value = "";
  }
  showtask();
});

// showtask

function showtask() {
  let webtask = localStorage.getItem("localtask");
  if (webtask == null) {
    //document.getElementById("List").innerHTML = "<i>No task added yet</i>"
    taskObj = [];
  } else {
    taskObj = JSON.parse(webtask);
  }
  let html = "";
  let List = document.getElementById("List");
  taskObj.forEach((item, index) => {
    if (item.completeStatus
      ) {
      taskCompleteValue = `<td class="completed">${item.task_name}</td>`;
    } else {
      taskCompleteValue = `<td>${item.task_name}</td>`;
    }
    html += `<tr>
                    <th scope="row">${index + 1}</th>
                    ${taskCompleteValue}
                    <td><button type="button" onclick="edittask(${index})" class="btn btn-success ms-1"><i class="fa fa-edit"></i>Edit</button></td>
                    <td><button type="button" onclick="deleteitem(${index})" class="btn btn-danger"><i class="fa fa-trash"></i>Delete</button></td>
                </tr>`;
  });
  List.innerHTML = html;
}

// edittask
function edittask(index) {
  let saveindex = document.getElementById("saveindex");
  let add_todo = document.getElementById("add_todo");
  let save_todo = document.getElementById("save_todo");
  saveindex.value = index;
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);

  title.value = taskObj[index]["task_name"];
  add_todo.style.display = "none";
  save_todo.style.display = "block";
}

// savetask
let save_todo = document.getElementById("save_todo");
save_todo.addEventListener("click", function () {
  let add_todo = document.getElementById("add_todo");
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  let saveindex = document.getElementById("saveindex").value;

  for (keys in taskObj[saveindex]) {
    if (keys == "task_name") {
      taskObj[saveindex].task_name = title.value;
    }
  }
  save_todo.style.display = "none";
  add_todo.style.display = "block";
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  title.value = "";
  showtask();
});
// deleteitem
function deleteitem(index) {
  let webtask = localStorage.getItem("localtask");
  let taskObj = JSON.parse(webtask);
  taskObj.splice(index, 1);
  localStorage.setItem("localtask", JSON.stringify(taskObj));
  showtask();
}
