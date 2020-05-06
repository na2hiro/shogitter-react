import React, {FunctionComponent} from "react";
import {DragSourceMonitor, useDrag} from "react-dnd";
import {ItemTypes} from "./DndConstants";
import { Direction, Species } from "shogitter-ts/lib/Ban";
import {XYObj} from "./Board";

type Props = {
    species: Species;
    direction: Direction;
    onClick: (xy: XYObj) => void;
    onDrag: (xy: XYObj) => void;
    onClear: () => void;
    xy: XYObj;
}
const Piece: FunctionComponent<Props> = ({species, direction, onClick, onDrag, onClear, xy}) => {
    const [{isDragging}, drag] = useDrag({
        item: {type: ItemTypes.PIECE_ON_BOARD},
        begin: monitor => onDrag(xy),
        end: (item, monitor) => {
            if(monitor && !monitor.didDrop()) {
                onClear();
            }
        },
        collect: monitor => ({
            isDragging: monitor.isDragging(),
        }),
    });
    return <img src={`./img/koma/${direction}${species}.png`} onClick={() => onClick(xy)} ref={drag} style={{
        opacity: isDragging ? 0.5 : 1
    }}/>;
}

export default Piece;
