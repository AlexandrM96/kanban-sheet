const initialState = {
    data: [],
    modalArray: [],
    modalStatus: null,
    itemBranch: {},
    newIdTask: 0,
    nameBoard: 'Электротовары',
    theLastTask: '',
    listFavourites: [
        { name: 'Электротовары', id: 1 },
        { name: 'Лесхозснаб', id: 2 },
        { name: 'Посуда-Сити', id: 3 },
        { name: 'Автошкола “Автолицей”', id: 4 },]
}

function reducer(state = initialState, action) {

    switch (action.type) {
        case 'ADD_DATA_LOCAL_STORAGE':
            const localStorageArr = action.payload.data;
            let newState = {
                data: [],
                modalArray: [],
                modalStatus: null,
                itemBranch: {},
                newIdTask: 0,
                nameBoard: 'Электротовары',
                theLastTask: '',
                listFavourites: [
                    { name: 'Электротовары', id: 1 },
                    { name: 'Лесхозснаб', id: 2 },
                    { name: 'Посуда-Сити', id: 3 },
                    { name: 'Автошкола “Автолицей”', id: 4 },]
            }
            localStorageArr === null ?
                state = newState
                :
                state = localStorageArr;
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, }
        case 'UPDATE_ARRAY':
            localStorage.clear();
            const newArr = action.payload.array;
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArr, }
        case 'NEW_COLUMN':
            localStorage.clear();
            const newColumn = action.payload.column;
            const nameFavorit = state.nameBoard;
            const id = state.data.length + 1;
            const newObj = {
                id: id,
                favorits: nameFavorit,
                title: newColumn,
                statusNewItem: false,
                time: 1,
                items: []
            };
            state.data.push(newObj);
            localStorage.setItem("data", JSON.stringify(state));
            const newData = [...state.data];
            return { ...state, data: newData }
        case 'NEW_ITEM':
            localStorage.clear();
            const idColumn = action.payload.id;
            const newItem = action.payload.item;
            // const dataId = state.data.find(item => item.id === idColumn).items.length
            const newId = state.newIdTask += 1;;
            const newObjItem = {
                id: newId,
                title: newItem,
                items: [],
                // время на задачу в днях
                time: 0,
                status: false,
                comments: [],
                //статус таймера
                statusTime: "paused",
                // время 
                timerStart: 0,
                // время конца задачи
                timerStop: 0,
                //время начала задачи
                addTime: 0,
                // время на задачу в часах
                deadlineTimeHour: 0,
                deatlineTime: 0,
                description: ''
            };
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === idColumn) {
                    state.data[i].statusNewItem = false;
                    state.data[i].items.push(newObjItem);
                }
            }
            const newDataTwo = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newDataTwo }
        case 'NEW_ITEM_ITEM':
            localStorage.clear();
            const item = action.payload.item
            const branch = action.payload.branchItem;
            if (JSON.stringify(branch) === '{}') {
                const idColumnTwo = state.itemBranch.board.id;
                const idBranch = state.itemBranch.item.id;
                const itemIdBranchItem = state.data.find(item => item.id === idColumnTwo).items.find(item => item.id === idBranch).items.length + 1;
                const newObjbranch = {
                    title: item,
                    status: false,
                    id: itemIdBranchItem
                };
                for (let i = 0; i < state.data.length; i++) {
                    if (state.data[i].id === idColumnTwo) {
                        state.data[i].items.find(item => item.id === idBranch).items.push(newObjbranch);
                    }
                }
            } else {
                state.itemBranch = branch;
                const idColumnTwo = state.itemBranch.board.id;
                const idBranch = state.itemBranch.item.id;
                const itemIdBranchItem = state.data.find(item => item.id === idColumnTwo).items.find(item => item.id === idBranch).items.length + 1;
                const newObjbranch = {
                    title: item,
                    status: false,
                    id: itemIdBranchItem
                };
                for (let i = 0; i < state.data.length; i++) {
                    if (state.data[i].id === idColumnTwo) {
                        state.data[i].items.find(item => item.id === idBranch).items.push(newObjbranch);
                    }
                }
            }
            const newDataThree = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newDataThree }
        case 'REMOVE_ITEM':
            localStorage.clear();
            const itemId = action.payload.itemId;
            const columnId = action.payload.columnId;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === columnId) {
                    state.data[i].items = state.data[i].items.filter(item => item.id !== itemId);
                }
            }
            const newDataFour = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newDataFour }
        case 'DELETE_COLUMN':
            localStorage.clear();
            const deleteСolumnId = action.payload.id;
            const newDataFive = [...state.data].filter((item) =>
                item.id !== deleteСolumnId);
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newDataFive }
        case 'UPDATE_NAME_COLUMN':
            localStorage.clear();
            const newColumnName = action.payload.name;
            const columnIdTwo = action.payload.id;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === columnIdTwo) {
                    state.data[i].title = newColumnName;
                }
            }
            const newDataSix = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newDataSix }
        case 'UPDATE_STATUS':
            localStorage.clear();
            const statusColumnId = action.payload.id;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === statusColumnId) {
                    state.data[i].statusNewItem === false ?
                        state.data[i].statusNewItem = true
                        :
                        state.data[i].statusNewItem = false;
                }
            }
            const newArray = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, statusNewItem: newArray }
        case 'TASK_COMPLETED':
            localStorage.clear();
            const taskCompletedId = action.payload.idItem;
            const taskCompletedIdBoard = action.payload.idBoard;
            const lastTime = action.payload.lastTime;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === taskCompletedIdBoard) {
                    state.data[i].items.find(item => item.id === taskCompletedId).status = true
                }
            }
            state.theLastTask = lastTime;
            const newArrayTwo = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArrayTwo }
        case 'TASK_COMPLETED_ITEM_BRANCH':
            localStorage.clear();
            const completedItemBranch = action.payload.item.board;
            const completedItem = action.payload.item.item;
            const name = action.payload.name;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === completedItemBranch.id) {
                    state.data[i].items.find(item => item.id === completedItem.id).items.find(item => item.title === name).status = true;
                }
            }
            const newArrayThree = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArrayThree }
        case 'OPEN_MODAL':
            localStorage.clear();
            if (state.modalStatus !== null) {
                state.modalArray = []
            }
            const branchItem = action.payload.branchItem;
            const modalStatus = action.payload.modalStatus;
            state.itemBranch = branchItem;
            const modal = action.payload.modal;
            const newModalArray = [...state.modalArray, modal];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, modalArray: newModalArray, modalStatus: modalStatus }
        case 'CLOSE_MODAL':
            localStorage.clear();
            const modalStatusTwo = action.payload.modalStatus;
            state.modalArray = [];
            state.modalStatus = modalStatusTwo;
            const closeModalArray = [...state.modalArray];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, modalArray: closeModalArray }
        case 'ADD_COMMENT':
            localStorage.clear();
            const dataComment = action.payload.data;
            const comment = action.payload.comment;
            const idColumnThree = state.itemBranch.board.id;
            const idBranch = state.itemBranch.item.id;
            const commentId = state.data.find(item => item.id === idColumnThree).items.find(item => item.id === idBranch).comments.length;
            const newObjComment = {
                name: 'Nick Khaetsky',
                comment: comment,
                id: commentId,
                timeHasPassed: dataComment
            };
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === idColumnThree) {
                    state.data[i].items.find(item => item.id === idBranch).comments.push(newObjComment);
                }
            }
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state }
        case 'STOP_TASK':
            localStorage.clear();
            const stopTime = action.payload.stopTime;
            const lastDate = action.payload.lastDate;
            const taskCompletedIdTwo = state.itemBranch.item.id;
            const taskCompletedIdBoardTwo = state.itemBranch.board.id;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === taskCompletedIdBoardTwo) {
                    state.data[i].items.find(item => item.id === taskCompletedIdTwo).status = true;
                    state.data[i].items.find(item => item.id === taskCompletedIdTwo).timerStop = stopTime;
                }
            }
            state.theLastTask = lastDate;
            const newArrayFour = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArrayFour }
        case 'MODAL_TASK_ITEM_COMPLETED':
            localStorage.clear();
            const modalTitleItem = action.payload.title;
            const modalTaskCompletedId = state.itemBranch.item.id;
            const modalTaskCompletedIdBoard = state.itemBranch.board.id;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === modalTaskCompletedIdBoard) {
                    state.data[i].items.find(item => item.id === modalTaskCompletedId).
                        items.find(item => item.title === modalTitleItem).status = true;
                }
            }
            state.modalArray.items.find(item => item.title === modalTitleItem).status = true;
            const newArrayFive = [...state.data];
            const newItemBranch = { ...state.modalArray }
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArrayFive, itemBranch: newItemBranch }
        case 'ADD_TIMER_MODAL_BRANCH':
            localStorage.clear();
            const itemTime = action.payload.time;
            const taskTimerIdTwo = state.itemBranch.item.id;
            const taskTimerIdBoardTwo = state.itemBranch.board.id;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === taskTimerIdBoardTwo) {
                    state.data[i].items.find(item => item.id === taskTimerIdTwo).timerStart = itemTime;
                }
            }
            const newArraySix = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArraySix }
        case 'ADD_TIME_COMMENT':
            localStorage.clear();
            const commentTime = action.payload.time;
            const taskCommentIdTwo = state.itemBranch.item.id;
            const taskCommentIdBoardTwo = state.itemBranch.board.id;
            const commentIdTwo = action.payload.commentId;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === taskCommentIdBoardTwo) {
                    state.data[i].items.find(item => item.id === taskCommentIdTwo).
                        comments.find(item => item.id === commentIdTwo).timeHasPassed = commentTime
                }
            }
            const newArraySeven = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArraySeven }
        case 'ADD_TIME_ITEM':
            localStorage.clear();
            const itemTimeTwo = action.payload.timeH;
            const itemTimeThree = action.payload.time;
            const taskId = state.itemBranch.item.id;
            const taskIdBoard = state.itemBranch.board.id;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === taskIdBoard) {
                    state.data[i].items.find(item => item.id === taskId).deadlineTimeHour = itemTimeTwo;
                    state.data[i].items.find(item => item.id === taskId).deadlineTime = itemTimeThree;
                }
            }
            const newArraySev = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArraySev }
        case 'ADD_DESCRIPTION_ITEM':
            localStorage.clear();
            const itemDescription = action.payload.description;
            const taskIdDescription = state.itemBranch.item.id;
            const taskIdBoardDescription = state.itemBranch.board.id;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === taskIdBoardDescription) {
                    state.data[i].items.find(item => item.id === taskIdDescription).description = itemDescription;
                }
            }
            const newArrayEight = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArrayEight }
        case 'TIMER':
            localStorage.clear(); //тут последняя правка локал
            const timer = action.payload.timer;
            const taskIdTimer = state.itemBranch.item.id;
            const taskIdBoardTimer = state.itemBranch.board.id;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === taskIdBoardTimer) {
                    state.data[i].items.find(item => item.id === taskIdTimer).time = timer;
                }
            }
            const newArrayNine = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArrayNine }
        case 'NAME_BOARD':
            localStorage.clear();
            const nameBoard = action.payload.name;
            state.nameBoard = nameBoard;
            const newArrayTen = [...state.data, []];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArrayTen }
        case 'CHANGING_THE_TIMER_STATUS':
            localStorage.clear();
            const timerStatus = action.payload.status;
            const taskIdTimerStatus = state.itemBranch.item.id;
            const taskIdBoardTimerStatus = state.itemBranch.board.id;
            for (let i = 0; i < state.data.length; i++) {
                if (state.data[i].id === taskIdBoardTimerStatus) {
                    state.data[i].items.find(item => item.id === taskIdTimerStatus).statusTime = timerStatus;
                }
            }
            const newArrayEleven = [...state.data];
            localStorage.setItem("data", JSON.stringify(state));
            return { ...state, data: newArrayEleven }
        default:
            return state;
    }
}

export default reducer;