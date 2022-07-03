import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from "react";
import TodoList from "./components/TodoList";
import axios from "axios";

function App() {
    const [todo,setTodo]=useState([])
    const [title,setTitle]=useState("")
    const handleChange=(e)=>{
        setTitle(e.target.value)
    }
    const updateTodo=(title,id)=>{
        setTodo(state=> state.map(el=>el.id===id ? {...el,name:title}:el))
        axios.put(`https://62bec476be8ba3a10d5b0d16.mockapi.io/frontend/todo/${id}`,{
            name:title
        }).then(({data})=>{
            setTodo(state=> state.map(el=>el.id===id ? data:el))
        })
    }
    const  addTodo=()=>{
        const newTodo={
            id:todo.length ? todo[todo.length-1].id+1 :1,
            name:title,
            isDone:false,

        }
        // setTodo((state)=>[...state,newTodo])
        axios.post("https://62bec476be8ba3a10d5b0d16.mockapi.io/frontend/todo",{

            name:title,

        })
            .then(({data})=>{
              setTodo([...todo,data])
            })


    }
    const deleteTodo=(id)=>{
        setTodo(state=>state.filter(el=>el.id !==id))
   axios.delete(`https://62bec476be8ba3a10d5b0d16.mockapi.io/frontend/todo/${id}`)
            .then(({data})=>console.log(data))
    }
    const changeStatus=(id)=>{
        const element=todo.find(el=>el.id===id)
        // setTodo(state=>state.map(el=> el.id === id ? {...el,isDone: !el.isDone}:el))
        axios.put(`https://62bec476be8ba3a10d5b0d16.mockapi.io/frontend/todo/${id}`,{
            isDone: !element.isDone
        }).then(({data})=>{
           setTodo(state=>state.map(el=>el.id===id ? data:el))
            })
    }
    // https://62bec476be8ba3a10d5b0d16.mockapi.io/frontend/
    const getTodo=async () =>{
        const url=await axios("https://62bec476be8ba3a10d5b0d16.mockapi.io/frontend/todo")
        const {data}=await url
        setTodo(data)
        return;
    }
    useEffect(()=>{
       getTodo()
    },[])
  return (
    <div className="App">
    <div className="container">
      <h1 className="text-4xl my-5">TODO APP</h1>
      <div className="flex-row flex-wrap">
        <div className="basis-1/3">
         <div className="flex-row flex-wrap">
           <input onChange={handleChange} type="text" className="p-3 rounded-lg w-1/4 bg-gray-600 mx-2 border-b text-gray-50" placeholder="text"/>
           <button onClick={addTodo} className="btn bg-blue-700 p-3 text-gray-50 rounded-lg ">Добавить </button></div>
         <div className="flex flex-wrap flex-row justify-center">
             <div className="basis-1/3">
                 <ul className="  my-4 text-sm bg-gray-600 font-medium text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                     {
                         todo.filter(el=>el.isDone ===false).map(el=>(

                                 <TodoList  updateTodo={updateTodo}     changeStatus={changeStatus}  deleteTodo={deleteTodo}   el={el} key={el.id}/>

                             )
                         )
                     }
                 </ul>
             </div>
         </div>
        </div>

      </div>
      <div className="flex flex-wrap flex-row justify-center">
        <div className="basic-1/3">
           Законченные дела
            <ul className=" my-4 text-sm bg-gray-600 font-medium text-gray-900 bg-white  rounded-lg dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                {
                    todo.filter(el=>el.isDone ===true).map(el=>(

                            <TodoList updateTodo={updateTodo}      changeStatus={changeStatus}  deleteTodo={deleteTodo}   el={el} key={el.id}/>

                        )
                    )
                }
            </ul>
        </div>

      </div>
    </div>
    </div>
  );
}

export default App;
