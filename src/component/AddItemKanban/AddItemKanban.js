import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import './AddItemKanban.css';
import { addItem } from "../../redux/action";

export default function AddItemKanban(props) {

    const dispatch = useDispatch();

    const [state, setState] = useState(() => {
        return {
            addItem: ''
        }
    })

    const changeInput = event => {
        event.persist()
        setState(prev => {
            return {
                ...prev,
                [event.target.name]: event.target.value,
            }
        })
    }

    const onKeyDown = event => {
        if (event.keyCode === 13) {
            dispatch(addItem(state.addItem, props.id));
            setState(prev => {
                return {
                    ...prev,
                    addItem: ''
                }
            })
        }
    }


    return (
        <div className='add-item-Kanban'>
            <div className="add-item-Kanban__container-item-add">
                < input
                    className="add-item-Kanban__container-item-add__input"
                    type="addItem"
                    id="addItem"
                    name="addItem"
                    onChange={changeInput}
                    onKeyDown={onKeyDown}
                    value={state.addItem}
                    placeholder="Напишите название задачи..."
                />
                <img src='image/Пользователь.svg' alt='User' />
            </div>
        </div>
    );
}
