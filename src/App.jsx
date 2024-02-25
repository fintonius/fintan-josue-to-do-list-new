import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

export default function App(props) {  
// this will preserve the initial value of props in the 'tasks' variable using the 
// useState() 'hook' to return an array - 'tasks' - which 
const [tasks, setTasks] = useState(props.tasks);

function toggleTaskCompleted(id) {
  const updatedTasks = tasks.map((task) => {
    // if this task has the same id as the edited task
    if (id === task.id) {
      // use object spread to make a new object whose 'completed' prop is inverted
      return {...task, completed: !task.completed};
    }
    return task;
  });
  setTasks(updatedTasks);
}
function deleteTask(id) {
  const remainingTasks = tasks.filter((task) => id !== task.id);
  setTasks(remainingTasks);
}

function editTask(id, newName) {
  const editTaskList = tasks.map((task) => {
    if (id === task.id) {
      // copy the task and update the name key with the newName argument
      return {...task, name: newName};
    }
    return task;
  });
  setTasks(editTaskList);
}

// this passes the relevant properties from 'tasks' into the Todo component as props
  const taskList = tasks?.map((task) => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id}
      toggleTaskCompleted={toggleTaskCompleted}
      deleteTask={deleteTask}
      editTask={editTask}
    />
  ));

  function addTask(name) {
    // nanoid is a JS library designed to create unique identifiers
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    // this uses the spread syntax to copy the information from the array
    // 'tasks' and add it to the object 'newTask' so th
    setTasks([...tasks, newTask])
  }

  return (
    <div className="todoapp stack-large">
      <h1>TodoMatic</h1>
      {/* sending addTask() as a prop 'addTask' to Form means addTask() can
      be called in the Form component and pass back data as the 'name' argument
      to be used in the App component. */}
      <Form addTask={addTask}/>

      <div className="filters btn-group stack-exception">
        <FilterButton />
        <FilterButton />
        <FilterButton />
      </div>
      <h2 id="list-heading">3 tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
          {taskList}
      </ul>
    </div>
  );
}