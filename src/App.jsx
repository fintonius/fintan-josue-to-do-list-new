import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";
import { nanoid } from "nanoid";

// the properties for each key in this object are functions which will be used
// to filter the 'tasks' (being passed from main.jsx through 'props') data array
const FILTER_MAP = {
  All : () => true,
  Active: (task) => !task.completed,
  Completed: (task) => task.completed,
};

// will return an array of the 'key' names from FILTER_MAP
const FILTER_NAMES = Object.keys(FILTER_MAP);

export default function App(props) {  
// this will preserve the initial value of props in the 'tasks' variable using the 
// useState() 'hook' to return an array - 'tasks' - which 
const [tasks, setTasks] = useState(props.tasks);
const [filter, setFilter] = useState('All');

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
// and filters by the 'filter' variable
  const taskList = tasks
  .filter(FILTER_MAP[filter])
  .map((task) => (
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

  const filterList = FILTER_NAMES.map((name) => (
    <FilterButton 
      key={name} 
      name={name} 
      isPressed={name === filter} 
      setFilter={setFilter} 
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
        {filterList}
      </div>
      <h2 id="list-heading"> {taskList.length} tasks remaining</h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading">
          {taskList}
      </ul>
    </div>
  );
}