import React, { useState, useEffect, useCallback } from 'react';
import { TodoItem } from '../../atoms/TodosItem/TodoItem';

interface Todos {
  id: number;
  title: string;
  description: string;
  isCompleted: boolean;
  priorityLevel: string;
}

export const TodosList = (props: any) => {
  const [todos, setTodos] = useState<any>([]);
  const [title, setTitle] = useState<any>();
  const [descr, setDescr] = useState<any>();
  const [priority, setPriority] = useState<any>('Low');

  const addTitle = useCallback((e: any) => {
    setTitle(e.target.value);
  }, []);

  const addDescr = useCallback((e: any) => {
    setDescr(e.target.value);
  }, []);

  const addPriority = useCallback((e: any) => {
    setPriority(e.target.value);
  }, []);

  const addTodo = useCallback(
    (e: any) => {
      e.preventDefault();
      setTodos([
        {
          id: todos.length ? todos[0].id + 1 : 1,
          title: title,
          description: descr,
          isCompleted: false,
          priorityLevel: priority
        },
        ...todos
      ]);
      setTitle(title);
      setDescr(descr);
      setPriority(priority);
      // if (priority === 'High' || (todos.length) == todos[0].id) {
      //   console.log(todos.length)
      //   console.log(todos[0].id)
      // }
    },
    [title, descr, priority, todos]
  );

  const deleteTodo = useCallback(
    (todo) => (e: any) => {
      setTodos(todos.filter((otherTodo: any) => otherTodo !== todo));
      console.log(todos);
    },
    [todos]
  );

  useEffect(() => {
    setTodos(todos);
    console.log(todos);
  }, [todos]);

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
              key={todo.id}
              deleteTodoProp={deleteTodo(todo)}
            />
          ))}
      </div>
    </div>
  );
};
