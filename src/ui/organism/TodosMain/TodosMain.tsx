import React from 'react';
import { TodosCategories } from 'ui/molecules/TodosCategories/TodosCategories';
import { ProviderContext } from 'Context/Context';

export const TodosMain = () => {
  return (
    <ProviderContext>
      <div className="main-container">
        <TodosCategories />
      </div>
    </ProviderContext>
  );
};
