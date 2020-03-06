// Hooks를사용한 container
import React, { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { changeInput, insert, toggle, remove } from '../modules/todos';
import Todos from '../components/Todos';
import useActions from '../lib/useAction';

const TodosContainer = () => {
  const { input, todos } = useSelector(({ todos }) => ({
    input: todos.input,
    todos: todos.todos,
  }));

//useActions Hook으로 변환
const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
);

//   const dispatch = useDispatch();
//   const onChangeInput = useCallback(input => dispatch(changeInput(input)), [
//     dispatch,
//   ]);
//   const onInsert = useCallback(text => dispatch(insert(text)), [dispatch]);
//   const onToggle = useCallback(id => dispatch(toggle(id)), [dispatch]);
//   const onRemove = useCallback(id => dispatch(remove(id)), [dispatch]);

  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};

export default TodosContainer;

// connect 형식의 TodosContainer
// import React from 'react';
// import { connect } from 'react-redux';
// import { changeInput, insert, toggle, remove } from '../modules/todos';
// import Todos from '../components/Todos';

// const TodosContainer = ({
//     input,
//     todos,
//     changeInput,
//     insert,
//     toggle,
//     remove,
// }) => {
//     return(
//         <Todos
//             input={input}
//             todos={todos}
//             onChangeInput={changeInput}
//             onInsert={insert}
//             onToggle={toggle}
//             onRemove={remove}
//         />
//     );
// };

// export default connect(
//     //비구조화 할당을 통해 todos를 분리하여
//     //state.todos.input 대신 todos.input을 사용
//     ({ todos }) => ({
//         input:todos.input,
//         todos:todos.todos,
//     }),
//     {
//         changeInput,
//         insert,
//         toggle,
//         remove,
//     },
// )(TodosContainer);
