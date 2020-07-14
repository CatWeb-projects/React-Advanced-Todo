import React, { useState, useEffect, useCallback } from 'react';
import { TodoItem } from 'ui/atoms/TodosItem/TodoItem';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';

interface Todos {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priorityLevel: string;
  updatedAt: any;
}

export const TodosList = (props: any) => {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<any>();
  const [descr, setDescr] = useState<any>();
  const [priority, setPriority] = useState<any>('low');
  const [categoryName, setCategoryName] = useState('');

  const addTime = () => {
    const newDate = new Date();
    const fromNow = dayjs(newDate).format('MMM D, YYYY h:mm:ss A');
    return fromNow;
  };

  const addTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const addDescr = (e: any) => {
    setDescr(e.target.value);
  };

  const addPriority = (e: any) => {
    setPriority(e.target.value);
  };

  const addCategory = (e: any) => {
    if ((props.categoriesProp = e.target.value))
      return setCategoryName(e.target.value);
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
          categoryName: addCategory,
          updatedAt: addTime()
        }
      ]);
    },
    [addCategory, addTime(), title, descr, priority, todos]
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
  }, [sortedTodos]);

  useEffect(() => {
    const data = localStorage.getItem('list');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(sortedTodos));
  });

  return (
    <div className="todos-wrapper">
      <div className="todos-wrapper__form">
        <form onSubmit={SubmitTodo}>
          <input onChange={addTitle} type="text" placeholder="Title" />
          <input onChange={addDescr} type="text" placeholder="Description" />
          <select onSubmit={addCategory}>
            <option>Select Value</option>
            {props.categoriesProp &&
              props.categoriesProp.map((item: any) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
          </select>
          <select onChange={addPriority}>
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
            />
          ))}
      </div>
    </div>
  );
};
