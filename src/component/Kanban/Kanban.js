import React from 'react';
import './Kanban.css';
import Board from '../Board/Board';
import TaskWindow from '../TaskWindow/TaskWindow';
import ModalOverlay from '../modal-overlay/modal-overlay.jsx';
import { useSelector } from 'react-redux';

export default function Kanban() {

    const statusModal = useSelector((state) => state.modalStatus);

    const lastTask = useSelector((state) => state.theLastTask);
    
    return (
        <div className='kanban'>
            <div className='kanban__container'>
                <div className={
                    statusModal === null ?
                        'kanban__container__title-filter-sort'
                        :
                        'kanban__container__title-filter-sort__open-modal'
                }>
                    <div className='kanban__title'>
                        <h4>Последняя задача выполнена {lastTask}</h4>
                    </div>
                    {statusModal === null ?
                        <div className='kanban__title-filter-sort'>
                            <div>
                                <img src='image/Икнока.svg' alt='filtr' />
                                <p>Фильрация</p>
                            </div>
                            <div>
                                <img src='image/Икнока (1).svg' alt='sort' />
                                <p>Сортировка</p>
                            </div>
                        </div>
                        :
                        <div>
                            <TaskWindow />
                            <ModalOverlay />
                        </div>
                    }
                </div>
                <div className='kanban__container__kanban'>
                    <div className='kanban__container__kanban-list'>
                        <Board />
                    </div>
                </div>
            </div>
        </div>
    );
}

