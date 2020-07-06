import React, { useState, useEffect } from 'react'
import { TodoItem } from '../../atoms/TodosItem/TodoItem'

const TodosAttr = [
  {
    id: 1,
    title: 'Learn Local Storage',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque dolorum dolore nesciunt eveniet tempora, quasi consequatur voluptatum nostrum ducimus commodi suscipit praesentium a reiciendis illo! Debitis sit fugit illo voluptas.',
    isCompleted: false,
    priorityLevel: 'Low'
  },
  {
    id: 2,
    title: 'Complete React Todos',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque dolorum dolore nesciunt eveniet tempora, quasi consequatur voluptatum nostrum ducimus commodi suscipit praesentium a reiciendis illo! Debitis sit fugit illo voluptas.',
    isCompleted: false,
    priorityLevel: 'Low'
  },
  {
    id: 3,
    title: 'Run 10km and wake up',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque dolorum dolore nesciunt eveniet tempora, quasi consequatur voluptatum nostrum ducimus commodi suscipit praesentium a reiciendis illo! Debitis sit fugit illo voluptas.',
    isCompleted: false,
    priorityLevel: 'Low'
  },
]

interface Todos {
 id: number;
 title: string;
 description: string;
 isCompleted: boolean;
 priorityLevel: string;
}

export const TodosList = (props:any) => {
  const [todos, setTodos] = useState<any>()

  useEffect(() => {
    setTodos(TodosAttr);
  }, [todos]);

  return (
    <div className="todos-wrapper">
      {todos &&
        todos.map((todo: Todos) => (
          <TodoItem todoProps={todo} key={todo.id} onChange={props.onChange}/>
        ))}
    </div>
  )
}