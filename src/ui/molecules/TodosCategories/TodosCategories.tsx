import React, { useState, useCallback, useEffect, useContext } from 'react';
import { CategoriesItem } from 'ui/atoms/CategoriesItem/CategoriesItem';
import { TodosList } from '../TodosList/TodosList';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { Context } from 'Context/Context';

export const TodosCategories = () => {
  const {
    todos,
    setTodos,
    categories,
    setCategories,
    categoryName,
    setCategoryName
  } = useContext<any>(Context);

  const addTime = () => {
    const newDate = new Date();
    const fromNow = dayjs(newDate).format('MMM D, YYYY h:mm:ss A');
    return fromNow;
  };

  // const setCategory = () => {
  //   setCategoryName(categoryName);
  // };

  const SubmitCategorie = useCallback(
    (e: any) => {
      e.preventDefault();
      setCategories([
        ...categories,
        {
          id: uuid(),
          name: categoryName,
          isCompleted: false,
          updatedAt: addTime()
        }
      ]);
      setCategoryName('');
    },
    [categoryName, addTime(), categories]
  );

  const deleteCategory = useCallback(
    (categorie) => (e: any) => {
      setCategories((prevCategories: any[]) =>
        prevCategories.filter(
          (otherCategorie: any) => otherCategorie !== categorie
        )
      );
    },
    [categories]
  );

  const markComplete = useCallback(
    (category: any, index: number) => (event: any) => {
      const newCategories = [...categories];
      newCategories.splice(index, 1, {
        ...category,
        isCompleted: !category.isCompleted
      });
      setCategories(newCategories);
    },
    [categories]
  );

  const editCategory = useCallback(
    (category: any, index: number) => (e: any) => {
      e.preventDefault();
      const newCategories = [...categories];
      newCategories.splice(index, 1, {
        ...category,
        name: categoryName,
        updatedAt: addTime()
      });
      setCategoryName('');
      setCategories(newCategories);
    },
    [categoryName, addTime(), categories]
  );

  // const filtered = categories.filter((category:any) =>
  // (
  // categories.
  //   includes(todos.filter((todo:any) =>
  //   (console.log(category.name, 'filter name'),
  //   console.log(todo.name, 'todo name'),
  //   category.name == todo.name && category.isCompleted == true ? ([todo, console.log(todo, 'todo after filtering')]) : false
  //   )))
  // ))

  useEffect(() => {
    const filtered = categories.filter((category: any) =>
      category.name.includes(
        todos.filter(
          (todo: any) => (
            todo.name,
            console.log(category.name, 'filter name'),
            console.log(todo.name, 'todo name'),
            category.name == todo.name && category.isCompleted == !true
              ? setTodos(todos)
              : false
          )
        )
      )
    );
    setTodos(filtered);
    console.log(filtered);
  }, [categories]);

  // useEffect(() => {
  //   const data = localStorage.getItem('list');
  //   if (data) {
  //     setTodos(JSON.parse(data));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem('list', JSON.stringify(todos));
  // });

  return (
    <div className="categories-div">
      <div className="categories-div__each-category">
        {categories &&
          categories.map((category: any, index: number) => (
            <CategoriesItem
              categorieProps={category}
              key={category.id}
              deleteCategoryProp={deleteCategory(category)}
              markCompleteProp={markComplete(category, index)}
              editProp={editCategory(category, index)}
              newDateProp={category.updatedAt}
              onClick={setCategoryName}
            />
          ))}
      </div>
      <div className="categories-div__adding">
        <div className="categories-div__input">
          <form onSubmit={SubmitCategorie}>
            <input
              value={categoryName}
              onChange={(event) => setCategoryName(event.target.value)}
              type="text"
              placeholder="Category name here"
            />
            <button>Add</button>
          </form>
        </div>
        <TodosList categoriesProp={categories} />
      </div>
    </div>
  );
};
