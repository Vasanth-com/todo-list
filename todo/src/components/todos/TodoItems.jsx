import React, { useContext, useEffect, useRef, useState } from 'react'
// import { getData, setData, updateLocalData } from '../Utillies';
import { StoreContext } from '../../context/StoreContext';

const TodoItems = ({data,currentDrag, from, deleteItem}) => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [selectionChange, setSelectionChange] = useState(false);
  const [swappedElement, setSwappedElement] = useState("");
  const checkTodo = useRef();

  const {getAllTodoItemsData,getData,setData,updateLocalData} = useContext(StoreContext);
  
  
  const handleTodoCheckCompleted = event => {
    setSelectionChange(true);
    setIsCompleted(event.target.checked);
  }

  const handleTodoRemove = () => {
    setIsDeleted(true);
    deleteItem(data.todo);
  };

  // Checks previous session if todo item is completed or not

  useEffect(() =>{
    setIsCompleted(data.completed);
  }, []);

  // Handle any completions of any todo items
  useEffect(() =>{
    const handleTodoItemsDataUpdate = () =>{
      updateLocalData(todoData => {
        const todoItem = todoData.find(todo => todo.id === data.id);
        if(todoItem){
          todoItem.completed = selectionChange ? isCompleted : data.completed;
        }
        return todoData;
      })
    }
    
    handleTodoItemsDataUpdate();

    if (from !== "All") {
      getAllTodoItemsData();
    }
    setSelectionChange(true);
  }, [isCompleted]);

  // Handle the deletions of any todo items
  
  useEffect(() =>{
    if (isDeleted) {
      updateLocalData(todoData => todoData.filter(todo => todo.id !== data.id));
      getAllTodoItemsData();
    }
  }, [isDeleted,data.id])

  // Handle the swapping of todo items in localstorage
    useEffect(() =>{
      if (swappedElement) {
        swappedElement.classList.remove("enter");
        const todoData = Array.from(getData("todo"));
        const index1 = todoData.findIndex(item => item.id === parseInt(currentDrag.current.dataset.id));
        const index2 = todoData.findIndex(item => item.id === parseInt(swappedElement.dataset.id));
        if (index1 >=0 && index2 >= 0) {
          [todoData[index1], todoData[index2]] = [todoData[index2], todoData[index1]]
        } 
        setData("todo", todoData);
        getAllTodoItemsData();
        setSwappedElement("");
      }
    }, [swappedElement,currentDrag])

  const dragStart = event =>{
    currentDrag.current = event.target;
    event.target.classList.add("drag");
    event.dataTransfer.effectAllowed = "move";
    event.dataTransfer.setData("text/html", event.target.innerHTML);
  }
  
  const dragEnter = event =>{
    event.target.classList.add("enter");
  }

  const dragOver = event =>{
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
    return false;
  }

  const dragLeave = event =>{
    event.target.classList.remove("enter");
  }

  const dragDrop = event =>{
    if (currentDrag.current !== event.target) {
      setSwappedElement(event.target);
      event.target.classList.remove("enter")
    }
  }

  const dragEnd = event =>{
    event.target.classList.remove("drag");
  }

  return (
    <li className='todo__item' 
      data-id={data.id}
      draggable
      onDragStart={dragStart}
      onDragEnter={dragEnter}
      onDragOver={dragOver}
      onDragLeave={dragLeave}
      onDrop={dragDrop}
      onDragEnd={dragEnd}
    >
      <input 
        className='todo__check' 
        type="checkbox" 
        id={`todo-${data.id}`}
        onChange={handleTodoCheckCompleted}
        ref={checkTodo}
        checked={isCompleted}
      />
      <label className='todo__label' htmlFor={`todo-${data.id}`}>
      <span className="visually-hidden">complete todo item</span>
        <span>{data.todo}</span>
        
      </label>
      <button 
        className='todo__remove' 
        aria-label={`remove ${data.todo} todo item`}
        onClick={handleTodoRemove} />
    </li>
  );
}

export default TodoItems
