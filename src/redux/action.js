import { lastDayOfQuarter } from "date-fns";

export function updateArray(array) {
    return {
        type: 'UPDATE_ARRAY',
        payload: {
            array: array
        }
    };
}

export function addColumn(column) {
    return {
        type: 'NEW_COLUMN',
        payload: {
            column: column
        }
    };
}

export function addItem(item, id) {
    return {
        type: 'NEW_ITEM',
        payload: {
            item: item,
            id: id
        }
    };
}

export function removeItem(columnId, itemId) {
    return {
        type: 'REMOVE_ITEM',
        payload: {
            columnId: columnId,
            itemId: itemId
        }
    };
}


export function addBranchItem(item, branchItem) {
    return {
        type: 'NEW_ITEM_ITEM',
        payload: {
            item: item,
            branchItem: branchItem
        }
    };
}

export function addDataLocalStorage(data) {
    return {
        type: 'ADD_DATA_LOCAL_STORAGE',
        payload: {
            data: data
        }
    };
}

export function deleteCol(id) {
    return {
        type: 'DELETE_COLUMN',
        payload: {
            id: id
        }
    };
}

export function updateName(name, id) {
    return {
        type: 'UPDATE_NAME_COLUMN',
        payload: {
            name: name,
            id: id
        }
    };
}

export function addStatus(id) {
    return {
        type: 'UPDATE_STATUS',
        payload: {
            id: id
        }
    };
}

export function taskCompl(idItem, idBoard, lastTime) {
    return {
        type: 'TASK_COMPLETED',
        payload: {
            idItem: idItem,
            idBoard: idBoard,
            lastTime: lastTime
        }
    };
}

export function taskComplItemBranch(item, name) {
    return {
        type: 'TASK_COMPLETED_ITEM_BRANCH',
        payload: {
            item: item,
            name: name
        }
    };
}

export function openModal(item, board) {
    return {
        type: 'OPEN_MODAL',
        payload: {
            modal: item,
            branchItem: { item, board },
            modalStatus: true
        }
    };
}

export function closeModal(status) {
    return {
        type: 'CLOSE_MODAL',
        payload: {
            modalStatus: status
        }
    };
}

export function AddСommentUser(item, data) {
    return {
        type: 'ADD_COMMENT',
        payload: {
            comment: item,
            data: data
        }
    };
}

export function stopTask(time,timeTwo) {
    return {
        type: 'STOP_TASK',
        payload: {
            stopTime: time,
            lastDate: timeTwo
        }
    };
}

export function modalTaskItemCompleted(title) {
    return {
        type: 'MODAL_TASK_ITEM_COMPLETED',
        payload: {
            title: title
        }
    };
}

export function addTimerModalBranch(time) {
    return {
        type: 'ADD_TIMER_MODAL_BRANCH',
        payload: {
            time: time
        }
    };
}

export function addTimeComment(time, id) {
    return {
        type: 'ADD_TIME_COMMENT',
        payload: {
            time: time,
            commentId: id
        }
    };
}

export function addItemDate(timeHour, time) {
    return {
        type: 'ADD_TIME_ITEM',
        payload: {
            timeH: timeHour,
            time: time

        }
    };
}


export function addDescriptionItem(description) {
    return {
        type: 'ADD_DESCRIPTION_ITEM',
        payload: {
            description: description

        }
    };
}

export function timer(timer) {
    return {
        type: 'TIMER',
        payload: {
            timer: timer

        }
    };
}

export function nameBoard(name) {
    return {
        type: 'NAME_BOARD',
        payload: {
            name: name

        }
    };
}

export function addPhantomColumn(res) {
    return {
        type: 'ADD_PHANTOM-COLUMN',
        payload: {
            flag: res

        }
    };
}

export function changingTheTimerStatus(status) {
    return {
        type: 'CHANGING_THE_TIMER_STATUS',
        payload: {
            status: status

        }
    };
}
