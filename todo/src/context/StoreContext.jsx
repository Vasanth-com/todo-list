import { createContext, useEffect, useRef, useState } from "react";
import { getData,setData,updateLocalData } from "../components/Utillies";

export const StoreContext = createContext(null);

const StoreContextProvider = (props) =>{
    const [allTodoItems, setAllTodoItems] = useState([]);
    const [option,setOption] = useState("All");
    const [todoItemDelete,setTodoDeleted] = useState('');
    const [clearCompleted,setClearCompleted] = useState(false);
    const todoViewingOption = useRef();
    
    const getAllTodoItemsData = () => {
        const todoDatas = getData('todo');
        if(todoDatas){
            switch(option){
                case "Active":
                    setAllTodoItems(todoDatas.filter(todo => !todo.completed))
                    break;
                case "Completed":
                    setAllTodoItems(todoDatas.filter(todo => todo.completed))
                    break;
                case "All":
                    setAllTodoItems(todoDatas);
                    break;
                default:
            }
        }
    }

    useEffect(()=>{
        getAllTodoItemsData();
        todoViewingOption.current.textContent = `Showing ${option} todo Items`;
        const timeOut = setTimeout(()=>{
            todoViewingOption.current.textContent = ""
        },200)
        return () => clearTimeout(timeOut)
    },[option])

    useEffect(()=>{
        if(clearCompleted){
            updateLocalData(todoData => todoData.filter(todo => !todo.completed))
            getAllTodoItemsData();
            setClearCompleted(false)
        }
    },[clearCompleted])


    const removeItem = (todoContent) =>{
        setTodoDeleted(todoContent);
    }

    const contextValue = {
        removeItem,
        allTodoItems,
        option,setOption,
        clearCompleted,
        setClearCompleted,
        todoItemDelete,
        updateLocalData,
        getData,setData,
        getAllTodoItemsData,
        todoViewingOption
    }
    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider