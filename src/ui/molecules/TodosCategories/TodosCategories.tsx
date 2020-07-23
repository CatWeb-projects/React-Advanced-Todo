import React, {
  useState,
  useCallback,
  useEffect,
  useContext,
  useRef
} from 'react';
import { CategoriesItem } from 'ui/atoms/CategoriesItem/CategoriesItem';
import { TodosList } from '../TodosList/TodosList';
import { v4 as uuid } from 'uuid';
import dayjs from 'dayjs';
import { ProviderContext, Context } from 'Context/Context';

export const TodosCategories = () => {
  const {
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
  } = useContext<any>(Context);

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
    (category: any, index: number) => (e: any) => {
      const newCategories = [...categories];
      e.preventDefault();
      setFilteredCategory(category);
      // newCategories[index].isCompleted = !newCategories[index].isCompleted;
      // setCategories(categories);
    },
    []
  );

  useEffect(() => {
    const filtered = todos.filter((todo: any) => {
      if (todo.name == filteredCategory.name) {
        return true;
      }
      return false;
    });
    setNewFilterTodoTask(filtered);
  }, [filteredCategory, todos]);

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
