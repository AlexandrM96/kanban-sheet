import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from 'react-redux';
import BranchItem from "../BranchItem/BranchItem";
import { removeItem, taskCompl, updateArray, openModal, addColumn, stopTask } from '../../redux/action';
import AddItemKanban from "../AddItemKanban/AddItemKanban";
import SettingUpColumn from "../SettingUpColumn/SettingUpColumn";
import "./Board.css";

export default function Board() {

  const array = useSelector((state) => state.data);

  const favorits = useSelector((state) => state.nameBoard);

  const status = useSelector((state) => state.statusNewItem);

  const dispatch = useDispatch();

  const [boards, setBoards] = useState(array);

  const [modalStatus, setModalstatus] = useState(() => {
    return {
      statusModal: false
    }
  });

  const [state, setState] = useState(() => {
    return {
      column: ''
    }
  })

  useEffect(() => {
    setBoards(array)
  },
  );

  const [currentBoard, setCurrentBoard] = useState(null);

  const [currentItem, setCurrentItem] = useState(null)

  function dragStartHandler(e, board, item) {
    setCurrentBoard(board);
    setCurrentItem(item);
  }

  function dragEndHandler(e) {
  }

  function dragHandler(e) {
    e.preventDefault();
  }

  function dragOverHandler(e) {
    e.preventDefault();
  }

  function dropHandler(e, board, item) {
    e.preventDefault();
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1)
    const dropIndex = board.items.indexOf(item);
    board.items.splice(dropIndex + 1, 0, currentItem)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    dispatch(updateArray(boards));
  }

  function dropCardHandler(e, board) {
    board.items.push(currentItem);
    const currentIndex = currentBoard.items.indexOf(currentItem);
    currentBoard.items.splice(currentIndex, 1)
    setBoards(boards.map(b => {
      if (b.id === board.id) {
        return board
      }
      if (b.id === currentBoard.id) {
        return currentBoard
      }
      return b
    }))
    dispatch(updateArray(boards));
  }

  const clickRemoveItem = (item, board) => {
    dispatch(removeItem(board.id, item.id));
  }

  const taskCompleted = (item, board) => {
    const lastData = new Date().toLocaleDateString();
    dispatch(taskCompl(item.id, board.id, lastData));
  }

  const open = (item, board) => {
    modalStatus.statusModal === false ?
      setModalstatus(prev => {
        return {
          ...prev,
          statusModal: true
        }
      }, dispatch(openModal(item, board, status)))
      :
      setModalstatus(prev => {
        return {
          ...prev,
          statusModal: false
        }
      })
    dispatch(openModal(item, board, status));
  }

  const clickAddColumn = () => {
    dispatch(addColumn(state.column));
  }

  return (
    <div className="board">
      <div className="board__container">
        {boards && boards.filter((board) =>
          board.favorits === favorits
        ).map(board =>
          <div
            key={board.id}
            onDragOver={(e) => dragOverHandler(e)}
            onDrop={(e) => dropCardHandler(e, board)}
            className="board__container-column"
          >
            <SettingUpColumn {...board} />
            {board.items && board.items.map(item =>
              <div
                key={item.id}
                className={
                  item.status === false ?
                    "board__container-column-item"
                    :
                    "board__container-column-item-completed"
                }
                onDragStart={(e) => dragStartHandler(e, board, item)}
                onDragLeave={(e) => dragEndHandler(e)}
                onDragEnd={(e) => dragHandler(e)}
                onDragOver={(e) => dragOverHandler(e)}
                onDrop={(e) => dropHandler(e, board, item)}
                draggable={true}
              >
                <div className="board__container-item__title-remove">
                  <div className="board__container-item-title">
                    {item.status === false ?
                      <div onClick={() => { taskCompleted(item, board) }}>
                        <img src='image/Задача выполнена (1).svg' alt='My tasks' />
                      </div>
                      :
                      <div>
                        <img src='image/Задача выполнена.svg' alt='My tasks' />
                      </div>
                    }
                    <h5
                      onClick={() => { open(item, board, true) }}
                    >
                      {item.title}
                    </h5>
                  </div>
                  <div className="board__container-item-remove">
                    <button onClick={() => { clickRemoveItem(item, board) }}>X</button>
                  </div>
                </div>
                <BranchItem item={item} board={board} />
              </div>
            )}
            {board.statusNewItem === false ?
              !<AddItemKanban { ...board } />
              :
              <AddItemKanban {...board} />
            }
          </div>
        )}
        <div className="board__container__column-phantom">
          <div className='kanban-addlist_button'>
            <button
              onClick={clickAddColumn}
            >
              + Добавить столбец
            </button>
          </div>
        </div>
      </div>
    </div >
  )
}
