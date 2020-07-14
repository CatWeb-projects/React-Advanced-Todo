import React from 'react';

export const CategoriesItem = (props: any) => {
  const { name, isCompleted } = props.categorieProps;
  return (
    <div className="categories-div__holder">
      <div className="categories-div__text">
        <span>{name}</span>
      </div>
      <div className="categories-div__check">
        <div>
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
