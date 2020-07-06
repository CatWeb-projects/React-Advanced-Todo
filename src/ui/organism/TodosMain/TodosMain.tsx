import React, {useState, useEffect} from 'react'
import { TodosList } from '../../molecules/TodosList/TodosList'



export const TodosMain:any = () => {
  const [addTodo, setAddTodo] = useState<any>()
  const [title, setTitle] = useState<any>()

  const addTitle = (e:any) => {
    e.preventDefault();
    setTitle(e.target.value)
  }
  console.log(title)

  return (
    <div className="main-container">
      <input onChange={addTitle} type="text" placeholder="Title"/>
      <input type="text"/>
      <button onSubmit={addTitle}>Add</button>
      <button>Delete</button>
      <TodosList />
    </div>
  )
}