import React from "react";
import { KifuLine } from "shogitter-ts/lib/Kifu";

type Props = {
    data: KifuLine[]
}
const History = ({data}) => {
    return <div style={{overflowY: "scroll", height: "100%"}}>
        <ol>
            {data.map((line, i) => <li key={i}>{line.disp}</li>)}
        </ol>
    </div>
}

export default History;