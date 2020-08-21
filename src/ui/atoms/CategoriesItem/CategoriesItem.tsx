import React, { useMemo, useContext } from 'react';
import { Categories, Context } from 'Context/Context';

interface ItemProps {
  categoryProps: Categories;
  newDateProp: string;
  deleteCategoryProp: (id: number, name: string) => void;
  markCompleteProp: () => void;
  editProp: (e: any) => void;
}

export const CategoriesItem = (props: ItemProps) => {
  const { filteredCategory } = useContext<any>(Context);
  const { name } = useMemo(() => props.categoryProps, [props.categoryProps]);

  const checkDiv = {
    background: 'linear-gradient(to bottom, #27ff00, #3b9a29)'
  };

  return (
    <div
      style={filteredCategory.name === name ? checkDiv : undefined}
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
              onClick={() =>
                props.deleteCategoryProp(
                  props.categoryProps.id,
                  props.categoryProps.name
                )
              }
            >
              Delete
            </button>
          </form>
        </div>
        <input
          type="checkbox"
          checked={filteredCategory.name === name}
          onChange={props.markCompleteProp}
        />
      </div>
      <span>{props.newDateProp}</span>
    </div>
  );
};
