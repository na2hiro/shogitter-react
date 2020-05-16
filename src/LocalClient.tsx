import Shogitter, {UIConfig} from "./Shogitter";
import React, {FunctionComponent, useMemo, useState} from "react";
import Shogi from "shogitter-ts";

const config: UIConfig = {
    initialReverse: false
}

type Props = {

}
const LocalClient: FunctionComponent<Props> = () => {
    const [shogitter, setShogitter] = useState(() => {
        const shogitter = new Shogi(0);
        shogitter.start();
        return shogitter;
    });
    const [data, setData] = useState(shogitter.getObject());
    return <>
        <input style={{fontSize: "40px", width: "80px"}} onChange={(e) =>{
            const ruleId = parseInt(e.target.value);
            if(!isNaN(ruleId)){
                console.log("new shogi", ruleId);
                var newShogi = new Shogi(ruleId);
                setShogitter(newShogi)
                newShogi.start();
                setData(newShogi.getObject());
            }
        }} type="number" />
        <Shogitter data={data} config={config} onCommand={(command) => {
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
    </>
}

export default LocalClient;