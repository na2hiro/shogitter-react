import Shogitter from "./Shogitter";
import React, {FunctionComponent, useMemo, useState} from "react";
import Shogi from "shogitter-ts";

type Props = {

}
const LocalClient: FunctionComponent<Props> = () => {
    const [shogitter, setShogitter] = useState(() => {
        const shogitter = new Shogi(0);
        shogitter.start();
        return shogitter;
    });
    const [data, setData] = useState(shogitter.getObject());
    return <Shogitter data={data} onCommand={(command) => {
        try {
            shogitter.move_d(command);
            setData(shogitter.getObject());
        }catch(e) {
            alert(e);
            console.error(e);
            // When error occurs, shogitter is broken. (i.e. move is not an atomic operation) Need to recreate.
            setShogitter(new Shogi(data));
        }
    }} />
}

export default LocalClient;