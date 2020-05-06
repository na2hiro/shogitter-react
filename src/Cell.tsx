import React, {FunctionComponent} from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "./dnd/Constants";
import { Direction, Species } from "shogitter-ts/lib/Ban";
import {XYObj} from "./Board";
import classnames from "classnames";

import "./Cell.css";
import Piece from "./Piece";

type CellProps = {
    xy: XYObj,
    data: [Direction, Species] | [];
    onClick: (xy: XYObj) => void;
    onDrag: (xy: XYObj) => void;
    onDrop: (xy: XYObj) => void;
    onClear: () => void;
    active: boolean;
    moving: boolean;
}

const Cell: FunctionComponent<CellProps> = ({data, onClick, onDrag, onDrop, onClear, xy, active, moving}) => {
    const onClickXY = () => onClick(xy);
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.PIECE_ON_BOARD,
        drop: () => onDrop(xy),
        collect: mon => ({
            isOver: mon.isOver(),
            canDrop: mon.canDrop(),
        }),
    })

    let cell;
    if(data.length==0) {
        cell = <img src={`./img/koma/___.png`} onClick={onClickXY} />;
    } else {
        cell = <Piece direction={data[0]} species={data[1]} onClick={onClick} xy={xy} onDrag={onDrag} onClear={onClear}  />
    }
    return <div ref={drop} className={classnames({
        "Shogitter-Cell--active": active,
        "Shogitter-Cell--moving": moving
    })}>
        {cell}
    </div>
}
export default Cell;

