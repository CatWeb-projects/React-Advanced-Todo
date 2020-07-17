import React, { useState, useEffect, useCallback } from 'react';
// import { TodosList } from 'ui/molecules/TodosList/TodosList';
import { TodosCategories } from 'ui/molecules/TodosCategories/TodosCategories';
import { Context } from 'Context/Context';

export const TodosMain: any = () => {
  const [todos, setTodos] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [categoryName, setCategoryName] = useState<any>('');

  return (
    <Context.Provider
      value={{
        todos,
        setTodos,
        categories,
        setCategories,
        categoryName,
        setCategoryName
      }}
    >
      <div className="main-container">
        <TodosCategories />
      </div>
    </Context.Provider>
  );
};
