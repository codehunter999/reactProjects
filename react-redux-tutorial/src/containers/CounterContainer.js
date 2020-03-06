// Hooks를 사용하는 방법
import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Counter from '../components/Counter';
import { increase, decrease } from '../modules/counter';

const CounterContainer = () => {
    const number = useSelector(state => state.counter.number);
    const dispatch = useDispatch();
    //컴포넌트 성능을 최적화해야 하는 상황이 온다면 useCallback으로 액션을 디스패치하는 함수를 감싸줌
    const onIncrease = useCallback(() => dispatch(increase()), [dispatch]);
    const onDecrease = useCallback(() => dispatch(decrease()), [dispatch]);

    return(
        <Counter number = {number} onIncrease={onIncrease} onDecrease={onDecrease}/>
    );

    //useCallback쓰기전
    // return (
    //     <Counter
    //         number={number}
    //         onIncrease={()=>dispatch(increase())}
    //         onDecrease={()=>dispatch(decrease())}
    //         />
    // );
};

export default CounterContainer;


// connect 함수 사용한 버젼
// import React from 'react';
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import Counter from '../components/Counter';
// import { increase, decrease } from '../modules/counter';

// const CounterContainer = ({ number, increase, decrease }) => {
//     return (
//         <Counter number={number} onIncrease={increase} onDecrease={decrease} />
//     );
// };

// export default connect(
//     state => ({
//         number:state.counter.number,
//     }),
//     dispatch => 
//         bindActionCreators(
//             {
//                 increase,
//                 decrease,
//             },
//             dispatch,
//         ),
// )(CounterContainer);



//=======================================================
// bindActionCreators로 Action 생성함수 묶기
//=======================================================
// const mapStateToProps = state => ({
//     number: state.counter.number,
// });
// const mapDispatchToProps = dispatch => ({
    
//     increase:()=>{
//         console.log('increase');
//         dispatch(increase());
//     },
//     decrease:()=>{
//         console.log('decrease');
//         dispatch(decrease());
//     },
// });

// export default connect(
//     mapStateToProps,
//     mapDispatchToProps,
// ) (CounterContainer);