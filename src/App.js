import React from 'react';
import './App.css'
import Main from './component/Main/Main';
import { useDispatch } from 'react-redux';
import { addDataLocalStorage } from './redux/action';

export default function App() {

  const dispatch = useDispatch();

  const data = JSON.parse(localStorage.getItem("data"));

  dispatch(addDataLocalStorage(data));

  return (
    <main className='app'>
      <Main />
    </main>
  );
}


