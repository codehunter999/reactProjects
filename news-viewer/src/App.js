import React from 'react';
import { Route } from 'react-router-dom';
import NewsPage from './pages/NewsPage';

const App =() => {
  return <Route path="/:category?" component={NewsPage} />;
};

export default App;


//=========================================================================================================
// Router 사용전 useState로 category 접근 관리 코드
//=========================================================================================================

// import React, { useState, useCallback } from 'react';
// import NewsList from './components/NewsList';
// import Categories from './components/Categories';

// const App = () => {
//   const [category,setCategory] = useState('all');
//   const onSelect = useCallback(category => setCategory(category), []);

//   return(
//     <>
//       <Categories category={ category } onSelect={ onSelect } />;
//       <NewsList category={ category } />;
//     </>
//   );
// };

// export default App;
    



//=========================================================================================================
// 뉴스 API 이용 최초 App 코드
//=========================================================================================================
// import React, { useState } from 'react';
// import axios from 'axios';

// const App = () => {
//   const [data, setData] = useState(null);

//   //async-await 적용
//   const onClick = async () => {
//     try{
//       const response = await axios.get(
//         'https://newsapi.org/v2/top-headlines?country=kr&apiKey=08db394e6e1041a0b766e8d8bce8a823',
//       );
//       setData(response.data);
//     } catch (e){
//       console.log(e);
//     }
//   };
    
  
//   //   axios.get('https://jsonplaceholder.typicado.com/todos/1').then(reponse => {
//   //     setData(reponse.data);
//   //   });
//   // };


//   return (
//     <div>
//       <div>
//         <button onClick={onClick}>불러오기</button>
//       </div>
//       {data && <textarea row={7} value={JSON.stringify(data, null, 2)} />}
//     </div>
//   );
// };

// export default App;
