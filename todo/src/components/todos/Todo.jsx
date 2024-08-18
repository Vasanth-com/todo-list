import React, { useContext, useEffect, useRef, useState } from 'react'
import Form from '../form/Form'
import TodoItems from './TodoItems';
import { StoreContext } from '../../context/StoreContext';

const Todo = () => {
    const currentDragItem = useRef();
    const todoItemLiveRegion = useRef();

    const {allTodoItems,setClearCompleted,option ,setOption,removeItem,todoItemDelete,todoViewingOption} = useContext(StoreContext)
    
    console.log(allTodoItems);
    
    const handleChangeOption = event => setOption(event.target.textContent);
  
    const handleRemoveAllCompletedTodo = () => setClearCompleted(true);
  
    useEffect(() =>{
      if (todoItemDelete) {
        todoItemLiveRegion.current.textContent = `${todoItemDelete} successfuly removed. ${allTodoItems.length-1} items remaining`;
        const timeout = setTimeout(() => todoItemLiveRegion.current.textContent = "", 200);
        return () => clearTimeout(timeout);
      }
    }, [todoItemDelete]);
  
    const renderTodoItems = () => allTodoItems?.map(todo => (
      <TodoItems
        data={todo}
        key={todo.id}
        currentDrag={currentDragItem}
        from={option}
        deleteItem={removeItem}
      />)
    );     
  
    return (
      <>
        <Form viewRef={setOption}/>
        <div className="todo">
          <div ref={todoItemLiveRegion} className="visually-hidden" aria-live='polite'></div>
          <div className="todo__container">
            <ul className="todo__items">
              {renderTodoItems()}
            </ul>
            <div className="todo__remaining">
              <span>{allTodoItems?.length} items left</span>
              <button onClick={handleRemoveAllCompletedTodo} aria-label='clear all completed todo item'>Clear Completed</button>
            </div>
          </div>
          <div ref={todoViewingOption} aria-live='polite' className="visually-hidden"></div>
          <ul className="todo__options">
            <li className='todo__option'>
              <span>{allTodoItems?.length} items left</span>
            </li>
            <li className={option === "All"? 'todo__option selected': 'todo__option'}>
              <button onClick={handleChangeOption} aria-label='Show all todo items'>All</button>
            </li>
            <li className={option === "Active"? 'todo__option selected': 'todo__option'}>
              <button onClick={handleChangeOption} aria-label='Show all active todo items'>Active</button>
            </li>
            <li className={option === "Completed"? 'todo__option selected': 'todo__option'}>
              <button onClick={handleChangeOption} aria-label='Show all completed todo items'>Completed</button>
            </li>
            <li className='todo__option'>
              <button onClick={handleRemoveAllCompletedTodo} aria-label='clear all completed todo item'>Clear Completed</button>
            </li>
          </ul>
          <div className="todo__bottom-text">Drag and drop to reorder list</div>
        </div>
      </>
    );
  }

export default Todo
