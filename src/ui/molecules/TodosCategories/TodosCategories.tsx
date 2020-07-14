import React, { useState, useCallback, useEffect } from 'react';
import { CategoriesItem } from 'ui/atoms/CategoriesItem/CategoriesItem';
import { TodosList } from '../TodosList/TodosList';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';

export const TodosCategories = () => {
  const [categories, setCategories] = useState<any>([]);
  const [categoryName, setCategoryName] = useState<any>();
  const [todos, setTodos] = useState<any>([]);

  const addTime = () => {
    const newDate = new Date();
    const fromNow = dayjs(newDate).format('MMM D, YYYY h:mm:ss A');
    return fromNow;
  };

  const addName = (e: any) => {
    setCategoryName(e.target.value);
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
    },
    [addTime(), categoryName, categories]
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

  useEffect(() => {
    setTodos([]);
    const filtered = (props: any) => {
      todos.filter((todo: any) => {
        [...todo];
        todos: todo.includes(props.categoryName);
      });
    };
    setTodos(todos);
    console.log(todos);
  }, [todos]);

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
            />
          ))}
      </div>
      <div className="categories-div__adding">
        <div className="categories-div__input">
          <form onSubmit={SubmitCategorie}>
            <input
              type="text"
              placeholder="Selected category name here"
              onChange={addName}
            />
            <button>Add</button>
          </form>
        </div>
        <TodosList
          categorySubmitProp={SubmitCategorie}
          categoriesProp={categories}
        />
      </div>
    </div>
  );
};
