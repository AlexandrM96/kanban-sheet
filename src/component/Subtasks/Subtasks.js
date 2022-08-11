import React from "react";
import { modalTaskItemCompleted } from "../../redux/action";
import { useDispatch } from 'react-redux';
import './Subtasks.css'
import { getByTitle } from "@testing-library/react";

export default function Subtasks(props) {

  const dispatch = useDispatch();
  
  const taskCompleted = (title) => {
    dispatch(modalTaskItemCompleted(title));
  };

  return (
    <div className='subtasks'>
      <div className={
        props.status === false ?
          'subtasks__container'
          :
          'subtasks__container__completed'
      }
      >
        <div className='subtasks__container-items'>
          {props.status === false ?
            <div
              onClick={()=>{taskCompleted(props.title)}}
              className='subtasks__container-items__button'
            >
              <img src='image/Задача выполнена (1).svg' alt='My tasks' />
            </div>
            :
            <div className='subtasks__container-items__button'>
              <img src='image/Задача выполнена.svg' alt='My tasks' />
            </div>
          }
          <div className='subtasks__container-items__item'>
            {props.title}
          </div>
        </div>
        <div className='subtasks__container-buttons'>
          <div className="subtasks__container-buttons__button">
            <img src='image/Иконка (1).svg' alt='user' />
          </div>
          <div className="subtasks__container-buttons__button">
            <img src='image/Пользователь (1).svg' alt='user' />
          </div>
        </div>
      </div>
    </div>
  );
}
