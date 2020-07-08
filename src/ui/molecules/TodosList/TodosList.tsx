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
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<any>();
  const [descr, setDescr] = useState<any>();
  const [priority, setPriority] = useState<any>('Low');

  // useEffect(() => {
  //   setTodos(todos);
  //   console.log(todos);
  // }, [todos]);

  const addTitle = (e: any) => {
    setTitle(e.target.value);
  };

  const addDescr = (e: any) => {
    setDescr(e.target.value);
  };

  const addPriority = (e: any) => {
    setPriority(e.target.value);
  };

  const addTodo = useCallback(
    (e: any) => {
      e.preventDefault();
      setTodos([
        {
          id: todos.length ? todos[0].id + 1 : 1,
          // id: uuidv5,
          title: title,
          description: descr,
          isCompleted: false,
          priorityLevel: priority
        },
        ...todos
      ]);
      console.log(todos);
    },
    [title, descr, priority, todos]
  );

  const deleteTodo = useCallback(
    (todo) => (e: any) => {
      setTodos((prevTodos: any[]) =>
        prevTodos.filter((otherTodo: any) => otherTodo !== todo)
      );
    },
    [todos]
  );

  const markComplete = useCallback(
    (id) => (e: Todos) => {
      setTodos((prevTodos: any[]) =>
        prevTodos.map((todo: any) =>
          todo.id === id ? (todos.todo = !todos.todo) : todos.todo
        )
      );
    },
    [todos]
  );

  return (
    <div className="todos-wrapper">
      <div className="todos-wrapper__form">
        <form onSubmit={addTodo}>
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
          todos.map((todo: Todos) => (
            <TodoItem
              todoProps={todo}
              key={[todo.id, console.log(todo.id)]}
              deleteTodoProp={deleteTodo(todo)}
              markCompleteProp={markComplete(todo.id)}
            />
          ))}
      </div>
    </div>
  );
};
