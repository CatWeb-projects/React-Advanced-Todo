import React, { useState, useEffect, useCallback } from 'react';
import { v5 as uuidv5 } from 'uuid';
import { TodoItem } from 'ui/atoms/TodosItem/TodoItem';

interface Todos {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priorityLevel: string;
}

export const TodosList = () => {
  const [todos, setTodos] = useState<any>();
  const [title, setTitle] = useState<any>();
  const [descr, setDescr] = useState<any>();
  const [priority, setPriority] = useState<any>('Low');

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
          id: todos.length ? todos[todos.length - 1].id + 1 : 1,
          // id: todos.length + 1,
          title: title,
          description: descr,
          isCompleted: false,
          priorityLevel: priority
        }
      ]);
    },
    [title, descr, priority, todos]
  );

  useEffect(() => {
    setTodos(todos);
    console.log(todos);
  }, [todos]);

  useEffect(() => {
    const data = localStorage.getItem('list');
    if (data) {
      setTodos(JSON.parse(data));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('list', JSON.stringify(todos));
  });

  const markComplete = useCallback(
    (todo: any, index) => (event: any) => {
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

  return (
    <div className="todos-wrapper">
      <div className="todos-wrapper__form">
        <form onSubmit={SubmitTodo}>
          <input onChange={addTitle} type="text" placeholder="Title" />
          <br />
          <input onChange={addDescr} type="text" placeholder="Description" />
          <br />
          <select onChange={addPriority}>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
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
            />
          ))}
      </div>
    </div>
  );
};
