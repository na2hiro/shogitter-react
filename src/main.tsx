import React, {useState} from "react";
import {render} from "react-dom";
import LocalClient from "./LocalClient";

/*
const Multiple = () => {
    const [count, setCount] = useState(0);
    const elems: React.ReactNode[] = [];
    for(let i=0; i<count; i++) {
        elems.push(<LocalClient key={i} />)
    }
    return <>
        <button onClick={()=>setCount(count+1)}>add</button>
        {elems}
    </>;
}
 */

render(<LocalClient/>, document.getElementById("main"));