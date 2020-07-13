import React from 'react';
import { TodosList } from 'ui/molecules/TodosList/TodosList';
import { TodosCategories } from 'ui/molecules/TodosCategories/TodosCategories';

export const TodosMain: any = () => {
  return (
    <div className="main-container">
      <TodosCategories />
      {/* <TodosList /> */}
    </div>
  );
};
