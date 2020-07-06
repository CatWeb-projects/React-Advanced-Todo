import React from 'react'
import { title } from 'process'

interface ItemProps {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priorityLevel: string;
}

export const TodoItem = (props:any) => {
  const {title, id, description, isCompleted, priorityLevel} = props.todoProps
  return (
    <div className="each-item" key={id}>
      <div className="each-item__checkbox-div">
        <input type="checkbox" value={isCompleted}/>
      </div>
      <h3 onChange={props.onChange}>{title}</h3>
      <span>{description}</span>
      <span>{priorityLevel}</span>
    </div>
  )
}