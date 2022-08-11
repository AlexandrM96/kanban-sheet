import React, { useEffect, useState } from "react";
import AddItemBranch from "../AddItemBranch/AddItemBranch";
import { taskComplItemBranch, timer } from "../../redux/action";
import { useSelector, useDispatch } from 'react-redux';
import 'moment-timezone';
import moment from 'moment';
import './BranchItem.css';

export default function BranchItem(props) {

    const [branchStatus, setBranchStatus] = useState(() => {
        return {
            status: false
        }
    });

    const dispatch = useDispatch();

    // const [counterSecond, setCounterSecond] = useState(props.item.timerStart);
    // const [counter, setCounter] = useState(120);
    // const [status, setStatus] = useState(props.item.statusTime);

    // const newData = Math.round(Date.now() / 1000);

    // useEffect(() => {
    //     setCounterSecond(props.item.timerStart)
    //     if (props.item.status === true && props.item.timerStart !== 0 && props.item.timerStart) {
    //         setCounterSecond(props.item.timerStop - props.item.timerStart);
    //     } else {
    //         if (props.item.timerStart !== 0) {
    //             setCounterSecond(newData - props.item.timerStart);
    //             setStatus("working");
    //         }
    //         let secondCounterId;
    //         let counterId;
    //         if (status === "working" && props.item.status !== true) {
    //             secondCounterId = setTimeout(
    //                 () => setCounterSecond(newData - props.item.timerStart),
    //                 1000
    //             );
    //             dispatch(timer(counterSecond));
    //             counterId = setTimeout(() => setCounter(counter - 1), 1000)
    //         }

    //         return () => {
    //             clearTimeout(counterId);
    //             clearTimeout(secondCounterId);
    //         };
    //     }
    // }, [counterSecond, counter, status]);

    // const stopTimers = () => {
    //     setStatus("stop");
    // };

    // const resume = () => {
    //     if (status !== "stop") {
    //         setStatus("working");
    //     }
    // };

    const clickBranch = () => {
        branchStatus.status === false ?
            setBranchStatus(prev => {
                return {
                    ...prev,
                    status: true,
                }
            })
            :
            setBranchStatus(prev => {
                return {
                    ...prev,
                    status: false,
                }
            })
    }

    const taskCompleted = (props, branch) => {
        dispatch(taskComplItemBranch(props, branch.title));
    }

    return (
        <div className='branch-item'>
            <div className="branch-item__container-item-items">
                <div className="branch-item__container-items__user-time">
                    <div className="branch-item__container-items__user-time__image">
                        <img src='image/image 1.svg' alt='logo' />
                    </div>
                    <div className="branch-item__container-items__user-time__paragraph-block">
                        {props.item.time === 0 && props.item.deadlineTimeHour === 0 ?
                            ''
                            :
                            <p className="branch-item__paragraph-block__paragraph">
                                {`${props.item.time === 0 ?
                                    ''
                                    :
                                    props.item.time <= 60 ?
                                        moment.utc(props.item.time * 1000).format('sс /')
                                        :
                                        props.item.time <= 3600 ?
                                            moment.utc(props.item.time * 1000).format('mм sс /')
                                            :
                                            moment.utc(props.item.time * 1000).format('hч mм sс /')} `
                                }{props.item.time > (props.item.deadlineTimeHour * 3600) ?
                                    <span>{props.item.deadlineTimeHour} ч.</span>
                                    :
                                    `${props.item.deadlineTimeHour} ч.`
                                }
                            </p>
                        }
                        <p className={
                            new Date(props.item.deadlineTime) < new Date() || props.item.deadlineTime === undefined ?
                                "branch-item__paragraph-block__paragraph-date"
                                :
                                "branch-item__paragraph-block__paragraph-date__true"
                        }
                        >
                            {
                                props.item.deadlineTime === undefined || NaN ?
                                    ''
                                    :
                                    `до ${new Date(props.item.deadlineTime).toLocaleDateString()}`
                            }
                        </p>
                    </div>
                </div>
                <div>
                    <div
                        onClick={clickBranch}
                        className="branch-item__items__branches">
                        <p>{props.item.items.length}</p>
                        <img src='image/Frame (2).svg' alt='Branches' />
                    </div>
                    <div></div>
                </div>
            </div>
            <div className={branchStatus.status === false ?
                "branch-item__items__branches-items-none"
                :
                "branch-item__items__branches-items"}>
                {props.item.items && props.item.items.map(branch =>
                    <div
                        key={branch.id}
                        className={
                            branch.status === false ?
                                "branch-item__item"
                                :
                                "branch-item__item-completed"}
                    >
                        <div className="branch-item__item-name">
                            {branch.status === false ?
                                <div onClick={() => { taskCompleted(props, branch) }}>
                                    <img src='image/Задача выполнена (1).svg' alt='My tasks' />
                                </div>
                                :
                                <div>
                                    <img src='image/Задача выполнена.svg' alt='My tasks completed' />
                                </div>
                            }
                            <p>{branch.title}</p>
                        </div>
                        <div>
                            <img src='image/image 2.svg' alt='user' />
                        </div>
                    </div>
                )}
                <div>
                    <AddItemBranch {...props} />
                </div>
            </div>
        </div>
    );
}
