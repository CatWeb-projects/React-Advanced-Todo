import React, { useCallback, useState } from 'react';

interface ItemProps {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priorityLevel: string;
}

export const TodoItem = (props: any) => {
  const {
    title,
    id,
    description,
    isCompleted,
    priorityLevel
  } = props.todoProps;

  return (
    <div className="each-item" key={id} onChange={props.onChange}>
      <div className="each-item__checkbox-div">
        <input type="checkbox" value={isCompleted} />
      </div>
      <div>
        <h3>{title}</h3>
      </div>
      <div>
        <span>{description}</span>
      </div>
      <div className="each-item__button-div">
        <form onSubmit={props.deleteTodoProp}>
          <span>Priority: {priorityLevel}</span>
          <button>Delete</button>
        </form>
      </div>
    </div>
  );
};
