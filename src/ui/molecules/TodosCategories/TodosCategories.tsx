import React, { useCallback, useEffect, useContext } from 'react';
import { CategoriesItem } from 'ui/atoms/CategoriesItem/CategoriesItem';
import { TodosList } from '../TodosList/TodosList';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { Context, Categories, Todos } from 'Context/Context';

export const TodosCategories = () => {
  const {
    todos,
    categories,
    setCategories,
    categoryName,
    setCategoryName,
    filteredCategory,
    setFilteredCategory,
    setNewFilterTodoTask
  } = useContext<any>(Context);

  const addTime = () => {
    const newDate = new Date();
    const fromNow = dayjs(newDate).format('MMM D, YYYY h:mm:ss A');
    return fromNow;
  };

  const SubmitCategorie = useCallback(
    (e) => {
      e.preventDefault();
      if (categoryName === '') {
        return null;
      }
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
    (id) => {
      setCategories((prevCategories: Categories[]) =>
        prevCategories.filter(
          (otherCategory: Categories) => otherCategory.id !== id
        )
      );
    },
    [categories]
  );
  const markComplete = useCallback(
    (id, category) => () => {
      setFilteredCategory(category);
      setCategories((prevNewTodos: Categories[]) =>
        prevNewTodos.map((prevCategory: Categories) => ({
          ...prevCategory,
          isCompleted: prevCategory.id === id ? true : false
        }))
      );
    },
    []
  );

  useEffect(() => {
    const filtered = todos.filter((todo: Todos) => {
      if (todo.name == filteredCategory.name) {
        return true;
      }
      return false;
    });
    setNewFilterTodoTask(filtered);
  }, [filteredCategory, todos]);

  const editCategory = useCallback(
    (category, index) => (e: any) => {
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

  return (
    <div className="categories-div">
      <div className="categories-div__each-category">
        {categories &&
          categories.map((category: Categories, index: number) => (
            <CategoriesItem
              categorieProps={category}
              key={category.id}
              deleteCategoryProp={deleteCategory}
              markCompleteProp={markComplete(category.id, category)}
              editProp={editCategory(category, index)}
              newDateProp={category.updatedAt}
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
        <TodosList />
      </div>
    </div>
  );
};
