import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import './AddItemBranch.css';
import { addBranchItem } from "../../redux/action";

export default function AddItemBranch(props) {

    const dispatch = useDispatch();

    const [state, setState] = useState(() => {
        return {
            addItemBranch: '',
            statusChange: false
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
            dispatch(addBranchItem(state.addItemBranch, props));
            setState(prev => {
                return {
                    ...prev,
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

    return (
        <div className='add-item-branch'>
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
            <div className="add-item-branch__container-item-button">
                <button onClick={clickStatusChange}>+ Добавить подзадачу</button>
            </div>
        </div>
    );
}
