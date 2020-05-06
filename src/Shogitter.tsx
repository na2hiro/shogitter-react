import {ShogiSerialization} from "shogitter-ts";
import React, {FunctionComponent} from "react";

export type Props = {
    data: ShogiSerialization
}
const Shogitter: FunctionComponent<Props> = ({data}) => {
    return <div>
        yattaze?
        <pre>
            {JSON.stringify(data, null, 2)}
        </pre>
    </div>
};

export default Shogitter;