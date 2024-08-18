export const getData = key => JSON.parse(localStorage.getItem(key));

export const setData = (key,value) => localStorage.setItem(key,JSON.stringify(value));

export const updateLocalData = func =>{
    const data = getData('todo');
    setData("todo",func(data))
}