import { createStore } from 'redux';

const divToggle = document.querySelector('.toggle');
const counter = document.querySelector('h1');
const btnIncrease = document.querySelector('#increase');
const btnDecrease = document.querySelector('#decrease');

//Action 이름 정의
const TOGGLE_SWITCH = 'TOGGLE_SWITCH';
const INCREASE = 'INCREASE';
const DECREASE = 'DECREASE';

//Action 생성함수 작성
const toggleSwitch = () => ({ type: TOGGLE_SWITCH });
const increase = difference => ({ type: INCREASE, difference });
const decrease = () => ({ type: DECREASE });


//이 프로젝트에서 사용할 초깃갑 정의\
const initialState = {
    toggle: false,
    counter: 0
};

//리듀서(==변화를 일이크는 함수) 함수 정의
// - 함수의 파라미터로는 state와 action값을 받아옴

//state가 undefine일 때는 initialState를 기본값으로 사용
function reducer(state = initialState, action){
    //action.type에 따라 다른 작업을 처리함
    switch(action.type){
        case TOGGLE_SWITCH:
            return{
                ...state, //불변성 유지를 해 주어야 합니다.
                //... => 전개연산자
                toggle: !state.toggle
            };
        case INCREASE:
            return{
                ...state,
                counter: state.counter + action.difference
            };
        case DECREASE:
            return{
                ...state,
                counter: state.counter - 1
            };
        default:
            return state;
    }
}

const store = createStore(reducer);


//render함수 만들기
const render = () => {
    const state = store.getState(); //현재상태를 불러옵니다.
    //토글처리
    if(state.toggle){
        divToggle.classList.add('active');
    } else{
        divToggle.classList.remove('active');
    }
    //카운터 처리
    counter.innerText = state.counter;
};

render();
//상태가 업데이트될 때마다 render 함수를 호출
store.subscribe(render);

//DOM요소에 click 이벤트 설정
divToggle.onClick = () => { 
    store.dispatch(toggleSwitch());
};
btnIncrease.onClick = () => {
    store.dispatch(increase(1));
};
btnDecrease.onClick = () => {
    store.dispatch(decrease());
};