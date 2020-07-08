import React, { useCallback, useState } from 'react';

interface ItemProps {
  id: any;
  title: string;
  description: string;
  isCompleted: boolean;
  priorityLevel: string;
}

export const TodoItem = (props: any) => {
  const { title, description, isCompleted, priorityLevel } = props.todoProps;

  return (
    <div className="each-item">
      <div className="each-item__checkbox-div">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={props.markCompleteProp}
        />
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
