//custom Hook usePromise
//promise의 대기중,완료결과,실패결과에 대한 상태를 관리
//usePromise의 의존배열 deps를 파라미터로 받아옴
//파라미터로 받아온 deps배열은 usePromise 내부에서 사용한 useEffect의 의존배열로 설정됨
import { useState, useEffect } from 'react';

export default function usePromise(promiseCreator, deps){
    //대기 중/완료/실패에 대한 상태 관리
    const [loading, setLoading] = useState(false);
    const [resolved, setResolved] = useState(null);
    const [error, setError] = useState(null);

    useEffect(()=>{
        const process = async () => {
            setLoading(true);
            try{
                const resolved = await promiseCreator();
                setResolved(resolved);
            } catch(e){
                setError(e);
            }
            setLoading(false);
        };
        process();
        //eslint-disable-next-line react-hooks/exhaustive-deps
    },deps);

    return [loading,resolved,error];
}