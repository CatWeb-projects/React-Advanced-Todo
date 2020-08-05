import React, { useState, useCallback, useContext } from 'react';
import { TodoItem } from 'ui/atoms/TodosItem/TodoItem';
import dayjs from 'dayjs';
import { v4 as uuid } from 'uuid';
import { Context } from 'Context/Context';

export const TodosList = () => {
  const {
    todos,
    setTodos,
    categories,
    categoryName,
    setCategoryName,
    filteredCategory,
    newFilterTodoTask
  } = useContext(Context);

  const [title, setTitle] = useState('');
  const [descr, setDescr] = useState('');
  const [priority, setPriority] = useState('low');

  const addTime = () => {
    const newDate = new Date();
    const fromNow = dayjs(newDate).format('MMM D, YYYY h:mm:ss A');
    return fromNow;
  };

  const addCategoryName = (e: any) => {
    setCategoryName(e.target.value);
  };

  const SubmitTodo = useCallback(
    (e) => {
      e.preventDefault();
      if (title === '') {
        return null;
      }
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

  const markComplete = useCallback((id) => {
    setTodos((prevNewTodos) =>
      prevNewTodos.map((todo) => ({
        ...todo,
        isCompleted: todo.id === id ? !todo.isCompleted : todo.isCompleted
      }))
    );
  }, []);

  const editTodo = useCallback(
    (id) => (e: any) => {
      e.preventDefault();
      setTodos((prevNewTodos) =>
        prevNewTodos.map((todo: any) =>
          todo.id === id
            ? {
                id: id,
                title: title,
                description: descr,
                priorityLevel: priority,
                name: categoryName,
                updatedAt: addTime()
              }
            : todo
        )
      );
      setTitle('');
      setDescr('');
    },
    [title, descr, priority, categoryName, addTime(), todos]
  );

  const deleteTodo = useCallback(
    (id) => {
      setTodos((prevTodos) =>
        prevTodos.filter((otherTodo) => otherTodo.id !== id)
      );
    },
    [todos]
  );

  const priorities: any = {
    low: 1,
    medium: 2,
    high: 3
  };
  const sortedTodos = todos.sort((a, b) => {
    return priorities[b.priorityLevel] - priorities[a.priorityLevel];
  });

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
              categories.map((item) => (
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
        {(filteredCategory ? newFilterTodoTask : todos).map((todo) => (
          <TodoItem
            todoProps={todo}
            key={todo.id}
            deleteTodoProp={deleteTodo}
            markCompleteProp={markComplete}
            newDateProp={todo.updatedAt}
            editTodoProp={editTodo(todo.id)}
          />
        ))}
      </div>
    </div>
  );
};
