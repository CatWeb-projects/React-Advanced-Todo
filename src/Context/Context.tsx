import React, { useEffect, useState } from 'react';

export interface Categories {
  id: any;
  name: string;
  isCompleted: boolean;
  updatedAt: string;
}

export interface Todos {
  id: string;
  title: string;
  description: string;
  isCompleted: boolean;
  priorityLevel: string;
  name: string;
  updatedAt: string;
}

export interface Props {
  todos: Todos[];
  categories: Categories[];
  categoryName: string;
  filteredCategory: string;
  newFilterTodoTask: Todos[];
  setTodos: React.Dispatch<React.SetStateAction<Todos[]>>;
  setCategories: React.Dispatch<React.SetStateAction<Categories[]>>;
  setCategoryName: React.Dispatch<React.SetStateAction<string>>;
  setFilteredCategory: React.Dispatch<React.SetStateAction<string>>;
  setNewFilterTodoTask: React.Dispatch<React.SetStateAction<Todos[]>>;
}

const defaultValue = {
  todos: [],
  categories: [],
  categoryName: '',
  filteredCategory: '',
  newFilterTodoTask: [],
  setTodos: () => {},
  setCategories: () => {},
  setCategoryName: () => {},
  setFilteredCategory: () => {},
  setNewFilterTodoTask: () => {}
};

export const Context = React.createContext<Props>(defaultValue);

export const ProviderContext = (props: any) => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const [categories, setCategories] = useState<Categories[]>([]);
  const [categoryName, setCategoryName] = useState<string>('');
  const [filteredCategory, setFilteredCategory] = useState<string>('');
  const [newFilterTodoTask, setNewFilterTodoTask] = useState<Todos[]>([]);

  useEffect(() => {
    const data = localStorage.getItem('list');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const data = localStorage.getItem('category-list');
    if (data) {
      setCategories(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('category-list', JSON.stringify(categories));
  }, [categories]);

  const { children } = props;
  return (
    <Context.Provider
      value={{
        todos,
        setTodos,
        categories,
        setCategories,
        categoryName,
        setCategoryName,
        filteredCategory,
        setFilteredCategory,
        newFilterTodoTask,
        setNewFilterTodoTask
      }}
    >
      {children}
    </Context.Provider>
  );
};
