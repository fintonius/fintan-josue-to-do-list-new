import Todo from "./components/Todo";
import Form from "./components/Form";
import FilterButton from "./components/FilterButton";
import { useState } from "react";

export default function App(props) {
// this will preserve the initial value of props in the 'tasks' variable
const [tasks, setTasks] = useState(props.tasks);
// this passes the relevant properties from 'tasks' into the Todo component as props
  const taskList = tasks?.map((task) => (
    <Todo 
      id={task.id} 
      name={task.name} 
      completed={task.completed}
      key={task.id} 
    />
  ));

  function addTask(name) {
    alert(name);
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