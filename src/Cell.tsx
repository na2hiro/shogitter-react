/** @jsx jsx */
import {jsx, css} from "@emotion/core";
import React, {FunctionComponent, useContext} from "react";
import {useDrop} from "react-dnd";
import {ItemTypes} from "./dnd/Constants";
import { Direction, Species } from "shogitter-ts/lib/Ban";
import {XYObj} from "./Board";

import Piece, {NullPiece, Position} from "./Piece";
import {ZoomContext} from "./utils/contexts";

type CellProps = {
    xy: XYObj,
    data: [Direction, Species] | [];
    onClick: (xy: XYObj) => void;
    onDrag: (pos: Position) => void;
    onDrop: (xy: XYObj) => void;
    onClear: () => void;
    active: boolean;
    moving: boolean;
}

const Cell: FunctionComponent<CellProps> = ({data, onClick, onDrag, onDrop, onClear, xy, active, moving}) => {
    const onClickXY = () => onClick(xy);
    const [{ isOver, canDrop }, drop] = useDrop({
        accept: ItemTypes.PIECE_ON_BOARD,
        drop: () => {onDrop(xy)},
        collect: mon => ({
            isOver: mon.isOver(),
            canDrop: mon.canDrop(),
        }),
    })
    const zoom = useContext(ZoomContext);

    let cell;
    if(data.length==0) {
        cell = <NullPiece onClick={onClickXY} />;
    } else {
        cell = <Piece direction={data[0]} species={data[1]} onClick={onClick} position={xy} onDrag={onDrag} onClear={onClear}  />
    }
    return <div ref={drop} css={css`
background-color: ${moving ? "#ddd" : (active ? "#aaf" : "")};
    `}>
        {cell}
    </div>
}
export default Cell;

