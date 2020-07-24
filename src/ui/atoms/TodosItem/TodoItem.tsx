import React from 'react';

interface ItemProps {
  id: any;
  title: string;
  description: string;
  isCompleted: boolean;
  priorityLevel: string;
  updatedAt: string;
}

export const TodoItem = (props: any) => {
  const { title, description, isCompleted, priorityLevel } = props.todoProps;

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
          onChange={props.markCompleteProp}
        />
        <form onSubmit={props.editTodoProp}>
          <button>Edit</button>
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
        <form onSubmit={props.deleteTodoProp}>
          <span style={isCompleted ? checkStyle : undefined}>
            Priority: {priorityLevel}
          </span>
          <button>Delete</button>
        </form>
      </div>
    </div>
  );
};
