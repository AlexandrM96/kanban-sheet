import React, { useState } from "react";
import './SettingUpColumn.css';
import { useDispatch } from 'react-redux';
import { deleteCol } from "../../redux/action";
import { updateName, addStatus } from '../../redux/action';

export default function SettingUpColumn(props) {

    const dispatch = useDispatch();

    const [state, setState] = useState(() => {
        return {
            settingName: '',
            statusSettingName: false,
            statusSettingColumn: false
        }
    });

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
            dispatch(updateName(state.settingName, props.id));
            setState(prev => {
                return {
                    ...prev,
                    settingName: '',
                    statusSettingName: false,
                    statusSettingColumn: false
                }
            })
        }
    }

    const changeСolumnName = (props) => {
        if (state.settingName !== '') {
            dispatch(updateName(state.settingName, props.id));
            setState(prev => {
                return {
                    ...prev,
                    settingName: '',
                    statusSettingName: false,
                    statusSettingColumn: false
                }
            })
        }
        state.statusSettingName === false ?
            setState(prev => {
                return {
                    ...prev,
                    statusSettingName: true
                }
            })
            :
            setState(prev => {
                return {
                    ...prev,
                    statusSettingName: false
                }
            })

    }

    const deleteСolumn = (props) => {
        dispatch(deleteCol(props.id));
    }

    const clickSetting = () => {
        state.statusSettingColumn === false ?
            setState(prev => {
                return {
                    ...prev,
                    statusSettingColumn: true
                }
            })
            :
            setState(prev => {
                return {
                    ...prev,
                    statusSettingColumn: false
                }
            })
    }

    const addStatusInputNewItem = (props) => {
        dispatch(addStatus(props.id));
    }

    return (
        <div className='setting-up-column'>
            <div className="setting-up-column__container-column-title">
                <div>
                    {state.statusSettingName === false ?
                        <h4>{props.title}</h4>
                        :
                        < input
                            className="setting-up-column__container-column-title__input"
                            type="settingName"
                            id="settingName"
                            name="settingName"
                            value={state.title}
                            onKeyDown={onKeyDown}
                            onChange={changeInput}
                            placeholder="новое имя..."
                        />
                    }
                </div>
                <div className="setting-up-column__container-column-title__buttons" >
                    <div onClick={() => { addStatusInputNewItem(props) }} className="setting-up-column__container-column-title__button" >
                        <img src='image/Vector (1).svg' alt='+' />
                    </div>
                    <div
                        onClick={clickSetting}
                        className="setting-up-column__container-column-title__button" >
                        <img src='image/Настройки столбика.svg' alt='...' />
                    </div>
                </div>
            </div>
            <div className={state.statusSettingColumn === false ?
                'setting-up-column__setting-none'
                :
                'setting-up-column__setting'}
            >
                <div onClick={() => { changeСolumnName(props) }}>Изменить имя</div>
                <div onClick={() => { deleteСolumn(props) }}>Удалить столбец</div>
            </div>
        </div>
    );
}


