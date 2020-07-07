import React, { useState, useCallback, useEffect } from 'react';
import { TodosList } from '../../molecules/TodosList/TodosList';

export const TodosMain: any = () => {
  return (
    <div className="main-container">
      <TodosList />
    </div>
  );
};
