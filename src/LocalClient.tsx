import Shogitter, {UIConfig} from "./Shogitter";
import React, {FunctionComponent, useMemo, useState} from "react";
import Shogi from "shogitter-ts";

const defaultConfig: UIConfig = {
    initialReverse: false,
    publicPath: "/public"
}

const delay = 500;

const LocalClient: FunctionComponent<{}> = () => {
    const [allowSpeculative, setAllowSpeculative] = useState(false);
    const [shogitter, setShogitter] = useState(() => {
        const shogitter = new Shogi(0);
        shogitter.start();
        return shogitter;
    });
    const [data, setData] = useState(shogitter.getObject());
    return <>
        <label><input type="checkbox" checked={allowSpeculative} onClick={(e)=>setAllowSpeculative(v=>!v)} />Allow speculative</label>
        <Shogitter data={data} config={{...defaultConfig, allowSpeculative}} onCommand={(command) => {
            setTimeout(() => {
                try {
                    shogitter.runCommand(command);
                    setData(shogitter.getObject());
                }catch(e) {
                    alert(e);
                    console.error(e);
                    // When error occurs, shogitter is broken. (i.e. move is not an atomic operation) Need to recreate.
                    setShogitter(new Shogi(data));
                }
            }, delay)
        }} />
    </>
}

export default LocalClient;