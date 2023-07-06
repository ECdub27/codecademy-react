import React from "react";
import { nanoid } from "nanoid";

import { useState  } from "react";
import Taskmaster from "./Taskmaster";
import './App.css';
import Form from "./Form"
import FilterButton from "./FilterButton";
const FILTER_MAP = {
All: () => true,
Active: (task) => !task.completed,
Completed : (task) => task.completed
};
const FILTER_NAMES = Object.keys(FILTER_MAP);
function App(props) {
  const [tasks, setTasks] = useState(props.tasks);
  const [ filter, setFilter] = useState('All');
  // figure out how to mapp through the names to change the name of TaskMaster
   const toggleTaskList = (id) =>{
    const updatedTaskList =  tasks.map(task => {
      if( id === task.id) {
        return {...task, completed: !task.completed}
      }
      return task;
    });
    setTasks(updatedTaskList)
   }
   const deleteTask = (id) =>{
    const remainingTasks = tasks.filter((tasks) => id !== tasks.id);
    setTasks(remainingTasks);
   } 
   const editTask = (id, newName) =>{
    const editedTask = tasks.map((task) => {
      if(id === task.id){
        return {...task, name: newName}
      } 
      return task;
    });
    setTasks(editedTask)
   } 
   const tasksList = tasks.filter(FILTER_MAP[filter]).map((task) => (
    <Taskmaster id={task.id}
    name={task.name}
    completed={task.completed}
    key={task.id}
    toggle = {toggleTaskList}
    deleteTask={deleteTask}
    editTask ={editTask}
    />

   ));
   const filterList = FILTER_NAMES.map((name) => (
    <FilterButton key={name} name={name}
    isPressed={filter === name}
    setFilter={setFilter}/>
   ));
   const addTask = (name) =>{
    const newTask = {id: `todo-${nanoid()}`, name, completed: false}
    setTasks([...tasks, newTask]);
   };
   const tasksNoun =  tasksList.length !== 1 ? 'Task' : 'Tasks';
   const headingText = `${tasksList.length} ${tasksNoun} remaining`;
   return (
      <div className="todoapp stack-large">
      <h1>TaskMaster</h1>
      <Form addTask={addTask}/>
      <div className="filters btn-group stack-exception">
        {filterList}
      </div>
    
      <h2 id="list-heading">{headingText}</h2>
        
      <ul
        >
          <Taskmaster name="Eat" completed={true} id="todo-0" />
<Taskmaster name="Sleep" completed={false} id="todo-1" />
<Taskmaster name="Repeat" completed={false} id="todo-2" />
          {tasksList}
        </ul>
        </div>
    );
}

export default App;