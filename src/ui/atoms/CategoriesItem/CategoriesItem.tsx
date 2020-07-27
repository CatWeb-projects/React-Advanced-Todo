import React from 'react';
import { Categories } from 'Context/Context';

interface ItemProps {
  categorieProps: Categories;
  newDateProp: string;
  deleteCategoryProp: (id: number) => void;
  markCompleteProp: () => void;
  editProp: (e: any) => void;
}

export const CategoriesItem = (props: ItemProps) => {
  const { name, isCompleted } = props.categorieProps;

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
          <form>
            <button
              onClick={() => props.deleteCategoryProp(props.categorieProps.id)}
            >
              Delete
            </button>
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
