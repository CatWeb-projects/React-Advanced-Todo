import React, { useState, useEffect, useCallback } from 'react';
import { TodoItem } from 'ui/atoms/TodosItem/TodoItem';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { v4 as uuid } from 'uuid';

interface Todos {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priorityLevel: string;
}

export const TodosList = () => {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<any>();
  const [descr, setDescr] = useState<any>();
  const [priority, setPriority] = useState<any>('low');
  const [time, setTime] = useState<any>();

  dayjs.extend(relativeTime);
  const newDate = new Date();
  // setTime(newDate)
  const fromNow = dayjs(newDate).fromNow();

  const addTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const addDescr = (e: any) => {
    setDescr(e.target.value);
  };

  const addPriority = (e: any) => {
    setPriority(e.target.value);
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
          updatedAt: fromNow
        }
      ]);
    },
    [newDate, title, descr, priority, todos]
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
          <br />
          <input onChange={addDescr} type="text" placeholder="Description" />
          <br />
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
              newDateProp={fromNow}
            />
          ))}
      </div>
    </div>
  );
};
