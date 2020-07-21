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

  // const filtered = categories.filter((category:any) => (
  //   category.name,
  //   todos.filter((todo:any) => category.name.includes(todo.name))
  // ));

  const markComplete = useCallback(
    (category: any, index: number) => (event: any) => {
      const newTodos = [...todos];
      const newCategories = [...categories];
      newCategories.splice(index, 1, {
        ...category
      });
      const filtered = todos.filter((todo: any) => {
        if (todo.name === category.name) {
          return;
        } else {
          setTodos(newTodos);
        }
      });

      setTodos(filtered);
      console.log(todos);
    },
    [todos, categories]
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

  // useEffect(() => {
  //   const filtered = categories.filter((category: any) =>
  //     category.name.includes(
  //       todos.filter(
  //         (todo: any) => (
  //           todo.name,
  //           console.log(category.name, 'filter name'),
  //           console.log(todo.name, 'todo name'),
  //           category.name == todo.name && category.isCompleted == !true
  //             ? console.log(todos, 'this todos')
  //             : false
  //         )
  //       )
  //     )
  //   );
  //   setTodos(filtered);
  //   console.log(filtered);
  // }, [categories]);

  // useEffect(() => {
  //   const filtered = categories.filter((category:any) => (
  //     todos.filter((todo:any) => category.name.includes(todo.name)),
  //       console.log(todos)
  //     ));
  //   setTodos(filtered);
  // }, [categories]);

  // useEffect(() => {
  //   setCategories(categories)
  //   console.log(categories)
  // }, [categories])

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
