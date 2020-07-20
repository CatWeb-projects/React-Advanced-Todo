import React, { useState, useEffect, useCallback } from 'react';
import { TodosCategories } from 'ui/molecules/TodosCategories/TodosCategories';
import { Context } from 'Context/Context';

export const TodosMain: any = () => {
  const [todos, setTodos] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [categoryName, setCategoryName] = useState<any>('');

  useEffect(() => {
    const data = localStorage.getItem('category-list');
    if (data) {
      setCategories(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('category-list', JSON.stringify(todos));
  });

  useEffect(() => {
    const data = localStorage.getItem('list');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(categories));
  });

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
