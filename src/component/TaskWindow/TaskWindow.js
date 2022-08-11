import React, { useEffect, useState } from "react";
import Subtasks from '../Subtasks/Subtasks';
import { useSelector, useDispatch } from 'react-redux';
import { addBranchItem, AddСommentUser, stopTask, closeModal, addTimerModalBranch, addItemDate, addDescriptionItem, timer } from "../../redux/action";
import Comment from '../Comment/Comment';
import 'moment-timezone';
import moment from 'moment';
import './TaskWindow.css';

export default function TaskWindow(props) {

  const [state, setState] = useState(() => {
    return {
      addItemBranch: '',
      addComment: '',
      addTimeBranch: '',
      addDescription: '',
      statusChange: false
    }
  })
  const dispatch = useDispatch();

  const modalArr = useSelector((state) => state.modalArray[0]);

  const statusModal = useSelector((state) => state.modalStatus);

  const [counterSecond, setCounterSecond] = useState(modalArr.timerStart);
  const [counter, setCounter] = useState(120);
  const [status, setStatus] = useState(modalArr.statusTime);

  const newData = Math.round(Date.now() / 1000);

  useEffect(() => {
    if (modalArr.status === true && modalArr.timerStart !== 0 && modalArr.timerStart) {
      setCounterSecond(modalArr.timerStop - modalArr.timerStart);
    } else {
      if (modalArr.timerStart !== 0) {
        setCounterSecond(newData - modalArr.timerStart);
        setStatus("working");
      }
      let secondCounterId;
      let counterId;
      if (status === "working" && modalArr.status !== true) {
        secondCounterId = setTimeout(
          () => setCounterSecond(newData - modalArr.timerStart),
          1000
        );
        dispatch(timer(counterSecond));
        counterId = setTimeout(() => setCounter(counter - 1), 1000)
      }

      return () => {
        clearTimeout(counterId);
        clearTimeout(secondCounterId);
      };
    }
  }, [counterSecond, counter, status]);

  const stopTimers = () => {
    setStatus("stop");
  };

  const resume = () => {
    if (status !== "stop") {
      setStatus("working");
    }
  };

  const changeInput = event => {
    event.persist()
    setState(prev => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      }
    })
  }

  const changeDate = event => {
    setState(prev => {
      return {
        ...prev,
        addTimeBranch: event.target.value
      }
    })
    const one = new Date(state.addTimeBranch)
    const two = new Date();
    const diff = one.getTime() - two.getTime();
    let msec = diff;
    const hh = Math.floor(msec / 1000 / 60 / 60);
    msec -= hh * 1000 * 60 * 60;
    const mm = Math.floor(msec / 1000 / 60);
    msec -= mm * 1000 * 60;
    const ss = Math.floor(msec / 1000);
    msec -= ss * 1000;

    dispatch(addItemDate(hh, state.addTimeBranch));
  }

  const onKeyDown = event => {
    if (event.keyCode === 13 && state.addComment !== '') {
      dispatch(AddСommentUser(state.addComment, newData));
      setState(prev => {
        return {
          ...prev,
          addComment: ''
        }
      })
    }
    if (event.keyCode === 13 && state.addDescription !== '') {
      dispatch(addDescriptionItem(state.addDescription))
      setState(prev => {
        return {
          ...prev,
          addDescription: '',
        }
      })
    }
    if (event.keyCode === 13 && state.addItemBranch !== '') {
      dispatch(addBranchItem(state.addItemBranch, props));
      setState(prev => {
        return {
          ...prev,
          addBranchItem: '',
          addItemBranch: ''
        }
      })
    }
  }

  const clickStatusChange = () => {
    if (state.addItemBranch !== '') {
      dispatch(addBranchItem(state.addItemBranch, props));
      setState(prev => {
        return {
          ...prev,
          addItemBranch: ''
        }
      })
    }
    state.statusChange === false ?
      setState(prev => {
        return {
          ...prev,
          statusChange: true
        }
      })
      :
      setState(prev => {
        return {
          ...prev,
          statusChange: false
        }
      })
  }

  const addComment = () => {
    if (state.addComment !== '') {
      dispatch(AddСommentUser(state.addComment, newData))
      setState(prev => {
        return {
          ...prev,
          addComment: ''
        }
      })
    }
  }

  const taskCompleted = () => {
    if (modalArr.status === true && modalArr.timerStart !== 0 && modalArr.timerStop !== 0) {
      return
    } else {
      const lastData = new Date().toLocaleDateString();
      dispatch(stopTask(newData, lastData));
      stopTimers();
    }
  }

  const startTimer = () => {
    if (modalArr.status === true && modalArr.timerStart !== 0 && modalArr.timerStop !== 0) {
      return
    } else {
      resume();
      dispatch(addTimerModalBranch(newData));
    }
  }

  const close = () => {
    if (statusModal === true) {
      dispatch(closeModal(null));
    }
  }
  const timeClick = () => {
    !state.flag ?
      setState(prev => {
        return {
          ...prev,
          flag: true
        }
      })
      :
      setState(prev => {
        return {
          ...prev,
          flag: false
        }
      })
  }

  let seconds = parseInt((counterSecond), 10);

  const days = Math.floor(seconds / (3600 * 24));

  seconds -= days * 3600 * 24;

  const hrs = Math.floor(seconds / 3600);

  seconds -= hrs * 3600;

  const mnts = Math.floor(seconds / 60);

  seconds -= mnts * 60;

  return (
    <div className='task-windows' >
      <div className='task-windows__container' onClick={e => e.stopPropagation()}>
        <div className='task-windows__container__start-stop'>
          <div className='task-windows__start'>
            <div onClick={() => { startTimer() }} className='task-windows__start-button'>
              <img src='image/play.svg' alt='play' />
              <span>Работать над задачей</span>
            </div>
            <div className='task-windows__start-time'>
              {counterSecond <= 60 ?
                moment.utc(counterSecond * 1000).format('sс. ')
                :
                counterSecond <= 3600 ?
                  moment.utc(counterSecond * 1000).format('mм sс. ')
                  :
                  counterSecond <= 216000 ?
                    moment.utc(counterSecond * 1000).format('h ч m мин. ')
                    :
                    counterSecond <= 5184000 ?
                      `${days} д ${mnts} ч.`
                      :
                      `${days} д ${mnts} ч.`
              }/{modalArr.time > (modalArr.deadlineTimeHour * 3600)  ?
                <span> {modalArr.deadlineTimeHour} ч. </span>
                :
                ` ${modalArr.deadlineTimeHour} ч.`
              }
            </div>
          </div>
          <div className='task-windows__stop'>
            <div
              onClick={() => { taskCompleted(props, modalArr) }}
              className='task-windows__stop-button'
            >
              <img src='image/ok.svg' alt='ok' />
              <span>Завершить задачу</span>
            </div>
            <div className='task-windows__stop-button__kopy'>
              <img src='image/копировать.svg' alt='kopy' />
            </div>
            <div
              onClick={close}
              className='task-windows__stop-button__collapse'
            >
              <img src='image/свернуть.svg' alt='collapse' />
            </div>
          </div>
        </div>
        <div className='task-windows__container__task-item'>
          <h3 className='task-item__title'>{modalArr.title}</h3>
          <div className='task-item__info'>
            <table>
              <thead></thead>
              <tbody>
                <tr>
                  <td>Исполнитель</td>
                  <th>
                    <img src='image/image 1.svg' alt='user' />
                    <span>Никита Хаецкий</span>
                  </th>
                </tr>
                <tr>
                  <td>Даты</td>
                  {
                    modalArr.deadlineTime === 0 ?
                      <th className="task-item__info-time">
                        {modalArr.deadlineTime}
                      </th>
                      :
                      <th className="task-item__info-time" onClick={timeClick}>
                        < input
                          className="task-item__info-date__input"
                          type="datetime-local"
                          id="addTimeBranch"
                          name="addTimeBranch"
                          onChange={changeDate}
                        />
                      </th>
                  }
                </tr>
                <tr>
                  <td>Проект</td>
                  <th>Добавить проект</th>
                </tr>
                <tr>
                  <td>Описание</td>
                  <th className="task-item__info-description">
                    {modalArr.description === '' ?
                      < input
                        className="task-item__info-input"
                        type="addDescription"
                        id="addDescription"
                        name="addDescription"
                        onChange={changeInput}
                        onKeyDown={onKeyDown}
                        value={state.addDescription}
                        placeholder="Добавить описание к этой задаче..."
                      />
                      :
                      modalArr.description
                    }
                  </th>
                </tr>
              </tbody>
              <tfoot></tfoot>
            </table>
          </div>
        </div>
        <div className='task-windows__container__task-subtasks'>
          <h4 className='task-subtasks__title'>Подзадачи</h4>
          <div className='task-windows__container__task-subtasks__items'>
            {modalArr.items && modalArr.items.map(item =>
              <div
                key={item.id}
                className='task-windows__container__task-subtasks__item'>
                <Subtasks {...item} />
              </div>
            )}
          </div>
          <div className={state.statusChange === false ?
            "add-item-branch__container-item-add-none"
            :
            "add-item-branch__container-item-add"}
          >
            < input
              className="add-item-branch__container-item-add__input"
              type="addItemBranch"
              id="addItemBranch"
              name="addItemBranch"
              onChange={changeInput}
              onKeyDown={onKeyDown}
              value={state.addItemBranch}
              placeholder="Введите название..."
            />
            <div className="add-item-branch__container-item-add__img">
              <img src='image/Иконка (1).svg' alt='user' />
            </div>
            <div className="add-item-branch__container-item-add__img">
              <img src='image/Пользователь (1).svg' alt='User' />
            </div>
          </div>
          <div className="task-window__container-task-button">
            <button
              onClick={clickStatusChange}
            >+ <span>Добавить подзадачу</span></button>
          </div>
        </div>
        <div className='task-windows__container__task-comments'>
          {modalArr.comments && modalArr.comments.map(item =>
            <div key={item.id}>
              <Comment  {...item} />
            </div>
          )}
        </div>
        <div className='task-windows__container__task-comment'>
          <div className='task-comment__container'>
            <div className='task-comment__container__image'>
              <img src='image/image 1.svg' alt='user' />
            </div>
            <div className='task-comment__container__input'>
              < input
                className='task-comment__container__input-input'
                type="addComment"
                id="addComment"
                name="addComment"
                onChange={changeInput}
                onKeyDown={onKeyDown}
                value={state.addComment}
                placeholder="Задайте вопрос или напишите комментарий..."
              />
              <div className='task-comment__container__button-image'
                onClick={addComment}
              >
                <img src='image/addKom.svg' alt='user' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

