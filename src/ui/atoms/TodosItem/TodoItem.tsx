import React, { useMemo } from 'react';
import { Todos } from 'Context/Context';

interface ItemProps {
  todoProps: Todos;
  newDateProp: string;
  deleteTodoProp: (id: any) => void;
  markCompleteProp: (id: any) => void;
  editTodoProp: (id: any) => void;
}

export const TodoItem = (props: ItemProps) => {
  const { title, description, isCompleted, priorityLevel } = useMemo(
    () => props.todoProps,
    [props.todoProps]
  );

  const checkStyle = {
    textDecoration: 'line-through',
    color: '#ccc'
  };
  const checkDiv = {
    background: 'linear-gradient(to bottom, #27ff00, #3b9a29)'
  };

  return (
    <div style={isCompleted ? checkDiv : undefined} className="each-item">
      <div className="each-item__checkbox-div">
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={() => props.markCompleteProp(props.todoProps.id)}
        />
        <form>
          <button onClick={props.editTodoProp}>Edit</button>
        </form>
      </div>
      <div>
        <h3 style={isCompleted ? checkStyle : undefined}>{title}</h3>
      </div>
      <div>
        <span style={isCompleted ? checkStyle : undefined}>{description}</span>
      </div>
      <div className="each-item__updated">
        <span style={isCompleted ? checkStyle : undefined}>
          {props.newDateProp}
        </span>
      </div>
      <div className="each-item__button-div">
        <form>
          <span style={isCompleted ? checkStyle : undefined}>
            Priority: {priorityLevel}
          </span>
          <button onClick={() => props.deleteTodoProp(props.todoProps.id)}>
            Delete
          </button>
        </form>
      </div>
    </div>
  );
};
