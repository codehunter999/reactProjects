import { createAction,handleActions } from 'redux-actions';
import produce from 'immer';

//action type 정의
const CHANGE_INPUT = 'todos/CHANGE_INPUT';  //인풋 값을 변경함
const INSERT = 'todos/INSERT';  //새로운 todo를 등록함
const TOGGLE = 'todos/TOGGLE';  //todo를 체크/체크 해제함
const REMOVE = 'todos/REMOVE';  //todo를 제거함

//action 생성함수 만들기

export const changeInput = createAction(CHANGE_INPUT, input => input);

// export const changeInput = input => ({
//     type: CHANGE_INPUT,
//     input
// });


let id = 3; //insert가 호출될 때마다 1씩 더해집니다.
export const insert = createAction(INSERT, text => ({
    id: id++,
    text,
    done: false,
}));
// export const insert = text => ({
//     type: INSERT,
//     todo: {
//         id: id++,
//         text,
//         done: false
//     }
// });
export const toggle = createAction(TOGGLE, id => id);
// export const toggle = id => ({
//     type: TOGGLE,
//     id
// });
export const remove = createAction(REMOVE, id => id);
// export const remove = id => ({
//     type: REMOVE,
//     id
// });

//초기상태 및 리듀서 함수 만들기
const initialState = {
    input:'',
    todos:[
        {
            id:1,
            text:'리덕스 기초 배우기',
            done:true
        },
        {
            id:2,
            text:'리액트와 리덕스 사용하기',
            done:false
        }
    ]
};

// immer 사용 
const todos = handleActions(
    {
        [CHANGE_INPUT] : (state, { paylpad: input }) => 
            produce(state, draft => {
                draft.input = input;
            }),
        [INSERT]: (state, { payload: todo }) => 
            produce(state, draft => {
                draft.todos.push(todo);
            }),
        [TOGGLE]: (state, { payload: id }) => 
            produce(state, draft => {
                const todo = draft.todos.find(todo => todo.id === id);
                todo.done = !todo.done;
            }),
        [REMOVE]: (state, { payload: id }) => 
            produce(state, draft => {
                const index = draft.todos.findIndex(todo => todo.id === id);
                draft.todos.splice(index, 1);
            }),
    },
    initialState,
);

//immer 사용전 handleActions
// const todos = handleActions(
//     {
//         [CHANGE_INPUT] : (state, { paylpad: input }) => ({...state, input}),
//         [INSERT]: (state, { payload: todo }) => ({
//             ...state,
//             todos: state.todos.concat(todo),
//         }),
//         [TOGGLE]: (state, { payload: id }) => ({
//             ...state,
//             todos: state.todos.map(todo => 
//                 todo.id === id ? { ...todo, done: !todo.done } : todo,
//                 ),
//         }),
//         [REMOVE]: (state, { payload: id }) => ({
//             ...state,
//             todos: state.todos.filter(todo => todo.id !== id)
//         }),        
//     },
//     initialState,
// );

// function todos(state = initialState, action){
//     switch(action.type){
//         case CHANGE_INPUT:
//             return{
//                 ...state,
//                 input: action.input
//             };
//         case INSERT:
//             return{
//                 ...state,
//                 todos:state.todos.concat(action.todo)
//             };
//         case TOGGLE:
//             return{
//                 ...state,
//                 todos:state.todos.map(todo => 
//                     todo.id === action.id ? { ...todo, done: !todo.done } : todo
//                 )
//             };
//         case REMOVE:
//             return{
//                 ...state,
//                 todos: state.todos.filter(todo => todo.id !== action.id_)
//             };
//         default:
//             return state;
//     }
// }

export default todos;