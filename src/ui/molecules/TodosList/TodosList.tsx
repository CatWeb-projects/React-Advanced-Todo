import React, { useState, useEffect, useCallback, useContext } from 'react';
import { TodoItem } from 'ui/atoms/TodosItem/TodoItem';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { Context } from 'Context/Context';

interface Todos {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priorityLevel: string;
  updatedAt: any;
}

export const TodosList = (props: any) => {
  const {
    todos,
    setTodos,
    categories,
    setCategories,
    categoryName,
    setCategoryName
  } = useContext<any>(Context);
  const [title, setTitle] = useState<any>('');
  const [descr, setDescr] = useState<any>('');
  const [priority, setPriority] = useState<any>('low');

  const addTime = () => {
    const newDate = new Date();
    const fromNow = dayjs(newDate).format('MMM D, YYYY h:mm:ss A');
    return fromNow;
  };

  const addCategoryName = (e: any) => {
    setCategoryName(e.target.value);
  };

  const SubmitTodo = useCallback(
    (e: any) => {
      e.preventDefault();
      setTodos([
        ...todos,
        {
          id: uuid(),
          title: title,
          description: descr,
          isCompleted: false,
          priorityLevel: priority,
          name: categoryName,
          updatedAt: addTime()
        }
      ]);
      setTitle('');
      setDescr('');
    },
    [title, descr, categoryName, priority, addTime(), todos]
  );

  const markComplete = useCallback(
    (todo: any, index: number) => (event: any) => {
      const newTodos = [...todos];
      newTodos.splice(index, 1, {
        ...todo,
        isCompleted: !todo.isCompleted
      });
      setTodos(newTodos);
    },
    [todos]
  );

  const editTodo = useCallback(
    (todo: any, index: number) => (e: any) => {
      e.preventDefault();
      const newTodos = [...todos];
      newTodos.splice(index, 1, {
        ...todo,
        title: title,
        description: descr,
        priorityLevel: priority,
        name: categoryName,
        updatedAt: addTime()
      });
      setTitle('');
      setDescr('');
      setTodos(newTodos);
    },
    [title, descr, priority, addTime(), todos]
  );

  const deleteTodo = useCallback(
    (todo) => (e: any) => {
      setTodos((prevTodos: any[]) =>
        prevTodos.filter((otherTodo: any) => otherTodo !== todo)
      );
    },
    [todos]
  );

  const priorities: any = {
    low: 1,
    medium: 2,
    high: 3
  };
  const sortedTodos = todos.sort((a: any, b: any) => {
    return priorities[b.priorityLevel] - priorities[a.priorityLevel];
  });

  useEffect(() => {
    setTodos(sortedTodos);
    console.log(sortedTodos);
  }, [todos]);

  return (
    <div className="todos-wrapper">
      <span>Add Todos...</span>
      <div className="todos-wrapper__form">
        <form onSubmit={SubmitTodo}>
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            type="text"
            placeholder="Todo Title"
          />
          <input
            value={descr}
            onChange={(event) => setDescr(event.target.value)}
            type="text"
            placeholder="Todo Description"
          />
          <select onChange={addCategoryName}>
            <option>Select Value</option>
            {categories &&
              categories.map((item: any) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
          <select onChange={(event) => setPriority(event.target.value)}>
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
          <button>Add</button>
        </form>
      </div>
      <div className="todos-wrapper__mapping">
        {todos &&
          todos.map((todo: Todos, index: number) => (
            <TodoItem
              todoProps={todo}
              key={todo.id}
              deleteTodoProp={deleteTodo(todo)}
              markCompleteProp={markComplete(todo, index)}
              newDateProp={todo.updatedAt}
              editTodoProp={editTodo(todo, index)}
            />
          ))}
      </div>
    </div>
  );
};
