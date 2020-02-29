import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import NewsItem from './NewsItem';
//api호출시 추가
import axios from 'axios';
//custom Hook 사용
import usePromise from '../lib/usePromise';

const NewsListBlock = styled.div`
    box-sizing: border-box;
    padding-bottom: 3rem;
    width: 768px;
    margin: 0 auto;
    margin-top: 2rem;
    @media screen and (max-width: 768px){
        width: 100%;
        padding-left: 1rem;
        padding-right: 1rem;        
    }
    `;

const NewsList = ({ category }) => {
    const [loading, response, error] = usePromise(() => {
        const query = category === 'all' ? '' : `&category=${category}`;
        return axios.get(
            `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=08db394e6e1041a0b766e8d8bce8a823`,
        );
    }, [category]);
    
    //대기 중일 때
    if(loading){
        return <NewsListBlock>대기 중....</NewsListBlock>;
    }
    //아직 response값이 설정되지 않았을 때
    if(!response){
        return null;
    }
    //에러가 발생했을 때
    if(error){
        return <NewsListBlock>에러 발생!!!</NewsListBlock>;
    }
    //response값이 유효할 때
    const { articles } = response.data;    
    return(
        <NewsListBlock>
            {articles.map(article => (
                <NewsItem key={article.url} article={article} />
            ))}
        </NewsListBlock>
    );
};

export default NewsList;



// ===============================================================================
// usePromise 사용 전 코드
// ===============================================================================

// import React, { useState, useEffect } from 'react';
// import styled from 'styled-components';
// import NewsItem from './NewsItem';
// //api호출시 추가
// import axios from 'axios';

// const NewsListBlock = styled.div`
//     box-sizing: border-box;
//     padding-bottom: 3rem;
//     width: 768px;
//     margin: 0 auto;
//     margin-top: 2rem;
//     @media screen and (max-width: 768px){
//         width: 100%;
//         padding-left: 1rem;
//         padding-right: 1rem;        
//     }
//     `;

// const NewsList = ({ category }) => {
//     const [article, setArticle] = useState(null);
//     const [loading, setLoading] = useState(false);

//     useEffect(() => {
//         //async를 사용하는 함수 따로 선언
//         const fetchData = async () => {
//             setLoading(true);
//             try{
//                 const query = category === 'all' ? '' : `&category=${category}`;
//                 const response = await axios.get(
//                     `https://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=08db394e6e1041a0b766e8d8bce8a823`,
//                 );
//                 setArticle(response.data.articles);
//             } catch(e){
//                 console.log(e);
//             }
//             setLoading(false);
//         }
//         fetchData();
//     }, [category]);

//     //대기 중일 때
//     if(loading){
//         return <NewsListBlock>대기중.....</NewsListBlock>;
//     }
//     //아직 article 값이 설정되지 않았을 때
//     if(!article){
//         return null;        
//     }

//     //article값이 유효할 때
//     return(
//         <NewsListBlock>
//             {article.map(article => (
//                 <NewsItem key={article.url} article={article}/>
//             ))}
//         </NewsListBlock>
//     );
// };

// export default NewsList;

// const sampleArticle = {
//     title: '제목',
//     description: '내용',
//     url: 'https://google.com',
//     urlToImage: 'https://via.placeholder.com/160',
// };

// const NewsList = () => {
//     return(
//         <NewsListBlock>
//             <NewsItem article={sampleArticle}/>
//             <NewsItem article={sampleArticle}/>
//             <NewsItem article={sampleArticle}/>
//             <NewsItem article={sampleArticle}/>
//             <NewsItem article={sampleArticle}/>
//             <NewsItem article={sampleArticle}/>
//             <NewsItem article={sampleArticle}/>
//             <NewsItem article={sampleArticle}/>
//             <NewsItem article={sampleArticle}/>
//         </NewsListBlock>       
//     );
// };

// export default NewsList;