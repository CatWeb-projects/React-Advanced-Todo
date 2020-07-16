import React, { useState, useCallback, useEffect, useContext } from 'react';
import { CategoriesItem } from 'ui/atoms/CategoriesItem/CategoriesItem';
import { TodosList } from '../TodosList/TodosList';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { Context } from 'Context/Context';

export const TodosCategories = () => {
  const [categories, setCategories] = useState<any>([]);
  const [categoryName, setCategoryName] = useState<any>('');
  const [todos, setTodos] = useContext<any>(Context);

  const addTime = () => {
    const newDate = new Date();
    const fromNow = dayjs(newDate).format('MMM D, YYYY h:mm:ss A');
    return fromNow;
  };

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

  // const filtered = todos.filter((todo:any) =>
  // (
  // todo.name.
  //   includes(categories.map((filter:any) =>
  //   filter.name == todo.name ? ([todo, console.log(todo)]) : false
  //   ))
  // ))
  // setTodos(filtered)

  useEffect(() => {
    setCategories(categories);
    console.log(categories);
  }, [categories]);

  useEffect(() => {
    const data = localStorage.getItem('category-list');
    if (data) {
      setCategories(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('category-list', JSON.stringify(categories));
  });

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
              newDateProp={category.updatedAt}
              // onClick={}
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
