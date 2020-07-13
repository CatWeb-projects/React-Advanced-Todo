import React from 'react';

export const CategoriesItem = (props: any) => {
  const { name } = props.categorieProps;
  return (
    <div className="categories-div__holder">
      <div className="categories-div__text">
        <span>{name}</span>
      </div>
      <div className="categories-div__check">
        <div>
          <form onSubmit={props.deleteCategorieProp}>
            <button>Delete</button>
          </form>
        </div>
        <input type="checkbox" onChange={props.markCompleteProp} />
      </div>
    </div>
  );
};
