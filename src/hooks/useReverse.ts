import {useCallback, useState} from "react";

const useReverse: (boolean?) => [boolean, ()=>void] = (initialReverse?: boolean) => {
    const [isReverse, setReverse] = useState(initialReverse || false);
    const reverse = useCallback(() => {
        return setReverse((isReverse) => !isReverse);
    }, []);

    return [isReverse, reverse]
}

export default useReverse