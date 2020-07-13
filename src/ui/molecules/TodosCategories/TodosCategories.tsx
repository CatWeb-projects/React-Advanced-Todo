import React, { useState, useCallback, useEffect } from 'react';
import { CategoriesItem } from 'ui/atoms/CategoriesItem/CategoriesItem';
import { TodosList } from '../TodosList/TodosList';
import { v4 as uuid } from 'uuid';

export const TodosCategories = () => {
  const [categories, setCategories] = useState<any>([]);
  const [categorieName, setCategorieName] = useState<any>();

  const addName = (e: any) => {
    setCategorieName(e.target.value);
    console.log(categorieName);
  };

  const SubmitCategorie = useCallback(
    (e: any) => {
      e.preventDefault();
      setCategories([
        ...categories,
        {
          id: uuid(),
          name: categorieName
        }
      ]);
    },
    [categorieName, categories]
  );

  const deleteCategorie = useCallback(
    (categorie) => (e: any) => {
      setCategories((prevCategories: any[]) =>
        prevCategories.filter(
          (otherCategorie: any) => otherCategorie !== categorie
        )
      );
    },
    [categories]
  );

  // const markComplete = useCallback(
  //   (categorie: any, index: number) => (event: any) => {
  //     const newCategories = [...categories];
  //     newCategories.splice(index, 1, {
  //       ...categorie,
  //       isCompleted: !todo.isCompleted
  //     });
  //     setCategories(newCategories);
  //   },
  //   [categories]
  // );

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
          categories.map((categorie: any, index: number) => (
            <CategoriesItem
              categorieProps={categorie}
              key={categorie.id}
              deleteCategorieProp={deleteCategorie(categorie)}
              // markCompleteProp={markComplete}
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
        <TodosList />
      </div>
    </div>
  );
};
