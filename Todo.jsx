import React, { useEffect, useState } from 'react'
import '../components/todo.css'
import { MdCheck } from "react-icons/md";
import { MdDeleteForever } from "react-icons/md";

const Todo = () => {
  const [inputValue,setInputValue]=useState("");
  const [task,setTask]=useState([]);
  const [dateTime,setDateTime]=useState("");

  const handleInputChange=(value)=>{
    setInputValue(value)
  };
  const handleFormSubmit=(event)=>{
    event.preventDefault();

    if(!inputValue) return;
    if(task.includes(inputValue)){
      setInputValue("");
      return;
    }
    setTask((prev)=>[...prev,inputValue]);
    setInputValue("");
  };
  // Todo Date & Time
  useEffect(()=>{
    const interval=setInterval(()=>{ 
      const now =new Date();
      const formattedDate=now.toLocaleDateString();
      const formattedTime=now.toLocaleTimeString();
      
      setDateTime(`${formattedDate} - ${formattedTime}`);
    },1000)
    return () => clearInterval(interval);
  },[]);

  // Todo Delete Function
  const handleDelete=(value)=>{
    const updatedTask=task.filter((currTask)=> currTask !== value);
    setTask(updatedTask); 
  };

  // Todo clear function
  const handleClearBtn =()=>{
    setTask([]);
  }

  return (
    <>
    <h1>Add To-Do</h1>
    <h2 className='date-time'>{dateTime}</h2>
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <input type="text" placeholder='Enter To-Do' value={inputValue} onChange={(event)=>handleInputChange(event.target.value)}/>
        <button className='button'>Add</button>
      </form>
    </div>
    <div className="list-container">
      <ul>{
        task.map((element,index)=>{
          return <li key={index}>
            
            <span className='span'>{element}
              <span >
              <button className='icon check-btn'><MdCheck /></button>
              <button className='icon del-btn' onClick={()=>handleDelete(element)}><MdDeleteForever /></button>
            </span>
            </span>
          </li>
        })
        }</ul>
    </div>
    <div className="clear">
      <button className='clear-btn' onClick={handleClearBtn}>Clear All</button>
    </div>
    </>
  )
}

export default Todo