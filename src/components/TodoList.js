import React, {useState} from "react"
const TodoList=({el,deleteTodo,changeStatus,updateTodo})=>{
    const [isOpen,setIsOpen]=useState(false)
 const [title,setTitle]=useState(el.name)


    const openInput=()=>{setIsOpen(true)}
    const closeInput=(title,id)=>{

        setIsOpen(false)
        updateTodo(title,id)
    }

const handleChange=(e)=>{
        setTitle(e.target.value)
}



    return(

        <li className=" px-5  my-1  py-2 text-gray-50  rounded-t-lg  bg-gray-600 flex text-center items-center rounded-lg justify-between">
            <span className="flex">
             <input className="rounded-lg"  type="checkbox" onChange={()=>changeStatus(el.id)}
                    defaultChecked={el.isDone}
                   />
            {
                isOpen ? <input  onChange={handleChange} type="text" className="text-black"  value={title}/>:
                    <span style={{
                        textDecoration : el.isDone ? "line-through":""
                    }}  className="mx-2 ">{el.name}</span>
            }
</span>
          <span className="flex">  <button type="button" onClick={()=>isOpen ? closeInput(title,el.id):openInput() }
                          className=" text-white  bg-green-700 hover:bg-green-800 focus:ring-2 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5  mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">
              {isOpen  ? "save":"изменить"}</button></span>


     <span> <button type="button" onClick={()=>deleteTodo(el.id)}
                    className="text-white bg-red-600  text-sm px-5 py-2.5 text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm mr-0 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Удалить</button>
</span>
        </li>
    )
}
export default TodoList