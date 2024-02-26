import { v4 as uuidV4 } from "uuid";

// console.log(uuidV4());

type Task = {
  id: string;
  title: string;
  completed: boolean;
  createdAt: Date;
};

const list = document.querySelector<HTMLUListElement>("#list");
const form = document.querySelector<HTMLFormElement>("#new-task-form");
const input = document.querySelector<HTMLInputElement>("#new-task-title");
const tasks: Task[] = loadTasks();
tasks.forEach(addListItem);

// on submit, if the input value is not null then create a newTask abiding by the Task type and add to list
form?.addEventListener("submit", (e) => {
  e.preventDefault();

  if (input?.value == "" || input?.value == null) return;

  const newTask: Task = {
    id: uuidV4(),
    title: input.value,
    completed: false,
    createdAt: new Date(),
  };

  //adds task to list
  tasks.push(newTask);

  //adds the task to the top of the page
  addListItem(newTask);

  //clear the input on submit
  input.value = "";
});

// creates list items to add to the task list by takin the task and appending to list
function addListItem(task: Task) {
  const item = document.createElement("li");
  const label = document.createElement("label");
  const checkbox = document.createElement("input");

  // everytime you click on checkbox, toggles completed to true or false
  checkbox.addEventListener("change", () => {
    task.completed = checkbox.checked;
    saveTasks();
  });
  checkbox.type = "checkbox";
  checkbox.checked = task.completed;

  label.append(checkbox, task.title);
  item.append(label);
  list?.append(item);
}

//save tasks to localStorage
function saveTasks() {
  localStorage.setItem("TASKS", JSON.stringify(tasks));
}

function loadTasks(): Task[] {
  const taskJSON = localStorage.getItem("TASKS");
  if (taskJSON == null) return [];
  return JSON.parse(taskJSON);
}
