import React from "react";
import {usePreview} from "react-dnd-multi-backend";

const PiecePreview = () => {
    const {display, itemType, item, style} = usePreview();
    return display && <img src={`./img/koma/${item.direction}${item.species}.png`} style={style}/>
}
export default PiecePreview;
