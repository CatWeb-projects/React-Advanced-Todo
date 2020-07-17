import React, { useContext } from 'react';
import { Context } from 'Context/Context';

export const CategoriesItem = (props: any) => {
  const { name, isCompleted } = props.categorieProps;
  const { categoryName, setCategoryName } = useContext<any>(Context);

  const checkDiv = {
    background: 'linear-gradient(to bottom, #27ff00, #3b9a29)'
  };

  return (
    <div
      style={isCompleted ? checkDiv : undefined}
      className="categories-div__holder"
    >
      <div className="categories-div__text">
        <span>{name}</span>
      </div>
      <div className="categories-div__check">
        <div>
          <form onSubmit={props.editProp}>
            <button>Edit</button>
          </form>
          <form onSubmit={props.deleteCategoryProp}>
            <button>Delete</button>
          </form>
        </div>
        <input
          type="checkbox"
          checked={isCompleted}
          onChange={props.markCompleteProp}
        />
      </div>
      <span>{props.newDateProp}</span>
    </div>
  );
};
