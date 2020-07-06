import React from 'react';
import './styles.scss'
import { TodosMain } from './ui/organism/TodosMain/TodosMain';

export const App:React.FC = () => {
  return (
    <div className="App">
      <TodosMain />
    </div>
  )
}
