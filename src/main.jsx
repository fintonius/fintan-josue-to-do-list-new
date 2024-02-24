import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const DATA = [
  { id: "todo-0", name: "eat", completed: true },
  { id: "todo-1", name: "sleep", completed: false },
  { id: "todo-2", name: "repeat", completed: false },
];

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
{/* passing the DATA array as a prop to the App component so it can be
accessed by App.jsx to use the information stored in the array */}
    <App tasks={DATA}/>
  </React.StrictMode>,
)
